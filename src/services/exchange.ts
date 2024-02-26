import { ratePayload } from "../types/exchange";
import { instance } from "./axios";

export const getCurrencies = async () => {
  return instance.post("/exchange/currencies");
};

export const rateCurrency = async (data: ratePayload) => {
  return instance.post("/exchange/rate", data);
};
