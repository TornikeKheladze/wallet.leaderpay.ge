import { useTranslate } from "../../hooks/useTranslate";
import { profileTranslations } from "../../lang/profileTranslations";
import { passwordTranslations } from "../../lang/passwordTranslations";
import { formTranslations } from "../../lang/formTranslations";
import { useMutation } from "react-query";
import {
  passwordCheck,
  passwordReset,
  passwordSend,
} from "../../services/authorization";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const usePasswordReset = () => {
  const { t } = useTranslate(
    passwordTranslations,
    profileTranslations,
    formTranslations
  );
  const navigate = useNavigate();

  const {
    mutate: mutateCheck,
    isLoading: checkLoading,
    isError: checkError,
    data: checkData,
  } = useMutation(passwordCheck);
  const {
    mutate: mutateSend,
    isLoading: sendLoading,
    isError: sendError,
    data: sendData,
  } = useMutation(passwordSend);

  const {
    mutate: mutateChange,
    isLoading: changeLoading,
    isError: changeError,
    data: changeData,
  } = useMutation({
    mutationFn: passwordReset,
    onSuccess() {
      toast.success(t("passwordChanged"));
      setTimeout(() => {
        navigate("/");
      }, 2000);
    },
  });

  return {
    responses: { checkData, sendData, changeData },
    loadings: { checkLoading, sendLoading, changeLoading },
    errors: { checkError, sendError, changeError },
    mutates: { mutateCheck, mutateSend, mutateChange },
    t,
  };
};
