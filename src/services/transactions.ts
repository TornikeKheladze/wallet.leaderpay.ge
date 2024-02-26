import { Transaction, TransactionRequest } from "../types/transactions";
import { instance } from "./axios";

export const fetchTransactions = async (
  data: TransactionRequest
): Promise<{ data: Transaction[] }> => {
  return instance.post("/wallet/transactions", data);
};
