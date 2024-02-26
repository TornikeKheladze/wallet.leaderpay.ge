import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UseMutateFunction } from "react-query";
import LoadingSpinner from "../../components/layout/loadingSpinner/LoadingSpinner";
import RefreshIcon from "../../assets/icons/RefreshIcon";
import TimerIcon from "../../assets/icons/TimerIcon";
import { TransferPay } from "../../types/transfer";
import Modal from "../../components/modal/Modal";

type PercentageInfo = {
  percents: { commission: number; min: number; percent: number };
  reciver: string;
};

type ConfirmSendModalProps = {
  setConfirmModal: Dispatch<SetStateAction<boolean>>;
  t: (key: string) => string;
  smsMutate: UseMutateFunction<any, any>;
  setRequestData: React.Dispatch<React.SetStateAction<TransferPay>>;
  submitPayment: () => void;
  requestData: TransferPay;
  smsLoading: boolean;
  loading: boolean;
  error: any;
  confirmModal: boolean;
  infoResponse?: PercentageInfo;
};

const ConfirmSendModal: React.FC<ConfirmSendModalProps> = ({
  confirmModal,
  setConfirmModal,
  t,
  requestData,
  smsLoading,
  setRequestData,
  submitPayment,
  loading,
  error,
  smsMutate,
  infoResponse,
}) => {
  const [seconds, setSeconds] = useState(60);
  const resendHandler = () => {
    smsMutate();
    setTimeout(() => {
      setSeconds(60);
    }, 500);
  };

  useEffect(() => {
    if (confirmModal) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [seconds, confirmModal]);

  const calculateComission = () => {
    if (infoResponse) {
      const {
        percents: { commission: backendComission, min, percent },
      } = infoResponse;
      let commission = backendComission;
      const amount = +requestData.amount;
      commission = (amount / 100) * percent;
      if (min > commission) {
        commission = min;
      }
      let totalAmount: number = amount + commission;
      commission = +commission.toFixed(2);
      totalAmount = +totalAmount.toFixed(2);
      return { commission, totalAmount };
    }
  };

  return (
    <Modal isOpen={confirmModal} setIsOpen={setConfirmModal}>
      <div className="md:text-xl text-lg md:w-[500px] flex flex-col gap-2">
        <h3 className="text-center text-2xl font-bold mb-3">{t("confirm")}</h3>
        <div className="flex gap-4 child:flex-1 border-b pb-2 border-gray-600 border-opacity-40">
          <span>{t("walletPersNumber")}</span>
          <span>{requestData.wallet_number}</span>
        </div>
        <div className="flex gap-4 child:flex-1 border-b pb-2 border-gray-600 border-opacity-40">
          <span>{t("user")}</span>
          <span>{infoResponse?.reciver}</span>
        </div>
        <div className="flex gap-4 child:flex-1 border-b pb-2 border-gray-600 border-opacity-40">
          <span>{t("amount")}</span>
          <span>{requestData.amount}</span>
        </div>
        <div className="flex gap-4 child:flex-1 border-b pb-2 border-gray-600 border-opacity-40">
          <span>{t("commission")}</span>
          <span>{calculateComission()?.commission}</span>
        </div>
        <div className="flex gap-4 child:flex-1 border-b pb-2 border-gray-600 border-opacity-40">
          <span>{t("youWillBeCharged")}</span>
          <span>{calculateComission()?.totalAmount}</span>
        </div>

        <div className="relative">
          {seconds === 0 ? (
            <button
              type="button"
              onClick={resendHandler}
              className="min-w-[100px] group button_primary absolute right-0 bottom-0 flex items-center justify-center gap-1 text-sm rounded-md h-11"
            >
              {smsLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <RefreshIcon className="w-5 text-white" />
                  {t("resendSms")}
                </>
              )}
            </button>
          ) : (
            <span className="absolute right-3 bottom-2 flex gap-2 items-center justify-center">
              {seconds} <TimerIcon />
            </span>
          )}

          <label className="block text-customGray text-sm font-bold mb-2">
            {t("smsCode")}
          </label>
          <input
            onChange={(e) =>
              setRequestData((prevState) => {
                return { ...prevState, sms: e.target.value };
              })
            }
            className="form_input placeholder:text-sm"
            placeholder={t("smsCode")}
          />
        </div>
        <button
          type="button"
          disabled={requestData.sms?.length === 6 ? false : true}
          onClick={submitPayment}
          className={`mt-3 button_primary !rounded-2xl ${
            requestData.sms?.length === 6
              ? "cursor-pointer"
              : "cursor-not-allowed"
          }`}
        >
          {loading ? <LoadingSpinner /> : t("confirm")}
        </button>
        <p
          className={`${
            error ? "opacity-100" : "opacity-0"
          } mt-6 p-2 bg-error max-w-md mx-auto flex-1 text-center transition-opacity duration-200 text-white rounded-lg flex justify-center items-center`}
        >
          {error?.response.data.errorMessage || t("somethingWentWrong")}
        </p>
      </div>
    </Modal>
  );
};

export default ConfirmSendModal;
