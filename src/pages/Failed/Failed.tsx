import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslate } from "../../hooks/useTranslate";
import ErrIcon from "../../assets/icons/ErrIcon";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { merchantPay } from "../../services/services";
import { serviceTranslations } from "../../lang/serviceTranslations";

const Failed = () => {
  const { t } = useTranslate(serviceTranslations);
  const [searchParams] = useSearchParams();
  const hash = searchParams.get("hash");
  const operation_id = searchParams.get("operation_id");
  const navigate = useNavigate();

  useQuery({
    queryFn: () => merchantPay("failed", hash, operation_id),
    onSuccess: () => {},

    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!hash) navigate("/home");
    if (!operation_id) navigate("/home");
  }, [hash, operation_id, navigate]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center pb-14">
      <p>{t("გადახდა ვერ მოხერხდა")}</p>
      <ErrIcon className="text-danger w-48 h-48" />
      <Link to={"/services"} className="button_primary">
        {t("backToWallet")}
      </Link>
    </div>
  );
};

export default Failed;
