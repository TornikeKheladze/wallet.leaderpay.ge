import { TransferPay } from "../types/transfer";
import { instance } from "./axios";

export const transferInfo = (data: {
  wallet_number: string;
}): Promise<{ data: any }> => {
  return instance.post("/transfer/info", data);
};

export const transferSms = (): Promise<{ data: any }> => {
  return instance.post("/transfer/pay-sms");
};

export const transferPay = (data: TransferPay): Promise<{ data: any }> => {
  return instance.post("/transfer/pay", data);
};
