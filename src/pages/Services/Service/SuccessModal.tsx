import { Link } from "react-router-dom";
import SuccessIcon from "../../../assets/icons/SuccessIcon";
import Modal from "../../../components/modal/Modal";
import { useTranslate } from "../../../hooks/useTranslate";
import { serviceTranslations } from "../../../lang/serviceTranslations";
import BulbIcon from "../../../assets/icons/BulbIcon";

const SuccessModal: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslate(serviceTranslations);
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="text-textPrimary xl:px-52 xl:text-3xl xl:py-16 md:px-24 sm:px-14 px-8 md:text-xl text-lg flex flex-col gap-6 xl:gap-10 justify-center items-center">
        <SuccessIcon className="text-green-600 w-32 h-32" />
        <span>{t("paymentSuccess")}</span>
        <Link
          className="button_primary flex text-sm xl:text-xl items-center gap-3"
          to={"/services"}
        >
          <BulbIcon className="w-6" />
          {t("backToServices")}
        </Link>
      </div>
    </Modal>
  );
};
export default SuccessModal;
