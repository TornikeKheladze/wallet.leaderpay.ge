import { Dispatch, SetStateAction } from "react";
import ErrIcon from "../../../assets/icons/ErrIcon";
import Modal from "../../../components/modal/Modal";
import { useTranslate } from "../../../hooks/useTranslate";
import { withdrawTranslations } from "../../../lang/withdrawTranslations";

type ErrorModalProps = {
  errorModal: boolean;
  setErrorModal: Dispatch<SetStateAction<boolean>>;
  errorMessage: string;
};

const ErrorModal: React.FC<ErrorModalProps> = ({
  errorModal,
  setErrorModal,
  errorMessage,
}) => {
  const { t } = useTranslate(withdrawTranslations);
  return (
    <Modal isOpen={errorModal} setIsOpen={setErrorModal}>
      <div className="flex flex-col justify-center items-center">
        <ErrIcon className="text-red-500" />
        <h4 className="font-bold ">{t("error")}!</h4>
        <p className="text-center">{errorMessage}</p>
      </div>
    </Modal>
  );
};

export default ErrorModal;
