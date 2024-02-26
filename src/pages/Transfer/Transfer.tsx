import { Link } from "react-router-dom";
import { useTranslate } from "../../hooks/useTranslate";
import { transferTranslations } from "../../lang/transferTranslations";
import AddBalanceIcon from "../../assets/icons/AddBalanceIcon";
import ExchangeIcon from "../../assets/icons/ExchangeIcon";
import SendMoneyIcon from "../../assets/icons/SendMoneyIcon";
import ToCardIcon from "../../assets/icons/ToCardIcon";
import WithDrawIcon from "../../assets/icons/WithDrawIcon";
import { exchangeTranslations } from "../../lang/exchangeTranslations";
import QRIcon from "../../assets/icons/QRIcon";

const Transfer = () => {
  const { t } = useTranslate(transferTranslations, exchangeTranslations);

  return (
    <div className="text-gray-700 md:text-base text-xs lg:mt-8 my-4">
      <div
        className="card p-3 md:p-5 flex flex-wrap gap-3 justify-center
      child:rounded-2xl child:flex child:items-center child:flex-col child:justify-start"
      >
        <Link
          className="group mb-2 bg-bg7 text-textPrimary  p-2 md:py-5 md:w-60 w-28 h-32"
          to={"withdraw"}
        >
          <span className="transfer_icon">
            <ToCardIcon className="group-hover:text-textBlack" />
          </span>
          <span className="transfer_icon_txt mt-auto">
            {t("withdrawMoneyToTheCard")}
          </span>
        </Link>
        <Link
          className="group mb-2 bg-bg7 text-textPrimary  p-2 md:py-5 md:w-60 w-28 h-32"
          to={"exchange"}
        >
          <span className="transfer_icon">
            <ExchangeIcon className="group-hover:text-textBlack" />
          </span>
          <span className="transfer_icon_txt mt-auto">
            {t("transferBetweenOwnAccounts")}
          </span>
        </Link>
        <Link
          className="group mb-2 bg-bg7 text-textPrimary  p-2 md:py-5 md:w-60 w-28 h-32"
          to={"addBalance"}
        >
          <span className="transfer_icon">
            <AddBalanceIcon className="group-hover:text-textBlack" />
          </span>
          <span className="transfer_icon_txt mt-auto">{t("addBalance")}</span>
        </Link>

        <Link
          className="group mb-2 bg-bg7 text-textPrimary  p-2 md:py-5 md:w-60 w-28 h-32"
          to={"sendMoney"}
        >
          <span className="transfer_icon">
            <SendMoneyIcon className="group-hover:text-textBlack" />
          </span>
          <span className="transfer_icon_txt mt-auto">{t("sendMoney")}</span>
        </Link>

        <Link
          className="group mb-2 bg-bg7 text-textPrimary  p-2 md:py-5 md:w-60 w-28 h-32"
          to={"cashout"}
        >
          <span className="transfer_icon">
            <WithDrawIcon className="group-hover:text-textBlack" />
          </span>
          <span className="transfer_icon_txt mt-auto">
            {t("cashWithdrawal")}
          </span>
        </Link>
        <Link
          className="group mb-2 bg-bg7 text-textPrimary  p-2 md:py-5 md:w-60 w-28 h-32"
          to={"qrCashout"}
        >
          <span className="transfer_icon">
            <QRIcon className="group-hover:text-textBlack group-hover:fill-textBlack fill-textPrimary" />
          </span>
          <span className="transfer_icon_txt mt-auto">QR {t("cashout")}</span>
        </Link>
      </div>
    </div>
  );
};

export default Transfer;
