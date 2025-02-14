import { Link } from "react-router-dom";
import Form from "../../components/form/Form";
import { loginForm } from "../../formArrays/loginForm";

import LoadingSpinner from "../../components/layout/loadingSpinner/LoadingSpinner";
import { useLogin } from "./useLogin";
import LanguageSwitcher from "../../components/languageSwitcher/LanguageSwitcher";
import Logo from "../../components/logo/Logo";
import logoSrc from "../../assets/icons/LPlogo (copy).png";

const Login = () => {
  const {
    checkLoginData,
    loginLoading,
    t,
    setSmsInput,
    loginError,
    isSixDigits,
    smsInput,
    signIn,
    checkError,
    checkLoading,
    onFormSubmit,
    userInfoLoading,
    isFetched,
  } = useLogin();

  return (
    <div className="mx-7 sm:flex justify-center md:py-10 py-5 overflow-hidden z-10 ">
      {!isFetched && userInfoLoading && (
        <div className="fixed bg-bgCard top-0 left-0 w-screen h-screen z-50 flex items-center justify-center">
          <img className="animate-bounce" src={logoSrc} />
        </div>
      )}
      <div className="bg-bgCard px-8 pb-5 md:pt-32 pt-20 rounded-lg shadow-xl sm:w-400 relative">
        <Logo />
        <div className="flex items-center justify-between mb-8">
          <p className="text-textPrimary">{t("signInToWallet")}</p>
          <LanguageSwitcher className="text-textPrimary hover:bg-gray-800" />
        </div>
        {checkLoginData ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signIn();
            }}
            className="flex flex-col gap-3 mt-6"
          >
            {loginLoading && <LoadingSpinner blur />}
            <label className="block text-textPrimary text-sm font-bold mb-2">
              {t("smsCode")}
            </label>
            <input
              type="number"
              onChange={(e) => setSmsInput(e.target.value)}
              className={`${
                loginError ? "border-error" : ""
              } shadow appearance-none border rounded w-full bg-gray-200 h-11 py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline`}
            />
            <button
              disabled={!isSixDigits(smsInput)}
              className="disabled:cursor-not-allowed bg-primaryYellow transition-all duration-200 uppercase font-normal cursor-pointer w-full hover:bg-primaryYellowHover text-textBlack py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
            >
              {t("signIn")}
            </button>
          </form>
        ) : (
          <>
            {checkLoading && <LoadingSpinner blur />}
            <Form
              fields={loginForm}
              onSubmit={onFormSubmit}
              resetButton={
                <Link
                  className="text-primaryYellow text-sm ml-auto block w-1/2 text-right mb-2"
                  to={"/passwordReset"}
                >
                  {t("resetPassword")}
                </Link>
              }
            />

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 font-bpg-arial">
              <p className="text-textPrimary">{t("dontHaveAccount")} ?</p>
              <Link className="text-primaryYellow" to={"/register"}>
                {t("signUp")}
              </Link>
            </div>
          </>
        )}
        <p
          className={`${
            checkError || loginError ? "opacity-100" : "opacity-0"
          } mt-6 p-2 bg-error flex-1 text-center transition-opacity duration-200 text-white rounded-lg flex justify-center items-center`}
        >
          {checkError ? t("wrongCredentials") : t("smsCodeIsWrong")}
        </p>
      </div>
    </div>
  );
};

export default Login;
