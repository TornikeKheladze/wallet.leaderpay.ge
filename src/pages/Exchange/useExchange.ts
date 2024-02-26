import { useMutation, useQuery } from "react-query";
import { useTranslate } from "../../hooks/useTranslate";
import { exchangeTranslations } from "../../lang/exchangeTranslations";
import { getCurrencies, rateCurrency } from "../../services/exchange";
import { useEffect, useState } from "react";
import { Currency } from "../../types/exchange";
import { getNextElement } from "../../helpers/getNextElement";
import toast from "react-hot-toast";

export const useExchange = () => {
  const { t } = useTranslate(exchangeTranslations);

  const [fromCurrency, setFromCurrency] = useState<Currency>({
    id: 0,
    title: "",
  });
  const [fromAmount, setFromAmount] = useState(1);
  const [toCurrency, setToCurrency] = useState<Currency>({ id: 0, title: "" });

  const { isLoading, data: currencyData } = useQuery({
    queryKey: "getCurrencies",
    queryFn: getCurrencies,
    onSuccess(data) {
      setFromCurrency(
        data.data.data.find((currency: Currency) => currency.title === "GEL")
      );
      setToCurrency(
        data.data.data.find((currency: Currency) => currency.title === "USD")
      );
    },
    onError: () => {
      toast.error(t("Something went wrong"));
    },
  });

  const currencies: Currency[] = currencyData?.data.data
    ? currencyData?.data.data
    : [];

  const {
    mutate: rateMutate,
    data: rateData,
    isLoading: rateLoading,
  } = useMutation(rateCurrency, {
    onError: () => {
      toast.error(t("Something went wrong"));
    },
  });

  useEffect(() => {
    let timer = 0;
    const performAction = () => {
      if (fromCurrency.id && toCurrency.id) {
        rateMutate({
          amount: fromAmount,
          from: fromCurrency.id,
          to: toCurrency.id,
        });
      }
    };
    timer = setTimeout(performAction, 1000);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [fromAmount]);

  useEffect(() => {
    if (fromCurrency.id && toCurrency.id) {
      rateMutate({
        amount: fromAmount,
        from: fromCurrency.id,
        to: toCurrency.id,
      });
    }
    // eslint-disable-next-line
  }, [fromCurrency, toCurrency]);

  const onCurrencySelect = (currency: Currency, type: "from" | "to") => {
    const GELCODE = 981;
    const secondCurrencyId = type === "from" ? toCurrency.id : fromCurrency.id;
    const setSecondCurrency = type === "from" ? setToCurrency : setFromCurrency;
    const setPrimaryCur = type === "from" ? setFromCurrency : setToCurrency;

    if (currency.id !== GELCODE && secondCurrencyId !== GELCODE) {
      setPrimaryCur(currency);
      setSecondCurrency({ id: GELCODE, title: "GEL" });
    } else if (currency.id === GELCODE && secondCurrencyId === GELCODE) {
      const currentIndex = currencies.findIndex(({ id }) => id === currency.id);
      setPrimaryCur(currency);
      setSecondCurrency(getNextElement(currencies, currentIndex));
    } else {
      setPrimaryCur(currency);
    }
  };

  return {
    isLoading,
    onCurrencySelect,
    currencies,
    fromCurrency,
    setFromAmount,
    fromAmount,
    toCurrency,
    rateData,
    rateLoading,
    t,
  };
};
