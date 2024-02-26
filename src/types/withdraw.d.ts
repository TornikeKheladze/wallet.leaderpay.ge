export type Card = {
  card_id: string;
  expiry: string;
  name: string;
  type: string;
};

export type Withdraw = {
  card_id: string;
  amount: string;
  sms?: string;
  year: number;
  month: number;
};

export type SmsCardResponse = {
  data: {
    data: { card_id: string; card_name: string; commision: string };
  };
};

export type Commisions = {
  max_amount: string;
  min_amount: string;
  min_commision: string;
  percent: string;
};

export type CardOperation = {
  amount: string;
  card_id: number;
  commision: string;
  performed_at: string;
  status_id: number;
  type_id: number;
};

export type CardOperationResponse = {
  data: { errorMessate: string; data: CardOperation[] };
};

export type OperationFilter = {
  status_id?: number;
  type_id?: number;
  from_amount?: string;
  to_amount?: string;
  from_date?: string;
  to_date?: string;
  amount?: number;
  limit: number;
};
