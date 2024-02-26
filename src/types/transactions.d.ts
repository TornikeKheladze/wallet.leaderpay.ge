import { Service, ServiceCategory } from "./serviceTypes";

export type TransactionRequest = {
  from_date?: string;
  to_date?: string;
  from_amount?: string;
  to_amount?: string;
  limit?: number;
  currency_id?: string | number;
};

export type Transaction = {
  date: string;
  description: string | null;
  amount: string;
  type: number;
  balance: string;
  service_id: number | null;
  service?: Service;
  serviceCategory?: ServiceCategory;
  serviceName?: string;
  categoryName?: string;
  currency?: string;
};
