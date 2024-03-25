import Dropdown from "../../components/dropdown/Dropdown";
import LoadingSpinner from "../../components/layout/loadingSpinner/LoadingSpinner";
import ExchangeIcon from "../../assets/icons/ExchangeIcon";
import { Toaster } from "react-hot-toast";
import { useExchange } from "./useExchange";

const Exchange = () => {
  const {
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
    convertLoading,
    convertMutate,
  } = useExchange();
  return (
    <div>
      <div className="card p-5 my-4 lg:mt-8 relative flex flex-col gap-6">
        <Toaster position="bottom-right" reverseOrder={false} />
        {isLoading && <LoadingSpinner blur />}
        <h2 className="md:text-2xl text-xl">
          {t("transferBetweenOwnAccounts")}
        </h2>
        <div className="flex justify-between items-center gap-3">
          <div className="flex flex-col items-center gap-3 w-full text-textBlack">
            <Dropdown
              placeholder=""
              onSelect={(c) => onCurrencySelect(c, "from")}
              options={currencies}
              label="title"
              active={fromCurrency}
              className="w-full"
            />
            <input
              onChange={(e) => setFromAmount(+e.target.value)}
              value={fromAmount}
              type="text"
              className="input"
            />
          </div>
          <ExchangeIcon className="w-14 md:w-28 md:h-28" />
          <div className="flex flex-col items-center gap-3 w-full text-textBlack">
            <Dropdown
              placeholder=""
              onSelect={(c) => onCurrencySelect(c, "to")}
              options={currencies}
              label="title"
              active={toCurrency}
              className="w-full"
            />
            <div className="relative w-full">
              {rateLoading && (
                <span className="absolute right-1 top-3">
                  <LoadingSpinner />
                </span>
              )}
              <input
                value={rateData ? rateData.data.data.rate : ""}
                readOnly
                type="text"
                className="input"
              />
            </div>
          </div>
        </div>
        <button
          disabled={rateLoading || convertLoading}
          onClick={() =>
            convertMutate({
              amount: fromAmount,
              from: fromCurrency.id,
              to: toCurrency.id,
            })
          }
          className="button_primary w-32 ml-auto"
        >
          {convertLoading ? <LoadingSpinner /> : t("exchange")}
        </button>
      </div>
    </div>
  );
};

export default Exchange;
