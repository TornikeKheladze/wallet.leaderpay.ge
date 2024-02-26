import PersonIcon from "../../../assets/icons/PersonIcon";
import { Link } from "react-router-dom";
import LogoutIcon from "../../../assets/icons/LogoutIcon";

import useUserDropdown from "./useUserDropdown";

const UserDropdown: React.FC = () => {
  const { dropdownRef, isOpen, setIsOpen, user, t, logoutMutate } =
    useUserDropdown();

  return (
    <div className="relative ml-auto" ref={dropdownRef}>
      {user.avatar ? (
        <img
          src={user.avatar + "?<?=time() ?>"}
          className="cursor-pointer object-cover w-[46px] h-[46px] bg-primaryYellow  hover:bg-primaryYellowHover transition-colors duration-300 rounded-full focus:outline-none"
          alt="avatar"
          onClick={() => setIsOpen(!isOpen)}
        />
      ) : (
        <button
          className="bg-primaryYellow  hover:bg-primaryYellowHover transition-colors duration-300 rounded-full p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <PersonIcon color="white" />
        </button>
      )}

      <div
        className={`${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } absolute top-10 rounded-lg right-0 mt-4 bg-bg4 shadow-lg w-60 transition-opacity duration-300`}
      >
        <div className="px-5 py-3 flex items-center gap-2 border-b border-customGray border-opacity-30 pb-3">
          <PersonIcon />
          <div className="">
            <h4 className="font-semibold text-base">
              {`${user.first_name} ${user.last_name}`}
            </h4>
            <p className="text-sm">{user.email}</p>
          </div>
        </div>
        <Link
          className="px-5 hover:bg-primaryYellowHover hover:text-textBlack w-full h-12 flex items-center gap-2"
          to={"/profile"}
          onClick={() => setIsOpen(false)}
        >
          <PersonIcon /> {t("profile")}
        </Link>
        <button
          onClick={() => logoutMutate()}
          className="px-5 text-red-500 hover:bg-red-500 hover:text-white w-full h-12 flex items-center gap-2"
        >
          <LogoutIcon className="text-inherit" /> {t("logOut")}
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
