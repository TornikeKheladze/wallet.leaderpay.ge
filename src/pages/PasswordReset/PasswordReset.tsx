import Form from "../../components/form/Form";
import {
  resetPasswordForm,
  smsForm,
  walletNumberForm,
} from "../../formArrays/passwordForms";
import LoadingSpinner from "../../components/layout/loadingSpinner/LoadingSpinner";
import { usePasswordReset } from "./usePasswordReset";
import LanguageSwitcher from "../../components/languageSwitcher/LanguageSwitcher";
import Logo from "../../components/logo/Logo";

const PasswordReset = () => {
  const {
    responses: { checkData, sendData, changeData },
    loadings: { checkLoading, sendLoading, changeLoading },
    errors: { checkError, sendError, changeError },
    mutates: { mutateCheck, mutateSend, mutateChange },
    t,
  } = usePasswordReset();

  const renderForm = () => {
    if (!checkData && !sendData && !changeData) {
      return (
        <Form
          fields={walletNumberForm}
          onSubmit={(data) => {
            mutateCheck(data);
          }}
          resetAll
        />
      );
    } else if (checkData && !sendData) {
      return (
        <Form
          fields={smsForm}
          onSubmit={(data) => {
            mutateSend({ ...data, token: checkData.data.token });
          }}
          resetAll
        />
      );
    } else {
      return (
        <Form
          fields={resetPasswordForm}
          onSubmit={(data) => {
            mutateChange({ ...data, token: sendData.data.token });
          }}
        />
      );
    }
  };
  // <div className="mx-7 sm:flex justify-center md:py-10 py-5 overflow-hidden z-10 ">
  // <div className="bg-bgCard px-8 pb-5 md:pt-32 pt-20 rounded-lg shadow-xl sm:w-400">

  return (
    <div className="bg-bgCard mx-3 md:mt-14 mt-6 sm:mx-auto px-8 pb-5 md:pt-32 pt-20 rounded-lg shadow-xl sm:w-400 relative">
      <Logo />
      <div className="flex items-center justify-between mb-8">
        <p className="text-primaryYellow">{t("passwordReset")}</p>
        <LanguageSwitcher />
      </div>
      {checkLoading && <LoadingSpinner blur />}
      {sendLoading && <LoadingSpinner blur />}
      {changeLoading && <LoadingSpinner blur />}

      {renderForm()}

      <p
        className={`${
          checkError || sendError || changeError ? "opacity-100" : "opacity-0"
        } mt-6 p-2 bg-error max-w-md mx-auto flex-1 text-center transition-opacity duration-200 text-white rounded-lg flex justify-center items-center`}
      >
        {checkError && t("incorrectWalletNumber")}
        {sendError && t("smsCodeIsWrong")}
        {changeError && t("something went wrong")}
      </p>
    </div>
  );
};

export default PasswordReset;
