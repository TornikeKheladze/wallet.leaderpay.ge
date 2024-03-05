import { useMutation, useQuery, useQueryClient } from "react-query";
import { useTranslate } from "../../hooks/useTranslate";
import { transferTranslations } from "../../lang/transferTranslations";
import { withdrawTranslations } from "../../lang/withdrawTranslations";
import {
  addCard,
  deleteCard,
  getOperationList,
  getWithdrawList,
  smsWithdraw,
  withdraw,
} from "../../services/withdraw";
import {
  Card,
  CardOperationResponse,
  Commisions,
  OperationFilter,
  SmsCardResponse,
  Withdraw,
} from "../../types/withdraw";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { isCardExpired } from "../../helpers/isCardExpired";
import { removeEmpty } from "../../helpers/removeEmpty";
import { tableTranslations } from "../../lang/tableTranslations";

export const useWithDraw = () => {
  const { t } = useTranslate(
    withdrawTranslations,
    transferTranslations,
    tableTranslations
  );
  const [requestData, setRequestData] = useState<Withdraw>({
    amount: "",
    card_id: "",
    year: 0,
    month: 0,
    sms: "",
  });

  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [filter, setFilter] = useState<OperationFilter>({
    from_amount: "",
    to_amount: "",
    limit: 10,
  });

  const queryClient = useQueryClient();

  const { isLoading: listLoading, data: cardData } = useQuery(
    ["getWithdrawList"],
    () => getWithdrawList()
  );

  const {
    mutate: smsMutate,
    isLoading: smsLoading,
    // error: smsError,
    data: smsData,
  } = useMutation<SmsCardResponse, any, Withdraw>({
    mutationFn: smsWithdraw,
    onSuccess() {
      toast.success(t("smsCodeSent"));
      setConfirmModal(true);
    },
    onError(data) {
      toast.error(data.response.data.errorMessage);
    },
  });

  const {
    mutate: operationListMutate,
    isLoading: operationListLoading,
    // error: smsError,
    data: operationListData,
  } = useMutation<CardOperationResponse, any, OperationFilter>({
    mutationFn: getOperationList,
    onSuccess(data) {
      if (data.data.data.length < filter.limit) {
        setNoMore(true);
      }
    },
  });

  useEffect(() => {
    operationListMutate(removeEmpty(filter));
    // eslint-disable-next-line
  }, [filter.limit, filter.status_id, filter.type_id]);

  const filterHandler = () => {
    operationListMutate(removeEmpty(filter));
  };

  const operationList = operationListData?.data.data || [];

  const {
    mutate: withdrawMutate,
    isLoading: withdrawLoading,
    error: withdrawError,
    // data: withdrawData,
  } = useMutation<SmsCardResponse, any, Withdraw>({
    mutationFn: withdraw,
  });

  const {
    // mutate: deleteMutate,
    // isLoading: deleteLoading,
    error: deleteError,
  } = useMutation<string, any, any>({
    mutationFn: deleteCard,
    onSuccess() {
      queryClient.invalidateQueries("getWithdrawList");
    },
  });

  const {
    mutate: addCardMutate,
    isLoading: addCardLoading,
    // error: addCardError,
  } = useMutation<any, any, any>({
    mutationFn: addCard,
    onSuccess(data) {
      window.location.href = data.data.url;
    },
    onError(data) {
      toast.error(data.response.data.errorMessage);
    },
  });

  const cardList: Card[] = cardData?.data.data || [];
  const commisionsData: Commisions = cardData?.data.commisions || {};

  const showMore = () => {
    setFilter((prevState: any) => {
      return { ...prevState, limit: prevState.limit + 10 };
    });
  };

  const withdrawHandler = () => {
    if (+requestData.amount < +commisionsData.min_amount) {
      setErrorModal(true);

      setErrorMessage(
        t("minimumAmountToWithdraw") + commisionsData.min_amount + " GEL"
      );
      return;
    }

    if (+requestData.amount > +commisionsData.max_amount) {
      setErrorModal(true);
      setErrorMessage(
        t("maximumAmountToWithdraw") + commisionsData.max_amount + " GEL"
      );
      return;
    }

    if (isCardExpired(requestData.year, requestData.month)) {
      setErrorModal(true);
      setErrorMessage("cardIsExpired");
      return;
    }

    smsMutate(requestData);
  };

  const calculateCommision: () => string = () => {
    const countpercent = (+commisionsData.percent / 100) * +requestData.amount;

    const commision =
      countpercent > +commisionsData.min_commision
        ? countpercent
        : +commisionsData.min_commision;
    const totalAmount = commision + +requestData.amount;

    return totalAmount.toFixed(2);
  };

  const submitPayment = () => {
    if (requestData.sms?.length === 6) {
      withdrawMutate(requestData);
    }
  };

  const deleteHandler = () => {
    // deleteMutate(requestData.card_id);
    console.log(deleteError);
    console.log(requestData.card_id);
    setDeleteModal(false);
  };

  return {
    setStates: {
      setErrorModal,
      setConfirmModal,
      setRequestData,
      setDeleteModal,
      setInfoModal,
      setFilter,
    },
    states: {
      errorModal,
      errorMessage,
      confirmModal,
      requestData,
      deleteModal,
      infoModal,
      filter,
      noMore,
    },
    loadings: {
      withdrawLoading,
      listLoading,
      smsLoading,
      addCardLoading,
      operationListLoading,
    },
    functions: {
      submitPayment,
      withdrawHandler,
      deleteHandler,
      calculateCommision,
      filterHandler,
      showMore,
    },
    mutations: { smsMutate, addCardMutate },
    t,
    smsData,
    withdrawError,
    cardList,
    operationList,
  };
};
