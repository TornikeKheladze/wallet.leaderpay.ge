import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SuccessIcon from "../../assets/icons/SuccessIcon";
import { useTranslate } from "../../hooks/useTranslate";
import { useQuery } from "react-query";
import { addCardSuccess } from "../../services/services";
import { useEffect, useState } from "react";
import ErrorModal from "../Withdraw/components/ErrorModal";
import LoadingSpinner from "../../components/layout/loadingSpinner/LoadingSpinner";
import { serviceTranslations } from "../../lang/serviceTranslations";

const AddCardSuccessPage = () => {
  const { t } = useTranslate(serviceTranslations);
  const [searchParams] = useSearchParams();
  const o_operation_id = searchParams.get("o_operation_id");
  const o_order_id = searchParams.get("o_order_id");
  const p_maskedPan = searchParams.get("p_maskedPan");
  const p_paymentSystem = searchParams.get("p_paymentSystem");
  const p_expiry = searchParams.get("p_expiry");
  const card_id = searchParams.get("card_id");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModal, setErrorModal] = useState(false);

  const { isLoading } = useQuery({
    queryFn: () =>
      addCardSuccess(
        o_operation_id,
        o_order_id,
        p_maskedPan,
        p_paymentSystem,
        p_expiry,
        card_id
      ),
    onError: (data: any) => {
      setErrorModal(true);
      setErrorMessage(data.response.data.errorMessage);
    },
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (
      !o_operation_id ||
      !o_order_id ||
      !p_maskedPan ||
      !p_paymentSystem ||
      !card_id ||
      !p_expiry
    )
      navigate("/home");
  }, [
    navigate,
    o_operation_id,
    o_order_id,
    p_maskedPan,
    p_paymentSystem,
    p_expiry,
    card_id,
  ]);

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
            <p>{t("ბარათი წარმატებით დაემატა")}</p>
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

export default AddCardSuccessPage;
