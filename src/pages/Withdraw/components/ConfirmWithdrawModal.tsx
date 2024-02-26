import { Dispatch, SetStateAction, useEffect, useState } from "react";
import RefreshIcon from "../../../assets/icons/RefreshIcon";
import TimerIcon from "../../../assets/icons/TimerIcon";
import LoadingSpinner from "../../../components/layout/loadingSpinner/LoadingSpinner";
import Modal from "../../../components/modal/Modal";
import { SmsCardResponse, Withdraw } from "../../../types/withdraw";
import { UseMutateFunction } from "react-query";

type ConfirmModalProps = {
  confirmModal: boolean;
  setConfirmModal: Dispatch<SetStateAction<boolean>>;
  t: (key: string) => string;
  smsData: SmsCardResponse | undefined;
  requestData: Withdraw;
  calculateCommision: () => string;
  smsLoading: boolean;
  setRequestData: React.Dispatch<React.SetStateAction<Withdraw>>;
  submitPayment: () => void;
  withdrawLoading: boolean;
  withdrawError: any;
  smsMutate: UseMutateFunction<SmsCardResponse, any, Withdraw, unknown>;
};

const ConfirmWithdrawModal: React.FC<ConfirmModalProps> = ({
  confirmModal,
  setConfirmModal,
  t,
  smsData,
  requestData,
  calculateCommision,
  smsLoading,
  setRequestData,
  submitPayment,
  withdrawLoading,
  withdrawError,
  smsMutate,
}) => {
  const [seconds, setSeconds] = useState(60);
  const resendHandler = () => {
    smsMutate(requestData);
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

  return (
    <Modal isOpen={confirmModal} setIsOpen={setConfirmModal}>
      <div className="md:text-xl text-lg md:w-[500px] flex flex-col gap-2">
        <h3 className="text-center text-2xl font-bold mb-3">{t("confirm")}</h3>
        <div className="flex gap-4 child:flex-1 border-b pb-2 border-gray-600 border-opacity-40">
          <span>{t("cardName")}</span>
          <span>{smsData?.data.data.card_name}</span>
        </div>
        <div className="flex gap-4 child:flex-1 border-b pb-2 border-gray-600 border-opacity-40">
          <span>{t("amount")}</span>
          <span>{requestData.amount}</span>
        </div>
        <div className="flex gap-4 child:flex-1 border-b pb-2 border-gray-600 border-opacity-40">
          <span>{t("youWillBeCharged")}</span>
          <span>{calculateCommision()}</span>
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
            <span className="absolute text-textBlack right-3 bottom-2 flex gap-2 items-center justify-center">
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
          {withdrawLoading ? <LoadingSpinner /> : t("confirm")}
        </button>
        <p
          className={`${
            withdrawError ? "opacity-100" : "opacity-0"
          } mt-6 p-2 bg-error max-w-md mx-auto flex-1 text-center transition-opacity duration-200 text-white rounded-lg flex justify-center items-center`}
        >
          {withdrawError?.response.data.errorMessage || t("somethingWentWrong")}
        </p>
      </div>
    </Modal>
  );
};

export default ConfirmWithdrawModal;
