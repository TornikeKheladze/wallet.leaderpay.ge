import {
  CheckLoginPayload,
  CheckLoginResponse,
  LoginDataResponse,
  LoginPayload,
} from "../types/login";
import { GetLimitResponse } from "../types/profile";
import { fileInstance, instance } from "./axios";

export const getUserInfo = async (data: any) => {
  return instance.post("/wallet/user", data);
};

export const loginCheck = async (
  data: CheckLoginPayload
): Promise<CheckLoginResponse> => {
  return instance.post("/login_check", data);
};

export const login = async (data: LoginPayload): Promise<LoginDataResponse> => {
  return instance.post("/login", data);
};

export const logout = async () => {
  return instance.post("/logout");
};

export const passwordCheck = (data: { walletNumber: number }): Promise<any> => {
  return instance.post("/password_check", data);
};

export const passwordSend = (data: {
  sms: string;
  token: string;
}): Promise<any> => {
  return instance.post("/password_send", data);
};

export const passwordReset = (data: {
  password: string;
  confirm_password: string;
  token: string;
}): Promise<any> => {
  return instance.post("/password_change", data);
};

export const getRegisterParams = (): Promise<any> => {
  return instance.post("/register_params");
};

export const registerStep1 = (data: any): Promise<any> => {
  return instance.post("/register/1", data);
};

export const registerStep2 = (data: any): Promise<any> => {
  return instance.post("/register/2", data);
};

export const registerStep3 = (data: any): Promise<any> => {
  return instance.post("/register/3", data);
};

export const passwordChange = (data: {
  old_password: string;
  new_password: string;
  confirm_password: string;
}): Promise<any> => {
  return instance.post("/wallet/password", data);
};

export const avatarChange = (data: any): Promise<any> => {
  return fileInstance.post("/wallet/avatar", data);
};

export const verificationStep1 = (): Promise<any> => {
  return instance.post("/verification/1");
};

export const verificationStep2 = (data: any): Promise<any> => {
  return instance.post("/verification/2", data);
};

export const getLimits = (): Promise<GetLimitResponse> => {
  return instance.post("/wallet/limits");
};
