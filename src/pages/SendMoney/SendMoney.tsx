import Form from "../../components/form/Form";
import { Toaster } from "react-hot-toast";
import ConfirmSendModal from "./ConfirmSendModal";
import Modal from "../../components/modal/Modal";
import SuccessIcon from "../../assets/icons/SuccessIcon";
import { useSendMoney } from "./useSendMoney";

const SendMoney = () => {
  const {
    payError,
    infoData,
    fields,
    infoErrorMessage,
    states: { confirmModal, requestData, successModal },
    setStates: { setConfirmModal, setRequestData, setSuccessModal },
    loadings: { payLoading, smsLoading, infoLoading },
    functions: { smsMutate, submitPayment, t, infoSubmit },
  } = useSendMoney();

  return (
    <div>
      <ConfirmSendModal
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
        error={payError}
        loading={payLoading}
        requestData={requestData}
        setRequestData={setRequestData}
        smsLoading={smsLoading}
        smsMutate={smsMutate}
        submitPayment={submitPayment}
        t={t}
        infoResponse={infoData?.data.data}
      />
      <Modal isOpen={successModal} setIsOpen={setSuccessModal}>
        <div className="xl:px-52 xl:text-3xl xl:py-16 md:px-24 sm:px-14 px-8 md:text-xl text-lg flex flex-col gap-6 xl:gap-10 justify-center items-center">
          <SuccessIcon className="text-green-600 w-32 h-32" />
          <span>{t("transferSuccessful")}</span>
        </div>
      </Modal>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="card p-5 lg:mt-8 my-4">
        {/* {isLoading && <LoadingSpinner blur />} */}
        <h2 className="md:text-2xl text-xl mb-4">{t("sendMoney")}</h2>
        <Form
          fields={fields}
          onSubmit={infoSubmit}
          loading={infoLoading || smsLoading}
        />
        <p
          className={`${
            infoErrorMessage ? "opacity-100" : "opacity-0"
          } mt-6 p-2 bg-error flex-1 text-center transition-opacity duration-200 text-white rounded-lg flex justify-center items-center`}
        >
          {infoErrorMessage}
        </p>
      </div>
    </div>
  );
};

export default SendMoney;
