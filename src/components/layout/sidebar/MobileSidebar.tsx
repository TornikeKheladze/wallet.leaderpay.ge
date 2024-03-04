import { Link, useLocation } from "react-router-dom";
import HomeIcon from "../../../assets/icons/HomeIcon";
import BulbIcon from "../../../assets/icons/BulbIcon";
import { useTranslate } from "../../../hooks/useTranslate";
import { layoutTranslations } from "../../../lang/common";
import PhoneIcon from "../../../assets/icons/PhoneIcon";

const MobileSidebar = () => {
  const { t } = useTranslate(layoutTranslations);

  const { pathname } = useLocation();

  return (
    <div className="pl-8 pr-8 md:pt-24 md:pb-8 bg-bgCard overflow-hidden fixed h-14 md:h-screen left-0 md:top-0 bottom-0 z-30 w-screen md:w-24 flex items-center md:flex-col flex-row">
      <ul className="flex md:flex-col flex-row items-center md:justify-start md:gap-16 md:mt-8 justify-around h-full w-full">
        <li className="p-1 hover:bg-primaryYellowHover transition-colors duration-300 rounded-lg group">
          <Link
            className={`group-hover:text-textBlack flex flex-col items-center text-[12px] ${
              pathname === "/" ? "text-white" : "text-customGray"
            }`}
            to={"/"}
          >
            <HomeIcon />
            <span className="md:hidden">{t("main")}</span>
          </Link>
        </li>
        <li className="p-1 hover:bg-primaryYellowHover transition-colors duration-300 rounded-lg group">
          <Link
            className={`group-hover:text-textBlack flex flex-col items-center text-[12px] ${
              pathname.includes("/guest/services")
                ? "text-white"
                : "text-customGray"
            }`}
            to={"/guest/services"}
          >
            <BulbIcon />
            <span className="md:hidden">{t("services")}</span>
          </Link>
        </li>
        <li className="p-1 hover:bg-primaryYellowHover transition-colors duration-300 rounded-lg group">
          <Link
            className={`group-hover:text-textBlack flex flex-col items-center text-[12px] ${
              pathname.includes("/contact") ? "text-white" : "text-customGray"
            }`}
            to={"/contact"}
          >
            <PhoneIcon />
            <span className="text-center md:hidden">{t("contact")}</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileSidebar;
