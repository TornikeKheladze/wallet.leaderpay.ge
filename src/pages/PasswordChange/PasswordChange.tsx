import Form from "../../components/form/Form";
import LoadingSpinner from "../../components/layout/loadingSpinner/LoadingSpinner";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "react-query";
import { useTranslate } from "../../hooks/useTranslate";
import { passwordTranslations } from "../../lang/passwordTranslations";
import { useNavigate } from "react-router-dom";
import { passwordChange } from "../../services/authorization";
import { formTranslations } from "../../lang/formTranslations";
import { changePasswordForm } from "../../formArrays/passwordForms";
import { profileTranslations } from "../../lang/profileTranslations";

const PasswordChange = () => {
  const { t } = useTranslate(
    passwordTranslations,
    formTranslations,
    profileTranslations
  );
  const navigate = useNavigate();
  const {
    mutate: mutateChange,
    isLoading: changeLoading,
    isError: changeError,
  } = useMutation({
    mutationFn: passwordChange,
    onSuccess() {
      toast.success(t("passwordChanged"));
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    },
  });

  return (
    <div className="card p-5 lg:mt-8 my-4">
      <Toaster position="bottom-right" reverseOrder={false} />
      <h3 className="md:text-2xl text-xl mb-5 max-w-md w-full mx-auto">
        {t("passwordChange")}
      </h3>

      {changeLoading && <LoadingSpinner blur />}

      <Form fields={changePasswordForm} onSubmit={(e) => mutateChange(e)} />

      <p
        className={`${
          changeError ? "opacity-100" : "opacity-0"
        } mt-6 p-2 bg-error max-w-md mx-auto flex-1 text-center transition-opacity duration-200 text-white rounded-lg flex justify-center items-center`}
      >
        {changeError && t("something went wrong")}
      </p>
    </div>
  );
};

export default PasswordChange;
