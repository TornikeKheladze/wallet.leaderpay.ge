import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchTransactions } from "../../services/transactions";
import { useEffect, useState } from "react";
import { useTranslate } from "../../hooks/useTranslate";
import { Transaction, TransactionRequest } from "../../types/transactions";
import { removeEmpty } from "../../helpers/removeEmpty";
import toast from "react-hot-toast";
import { homeTranslations } from "../../lang/homeTranslations";
import { useLocation } from "react-router-dom";
import { tableTranslations } from "../../lang/tableTranslations";
import { getAllServices, getServiceCategories } from "../../services/services";
import { Service, ServiceCategory } from "../../types/serviceTypes";
import { transactionsArr } from "../../tableArrays/transactionsArr";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { serviceTranslations } from "../../lang/serviceTranslations";

const useHome = () => {
  const [filter, setFilter] = useState<TransactionRequest>({
    from_amount: "",
    to_amount: "",
    limit: 10,
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTransaction, setActiveTransactions] = useState<Transaction>({
    amount: "",
    balance: "",
    date: "",
    description: "",
    type: 0,
    service_id: 0,
  });
  // const [noMore, setNoMore] = useState(false);
  const [tableArr, setTableArr] = useState(transactionsArr);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openTransactionModal, setOpenTransactionModal] = useState(false);

  const { search } = useLocation();
  const { lang } = useSelector((store: RootState) => store.lang);
  const currency = search?.split("&id=")[0].slice(-3);
  const currency_id = search?.split("&id=")[1];
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 960) {
        setTableArr(
          transactionsArr.filter((tr) => {
            if (
              tr.name === "categoryName" ||
              tr.name === "amount" ||
              tr.name === "serviceName"
            ) {
              return tr;
            }
          })
        );
      } else {
        setTableArr(transactionsArr);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { data: servicesData } = useQuery({
    queryKey: "getAllServices",
    queryFn: getAllServices,
  });

  const { data: categoriesData } = useQuery({
    queryKey: "getServiceCategories",
    queryFn: getServiceCategories,
  });

  const {
    mutate: transactionsMutate,
    isLoading,
    data: transactionsData,
  } = useMutation(fetchTransactions, {
    onSuccess: (data) => {
      // if (data.data.length === transactions.length && !filter.currency_id) {
      //   setNoMore(true);
      // }
      setTransactions(data.data);
      queryClient.invalidateQueries("getAllServices");
    },
    onError: () => {
      toast.error(t("Something went wrong"));
    },
  });

  useEffect(() => {
    // აქ ტრანზაქციებს ვამატებ სერვისს და კატეგორიას. ჯერ მაპით გადავუვლი ტრანზაქციებს და სერვის აიდით ვპოულობ სერვისს
    // მერე კიდე მაპს დავაჩეინებ და ვპოულობ კატეგორიის აიდით კატეგორიას და მაგასაც ტრანზაქციას ვამატებ
    const services: Service[] = servicesData?.data || [];
    const categories: ServiceCategory[] = categoriesData?.data || [];
    if (
      categories.length > 0 &&
      services.length > 0 &&
      transactions.length > 0
    ) {
      const withServiceCategories = transactions
        .map((t) => {
          const service = services.find((service) => {
            if (t.service_id) {
              if (+service.id === +t.service_id) {
                return service;
              }
            }
          });
          return {
            ...t,
            service,
            serviceName: service?.lang[lang],
          };
        })
        .map((t) => {
          const serviceCategory = categories.find((category) => {
            if (t.service) {
              if (+category.id === +t.service?.category_id) return category;
            }
          });

          return {
            ...t,
            serviceCategory,
            categoryName: serviceCategory?.lang[lang],
          };
        });
      setTransactions(withServiceCategories);
    }
  }, [categoriesData, servicesData, transactionsData, lang]); // eslint-disable-line

  useEffect(() => {
    setFilter((prevState) => {
      return { ...prevState, currency_id };
    });
    transactionsMutate(removeEmpty({ ...filter, currency_id }));
  }, [currency_id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    transactionsMutate(removeEmpty(filter));
  }, [filter.limit]); // eslint-disable-line react-hooks/exhaustive-deps

  const { t } = useTranslate(
    tableTranslations,
    homeTranslations,
    serviceTranslations
  );

  const showMore = () => {
    setFilter((prevState: any) => {
      return { ...prevState, limit: prevState.limit + 10 };
    });
  };

  return {
    states: {
      transactions,
      openFilterModal,
      filter,
      activeTransaction,
      openTransactionModal,
    },
    setStates: {
      setFilter,
      setOpenFilterModal,
      setActiveTransactions,
      setOpenTransactionModal,
    },
    transactions,
    transactionsMutate,
    isLoading,
    t,
    showMore,
    currency,
    tableArr,
  };
};

export default useHome;
