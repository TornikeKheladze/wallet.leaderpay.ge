import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../hooks/useTranslate";
import { useMutation } from "react-query";
import { login, loginCheck } from "../../services/authorization";
import {
  CheckLoginPayload,
  CheckLoginResponse,
  LoginDataResponse,
  LoginPayload,
} from "../../types/login";
import { useState } from "react";
import { authTranslations } from "../../lang/authTranslations";

export const useLogin = () => {
  const { t } = useTranslate(authTranslations);
  const navigate = useNavigate();

  const [smsInput, setSmsInput] = useState<number | string>();

  const {
    mutate: mutateCheck,
    data: checkLoginData,
    isLoading: checkLoading,
    isError: checkError,
  } = useMutation<CheckLoginResponse, any, CheckLoginPayload>(loginCheck);

  const {
    mutate: mutateLogin,
    isLoading: loginLoading,
    isError: loginError,
  } = useMutation<LoginDataResponse, any, LoginPayload>({
    mutationFn: login,
    onSuccess(data) {
      localStorage.setItem(
        "access_token",
        JSON.stringify(data.data.access_token)
      );
      navigate("/home");
    },
  });

  const signIn = () => {
    mutateLogin({ token: checkLoginData?.data.token, sms: smsInput });
  };

  const onFormSubmit = (data: any) => {
    mutateCheck(data);
  };

  const isSixDigits = (input: any) => {
    const regex = /^[0-9]*$/;
    return regex.test(input);
  };

  return {
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
  };
};
