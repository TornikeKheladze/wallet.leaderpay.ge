import { Link } from "react-router-dom";
import { useTranslate } from "../../hooks/useTranslate";
import ErrIcon from "../../assets/icons/ErrIcon";
import { useQuery } from "react-query";
import { addCardFailed } from "../../services/services";
import { serviceTranslations } from "../../lang/serviceTranslations";

const AddCardFailedPage = () => {
  const { t } = useTranslate(serviceTranslations);

  useQuery({
    queryFn: () => addCardFailed(),
    retry: false,
    staleTime: Infinity,
  });

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center pb-14">
      <p>{t("ბარათის დამატება ვერ მოხერხდა")}</p>
      <ErrIcon className="text-danger w-48 h-48" />
      <Link to={"/services"} className="button_primary">
        {t("backToWallet")}
      </Link>
    </div>
  );
};

export default AddCardFailedPage;
