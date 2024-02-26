import { Dispatch, SetStateAction } from "react";
import Modal from "../../../components/modal/Modal";
import { useTranslate } from "../../../hooks/useTranslate";
import { withdrawTranslations } from "../../../lang/withdrawTranslations";
import LoadingSpinner from "../../../components/layout/loadingSpinner/LoadingSpinner";
import { UseMutateFunction } from "react-query";

type InfoModalProps = {
  infoModal: boolean;
  setInfoModal: Dispatch<SetStateAction<boolean>>;
  addCardMutate: UseMutateFunction<any, any, any, unknown>;
  addCardLoading: boolean;
};

const InfoModal: React.FC<InfoModalProps> = ({
  infoModal,
  setInfoModal,
  addCardMutate,
  addCardLoading,
}) => {
  const { t } = useTranslate(withdrawTranslations);
  return (
    <Modal isOpen={infoModal} setIsOpen={setInfoModal}>
      <div className="flex flex-col justify-center items-center gap-3">
        <h4 className="font-bold ">{t("bindCard")}!</h4>
        <p className="text-center text-red-500 max-w-sm">
          ყურადღება პროვაიდერი ბანკის გვერდზე ბარათის მონაცეწმების შეყვანის დროს
          აუცილებლად მიუთითეთ ბარათის დამახსოვრება წინააღმდეგ შემთხვევაში
          ბარათის დამატება ვერ მოხვდება
        </p>
        <button onClick={addCardMutate} className="button_primary min-w-[60px]">
          {addCardLoading ? <LoadingSpinner /> : t("continue")}
        </button>
      </div>
    </Modal>
  );
};

export default InfoModal;
