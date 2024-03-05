import { useSelector } from "react-redux";
import { useTranslate } from "../../../hooks/useTranslate";
import { homeTranslations } from "../../../lang/homeTranslations";
import { RootState } from "../../../store/store";
import TemplateIcon from "../../../assets/icons/TemplateIcon";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Tooltip } from "@material-tailwind/react";
import toast from "react-hot-toast";
import CopyIcon from "../../../assets/icons/CopyIcon";

const CardHead: React.FC = () => {
  const { t } = useTranslate(homeTranslations);
  const { user } = useSelector((store: RootState) => store.user);
  const { templates } = useSelector((store: RootState) => store.template);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const copyToClipboard = (content: string) => {
    navigator.clipboard
      .writeText(content)
      .then(() => toast.success(t("textCopied")));
  };

  return (
    <div
      className={`${
        open ? "h-40" : "h-8"
      } text-textPrimary lg:h-12 relative transition-all duration-300 overflow-hidden text-xs grid grid-cols-2 lg:flex lg:flex-row items-center lg:justify-end gap-4`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden block absolute -right-1 top-0  w-8 h-8 rounded-full"
      >
        <svg
          className={`h-6 w-6 transform ${
            open ? "rotate-180" : "rotate-0"
          } transition-transform duration-300`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M7 10l5 5 5-5z" fill="currentColor" />
        </svg>
      </button>
      <Link
        to={"/templates"}
        className="group text-center button_primary lg:order-first order-1 flex items-center gap-2"
      >
        <span className="relative">
          <small className="absolute text-center -top-2 -right-2 text-xs w-4 h-4 rounded-full bg-customGray ">
            {templates.length}
          </small>
          <TemplateIcon className="text-textBlack  transition-all duration-300" />
        </span>
        {t("myTemplates")}
      </Link>
      <Tooltip
        className="bg-blue-gray-300 text-gray-900"
        content={t("transactions") + " GEL"}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
        placement="top"
      >
        <button
          onClick={() => navigate("/home?currency=GEL&id=981")}
          className="flex flex-col justify-center items-center border-r border-l px-2 border-buttonGray hover:bg-primaryYellowHover hover:text-textBlack transition-colors duration-300 rounded-md"
        >
          <span>{t("balance")} </span>
          <span>{user.balance}₾</span>
        </button>
      </Tooltip>
      <Tooltip
        className="bg-blue-gray-300 text-gray-900"
        content={t("transactions") + " USD"}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
        placement="top"
      >
        <button
          onClick={() => navigate("/home?currency=USD&id=840")}
          className="flex flex-col justify-center items-center border-r border-l px-2 border-buttonGray hover:bg-primaryYellowHover hover:text-textBlack transition-colors duration-300 rounded-md"
        >
          <span>{t("balance")} </span>
          <span>{user.balance_usd}$</span>
        </button>
      </Tooltip>
      <Tooltip
        className="bg-blue-gray-300 text-gray-900"
        content={t("transactions") + " RUB"}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
        placement="top"
      >
        <button
          onClick={() => navigate("/home?currency=RUB&id=643")}
          className="flex flex-col justify-center items-center border-r border-l px-2 border-buttonGray hover:bg-primaryYellowHover hover:text-textBlack transition-colors duration-300 rounded-md"
        >
          <span>{t("balance")} </span>
          <span>{user.balance_rub}₽</span>
        </button>
      </Tooltip>
      <Tooltip
        className="bg-blue-gray-300 text-gray-900"
        content={t("transactions") + " EUR"}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
        placement="top"
      >
        <button
          onClick={() => navigate("/home?currency=EUR&id=978")}
          className="flex flex-col justify-center items-center border-r border-l px-2 border-buttonGray hover:bg-primaryYellowHover hover:text-textBlack transition-colors duration-300 rounded-md"
        >
          <span>{t("balance")} </span>
          <span>{user.balance_eur}€</span>
        </button>
      </Tooltip>
      <div className="flex flex-col items-center justify-center order-last">
        <span className="text-center">{t("walletPersNumber")}</span>
        <span
          className="flex items-center gap-1"
          onClick={() => copyToClipboard(user.wallet_number)}
        >
          {user.wallet_number}

          <Tooltip
            className="bg-blue-gray-300 text-gray-900 text-xs mb-0"
            content={t("copy")}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            placement="top"
          >
            <button>
              <CopyIcon className="w-4 hover:text-green-800" />
            </button>
          </Tooltip>
        </span>
      </div>
    </div>
  );
};

export default CardHead;
