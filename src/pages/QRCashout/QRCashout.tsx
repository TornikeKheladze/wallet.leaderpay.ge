import { useQuery } from "react-query";
import { useTranslate } from "../../hooks/useTranslate";
import { transferTranslations } from "../../lang/transferTranslations";
import { qrInit } from "../../services/withdraw";
import LoadingSpinner from "../../components/layout/loadingSpinner/LoadingSpinner";

const QRCashout = () => {
  const { t } = useTranslate(transferTranslations);
  const { isLoading, data = { url: "" } } = useQuery({
    queryKey: "qrInit",
    queryFn: () => qrInit().then((res) => res.data),
    retry: false,
    staleTime: Infinity,
  });

  return (
    <div className="card p-5 lg:mt-8 my-4 relative min-h-72 h-screen">
      {isLoading && <LoadingSpinner blur />}
      <h2 className="md:text-2xl text-xl">QR {t("cashout")}</h2>
      <iframe className="w-full h-full mt-3" src={data.url} allow="camera" />
    </div>
  );
};

export default QRCashout;
