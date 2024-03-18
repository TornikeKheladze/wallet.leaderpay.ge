import { Link } from "react-router-dom";
import { useTranslate } from "../../hooks/useTranslate";
import ErrIcon from "../../assets/icons/ErrIcon";

const Failed = () => {
  const { t } = useTranslate();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center pb-14">
      <p>{t("text")}</p>
      <ErrIcon className="text-danger w-48 h-48" />
      <Link to={"/services"} className="button_primary">
        {t("backToWallet")}
      </Link>
    </div>
  );
};

export default Failed;
