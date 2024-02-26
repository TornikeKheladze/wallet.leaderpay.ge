import RegisterForm from "./RegisterForm";
import LanguageSwitcher from "../../components/languageSwitcher/LanguageSwitcher";
import { useRegister } from "./useRegister";
import Logo from "../../components/logo/Logo";

const Register = () => {
  const { stepOneLoading, fields, params, stepOneMutate, t } = useRegister();

  return (
    <div className="sm:flex max-w-md justify-center md:py-10 py-5 overflow-hidden z-10 mx-auto">
      <div className="bg-bgCard px-8 pb-5 md:pt-32 pt-20 rounded-lg shadow-xl relative">
        <Logo />
        <div className="flex items-center justify-between mb-8">
          <p className="text-textPrimary text-xl">{t("register")}</p>
          <LanguageSwitcher />
        </div>
        <RegisterForm
          loading={stepOneLoading}
          fields={fields()}
          onSubmit={(e) => stepOneMutate(e)}
          registerParams={params}
        />
      </div>
    </div>
  );
};

export default Register;
