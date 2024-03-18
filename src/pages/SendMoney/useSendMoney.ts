import { useMutation, useQueryClient } from "react-query";
import { FormField } from "../../types/general";
import {
  transferInfo,
  transferPay,
  transferSms,
} from "../../services/transfer";
import { useState } from "react";
import { useTranslate } from "../../hooks/useTranslate";
import { transferTranslations } from "../../lang/transferTranslations";
import toast from "react-hot-toast";
import { TransferPay } from "../../types/transfer";
import { formTranslations } from "../../lang/formTranslations";
import { currencies } from "../../data/currencies";

export const useSendMoney = () => {
  const { t } = useTranslate(transferTranslations, formTranslations);
  const queryClient = useQueryClient();
  const [fields, setFields] = useState<FormField[]>([
    {
      name: "wallet_number",
      label: "walletPersNumber",
      type: "number",
      validation: {
        required: "requiredField",
      },
    },
  ]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [requestData, setRequestData] = useState<TransferPay>({
    amount: "",
    currency_id: "",
    sms: "",
    wallet_number: "",
  });

  const {
    mutate: infoMutate,
    isLoading: infoLoading,
    error: infoError,
    data: infoData,
  } = useMutation<any, any, any>({
    mutationFn: transferInfo,
    onSuccess(data) {
      const response = data.data.data;
      setFields([
        {
          name: "wallet_number",
          label: "walletPersNumber",
          type: "text",
          readonly: true,
          validation: {
            required: "requiredField",
          },
        },
        {
          name: "user",
          label: "user",
          type: "text",
          value: response.reciver,
          readonly: true,
        },
        {
          name: "amount",
          label: "amount",
          type: "number",
          validation: {
            validate: (val: string) => {
              const numericValue = parseFloat(val);
              if (!val.trim()) {
                return "requiredField";
              }
              if (isNaN(numericValue) || numericValue <= 0) {
                return "amountMustBeNumberGreaterThanZero";
              }
            },
          },
        },
        {
          name: "currency_id",
          type: "select",
          label: "currency",
          options: currencies,
        },
      ]);
    },
  });

  const { mutate: smsMutate, isLoading: smsLoading } = useMutation<any, any>({
    mutationFn: transferSms,
    onSuccess() {
      setConfirmModal(true);
      toast.success(t("smsCodeSent"));
    },
  });

  const {
    mutate: payMutate,
    isLoading: payLoading,
    error: payError,
  } = useMutation<any, any, TransferPay>({
    mutationFn: transferPay,
    onSuccess() {
      queryClient.invalidateQueries("getUserInfo");
      setConfirmModal(false);
      setSuccessModal(true);
    },
  });

  const infoSubmit = (e: any) => {
    if (!infoData) {
      infoMutate(e);
    } else {
      setRequestData(e);
      smsMutate();
    }
  };

  const submitPayment = () => {
    payMutate(requestData);
  };

  const infoErrorMessage = infoError?.response.data.errorMessage;
  return {
    states: { confirmModal, requestData, successModal },
    setStates: { setConfirmModal, setRequestData, setSuccessModal },
    loadings: {
      payLoading,
      smsLoading,
      infoLoading,
    },
    functions: {
      smsMutate,
      submitPayment,
      t,
      infoSubmit,
    },
    payError,
    infoData,
    fields,
    infoErrorMessage,
  };
};
