import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SuccessIcon from "../../assets/icons/SuccessIcon";
import { useTranslate } from "../../hooks/useTranslate";
import { useQuery } from "react-query";
import { merchantPay } from "../../services/services";
import { useEffect, useState } from "react";
import ErrorModal from "../Withdraw/components/ErrorModal";
import LoadingSpinner from "../../components/layout/loadingSpinner/LoadingSpinner";

const Success = () => {
  const { t } = useTranslate();
  const [searchParams] = useSearchParams();
  const hash = searchParams.get("hash");
  const operation_id = searchParams.get("operation_id");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModal, setErrorModal] = useState(false);

  const { isLoading } = useQuery({
    queryFn: () => merchantPay("success", hash, operation_id),
    onSuccess: () => {},
    onError: (data: any) => {
      setErrorModal(true);
      setErrorMessage(data.response.data.message);
    },
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!hash) navigate("/home");
    if (!operation_id) navigate("/");
  }, [hash, operation_id, navigate]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center pb-14">
      <ErrorModal
        errorMessage={errorMessage}
        errorModal={errorModal}
        setErrorModal={setErrorModal}
      />
      {isLoading ? (
        <LoadingSpinner blur />
      ) : (
        !errorMessage && (
          <>
            <p>{t("გადახდა წარმატებულია")}</p>
            <SuccessIcon className="text-green-500 w-48 h-48" />
          </>
        )
      )}
      <Link to={"/services"} className="button_primary">
        {t("backToWallet")}
      </Link>
    </div>
  );
};

export default Success;
