import { SmsCardResponse, Withdraw } from "../types/withdraw";
import { instance } from "./axios";

export const getWithdrawList = () => {
  return instance.post("/withdraw/list");
};

export const smsWithdraw: (data: Withdraw) => Promise<SmsCardResponse> = (
  data
) => {
  return instance.post("/withdraw/withdraw-sms", data);
};

export const withdraw: (data: Withdraw) => Promise<any> = (data) => {
  return instance.post("/withdraw/withdraw", data);
};

export const deleteCard: (id: string) => Promise<any> = (id) => {
  return instance.post(`/withdraw/delete/${id}`);
};

export const addCard: () => Promise<any> = () => {
  return instance.post("/withdraw/create");
};

export const getOperationList: (data: any) => Promise<any> = (data) => {
  return instance.post("/withdraw/card_operation_list", data);
};

export const qrInit: () => Promise<any> = () => {
  return instance.post("qr/init");
};
