import { useSelector } from "react-redux";
import { useTranslate } from "../../../hooks/useTranslate";
import { serviceTranslations } from "../../../lang/serviceTranslations";
import { FullService, InfoData } from "../../../types/serviceTypes";
import { RootState } from "../../../store/store";
import calculate from "../../../helpers/calculate";
import { formTranslations } from "../../../lang/formTranslations";
import { UseMutateFunction } from "react-query";
import { useState } from "react";
import LoadingSpinner from "../../../components/layout/loadingSpinner/LoadingSpinner";
import Modal from "../../../components/modal/Modal";
import SmsTimer from "../../../components/smsTimer/SmsTimer";

const ConfirmPaymentModal: React.FC<{
  reqPayload: { [key: string]: string | number };
  payMutate: UseMutateFunction<any, any, any, unknown>;
  service: FullService;
  infoData: InfoData;
  payLoading: boolean;
  errorMessages: { [key: string]: string };
  smsLoading: boolean;
  smsMutate: UseMutateFunction<any, any>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  reqPayload,
  service,
  infoData,
  payMutate,
  payLoading,
  errorMessages,
  smsLoading,
  smsMutate,
  isOpen,
  setIsOpen,
}) => {
  const [input, setInput] = useState(0);
  const identificatorKey = service.params_info[0].name;

  const { t } = useTranslate(serviceTranslations, formTranslations);

  const { lang } = useSelector((store: RootState) => store.lang);

  const { amountInGelValue, commInGelValue } = calculate(
    +reqPayload.amount,
    service.commission
  );

  const submitPayment = () => {
    payMutate({ ...reqPayload, sms: input });
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="md:text-xl text-lg md:w-[500px] flex flex-col gap-2 text-textPrimary ">
        <h3 className="text-center text-2xl font-bold mb-3">
          {t("confirmPayment")}
        </h3>
        <div className="flex gap-4 child:flex-1 border-b pb-2 border-gray-600 border-opacity-40">
          <span>{t("service")}</span>
          <span>{service.lang[lang]}</span>
        </div>
        <div className="flex gap-4 child:flex-1 border-b pb-2 border-gray-600 border-opacity-40">
          <span>{t(identificatorKey)}</span>
          <span>{reqPayload[identificatorKey]}</span>
        </div>
        <div className="flex gap-4 child:flex-1 border-b pb-2 border-gray-600 border-opacity-40">
          <span>{t("amount")}</span>
          <span>{reqPayload.amount}</span>
        </div>
        <div className="flex gap-4 child:flex-1 border-b pb-2 border-gray-600 border-opacity-40">
          <span>{t("commission")}</span>
          <span>{commInGelValue}</span>
        </div>
        <div className="flex gap-4 child:flex-1 border-b pb-2 border-gray-600 border-opacity-40">
          <span>{t("totalAmount")}</span>
          <span>{amountInGelValue}</span>
        </div>
        {infoData.sms ? (
          <div className="relative">
            <SmsTimer smsLoading={smsLoading} smsMutate={smsMutate} />

            <label className="block text-sm font-bold mb-2">
              {t("smsCode")}
            </label>
            <input
              onChange={(e) => setInput(+e.target.value)}
              className="form_input placeholder:text-sm"
              placeholder={t("smsCode")}
            />
          </div>
        ) : (
          <></>
        )}
        <button
          type="button"
          onClick={submitPayment}
          className="mt-3 button_primary !rounded-2xl"
        >
          {payLoading ? <LoadingSpinner /> : t("submit")}
        </button>
        <p
          className={`${
            errorMessages.infoErrorMessage ||
            errorMessages.smsErrorMessage ||
            errorMessages.payErrorMessage
              ? "opacity-100"
              : "opacity-0"
          } mt-6 p-2 bg-error max-w-md mx-auto flex-1 text-center transition-opacity duration-200 text-white rounded-lg flex justify-center items-center`}
        >
          {t(
            errorMessages.infoErrorMessage ||
              errorMessages.smsErrorMessage ||
              errorMessages.payErrorMessage ||
              "somethingWentWrong"
          )}
        </p>
      </div>
    </Modal>
  );
};

export default ConfirmPaymentModal;
