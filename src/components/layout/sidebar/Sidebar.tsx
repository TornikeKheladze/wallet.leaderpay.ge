import { Link } from "react-router-dom";
import HomeIcon from "../../../assets/icons/HomeIcon";
import BulbIcon from "../../../assets/icons/BulbIcon";
import { Tooltip } from "@material-tailwind/react";
import LogoutIcon from "../../../assets/icons/LogoutIcon";
import BankCardIcon from "../../../assets/icons/BankCardIcon";
import SettingsIcon from "../../../assets/icons/SettingsIcon";

import useSidebar from "./useSidebar";

const Sidebar = () => {
  const { t, pathname, logoutMutate } = useSidebar();

  return (
    <>
      <div className="pl-8 pr-8 md:pt-24 md:pb-8 bg-bgCard overflow-hidden fixed h-14 md:h-screen left-0 md:top-0 bottom-0 z-30 w-screen md:w-24 flex items-center md:flex-col flex-row">
        <ul className="flex md:flex-col flex-row items-center md:justify-start md:gap-16 md:mt-8 justify-around h-full w-full">
          <li className="p-1 md:hover:bg-primaryYellowHover transition-colors duration-300 rounded-lg group">
            <Tooltip
              className="md:block hidden bg-white text-gray-700"
              content={t("main")}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              placement="right"
            >
              <Link
                className={`group-hover:text-textBlack flex flex-col items-center text-[12px] ${
                  pathname === "/home" ? "text-white" : "text-customGray"
                }`}
                to={"/home"}
              >
                <HomeIcon />
                <span className="md:hidden">{t("main")}</span>
              </Link>
            </Tooltip>
          </li>
          <li className="p-1 md:hover:bg-primaryYellowHover transition-colors duration-300 rounded-lg group">
            <Tooltip
              className="md:block hidden bg-white text-gray-700"
              content={t("services")}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              placement="right"
            >
              <Link
                className={`group-hover:text-textBlack flex flex-col items-center text-[12px] ${
                  pathname.includes("/services")
                    ? "text-white"
                    : "text-customGray"
                }`}
                to={"/services"}
              >
                <BulbIcon />
                <span className="md:hidden">{t("services")}</span>
              </Link>
            </Tooltip>
          </li>
          <li className="p-1 md:hover:bg-primaryYellowHover transition-colors duration-300 rounded-lg group">
            <Tooltip
              className="md:block hidden bg-white text-gray-700"
              content={t("transfer")}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              placement="right"
            >
              <Link
                className={`group-hover:text-textBlack flex flex-col items-center text-[12px] ${
                  pathname.includes("/transfer")
                    ? "text-white"
                    : "text-customGray"
                }`}
                to={"/transfer"}
              >
                <BankCardIcon />
                <span className="text-center md:hidden">{t("transfer")}</span>
              </Link>
            </Tooltip>
          </li>
          <li className="p-1 md:hover:bg-primaryYellowHover transition-colors duration-300 rounded-lg group">
            <Tooltip
              className="md:block hidden bg-white text-gray-700"
              content={t("settings")}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              placement="right"
            >
              <Link
                className={`group-hover:text-textBlack flex flex-col items-center text-[12px] ${
                  pathname === "/settings" ? "text-white" : "text-customGray"
                }`}
                to={"/settings"}
              >
                <SettingsIcon />
                <span className="md:hidden">{t("settings")}</span>
              </Link>
            </Tooltip>
          </li>
        </ul>
        <Tooltip
          className="md:block hidden bg-white text-gray-700"
          content={t("logOut")}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
          placement="right"
        >
          <button className="md:block hidden" onClick={() => logoutMutate()}>
            <LogoutIcon />
          </button>
        </Tooltip>
      </div>
    </>
  );
};

export default Sidebar;
