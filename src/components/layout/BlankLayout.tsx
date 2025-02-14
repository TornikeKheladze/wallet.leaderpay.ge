import { ReactNode, useEffect } from "react";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import Footer from "./footer/Footer";
import { useTranslate } from "../../hooks/useTranslate";
import { layoutTranslations } from "../../lang/common";
import LoginIcon from "../../assets/icons/LoginIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import logoSrc from "../../assets/icons/LPlogo (copy).png";
import MobileSidebar from "./sidebar/MobileSidebar";
import { useQuery } from "react-query";
import { getUserInfo } from "../../services/authorization";
import { saveUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import UserDropdown from "./userDropdown/UserDropdown";

const BlankLayout: React.FC<{ children: ReactNode; login?: boolean }> = ({
  children,
  login,
}) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  const { t } = useTranslate(layoutTranslations);
  const navigate = useNavigate();

  useQuery({
    queryKey: ["getUserInfo"],
    queryFn: getUserInfo,
    onSuccess: (data) => {
      dispatch(saveUser(data.data));
    },
    retry: false,
    staleTime: Infinity,
  });
  const { user } = useSelector((store: RootState) => store.user);
  const isLoggedIn = user.id;
  return (
    <>
      <div className="fixed z-20 top-0 w-full px-10 h-16 flex items-center justify-end">
        <div className="ml-auto flex items-center gap-6">
          {pathname === "/" ||
          pathname === "/register" ||
          pathname === "/passwordReset" ? (
            <></>
          ) : (
            <LanguageSwitcher className="text-textPrimary hover:bg-gray-800" />
          )}
          {isLoggedIn ? (
            <UserDropdown />
          ) : (
            login && (
              <Link to={"/"} className="button_primary flex gap-1 items-center">
                {t("login")} <LoginIcon className="h-6" />
              </Link>
            )
          )}
          {pathname.includes("pages") || pathname.includes("news") ? (
            <img
              src={logoSrc}
              onClick={() => navigate(`${isLoggedIn ? "/home" : "/"}`)}
              alt=""
              className="absolute z-30 w-14 top-2 left-6 cursor-pointer"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div
        className={`${
          pathname.includes("guest") ? "md:pt-16" : "md:pt-4"
        } min-h-screen`}
      >
        {children}
      </div>
      <Footer />
      <div className="md:hidden flex">
        <MobileSidebar />
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
};

export default BlankLayout;
