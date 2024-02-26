import { useTranslate } from "../../hooks/useTranslate";
import { transferTranslations } from "../../lang/transferTranslations";

const QRCashout = () => {
  const { t } = useTranslate(transferTranslations);
  return (
    <div>
      <div className="card p-5 lg:mt-8 my-4">
        <h2 className="md:text-2xl text-xl">QR {t("cashout")}</h2>
      </div>
    </div>
  );
};

export default QRCashout;
