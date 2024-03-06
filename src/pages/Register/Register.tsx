import RegisterForm from "./RegisterForm";
import LanguageSwitcher from "../../components/languageSwitcher/LanguageSwitcher";
import { useRegister } from "./useRegister";
import Logo from "../../components/logo/Logo";
import Modal from "../../components/modal/Modal";
import LoadingSpinner from "../../components/layout/loadingSpinner/LoadingSpinner";

const Register = () => {
  const {
    loadings: { stepOneLoading, stepTwoLoading },
    mutates: { stepOneMutate, stepTwoMutate },
    states: { smsModal, smsInput, setSmsModal, setSmsInput },
    fields,
    params,
    t,
  } = useRegister();

  return (
    <div className="sm:flex max-w-md justify-center md:py-10 py-5 overflow-hidden z-10 mx-auto">
      <Modal isOpen={smsModal} setIsOpen={setSmsModal}>
        <div className="flex flex-col gap-4">
          <p>{t("smsCode")}</p>
          <input
            value={smsInput}
            onChange={(e) => setSmsInput(e.target.value)}
            className="form_input"
          />
          <button
            onClick={() => {
              stepTwoMutate({
                token: localStorage.getItem("token"),
                sms: smsInput,
              });
            }}
            className="button_primary"
          >
            {stepTwoLoading ? <LoadingSpinner /> : t("submit")}
          </button>
        </div>
      </Modal>
      <div className="bg-bgCard md:mb-0 mb-8 px-8 pb-5 md:pt-32 pt-20 rounded-lg shadow-xl relative">
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
