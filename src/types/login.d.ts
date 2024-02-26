export type LoginPayload = {
  token: string | undefined;
  sms: number | string | undefined;
};

export type CheckLoginPayload = {
  wallet_number: number;
  password: string;
};

export type CheckLoginResponse = {
  data: { phone: string; token: string; date: string; message: string };
};

export type UserData = {
  avatar: string;
  balance: string;
  balance_eur: string;
  balance_rub: string;
  balance_usd: string;
  birth_date: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  mobile: string;
  wallet_number: string;
  [key: string]: string | number;
  pin_code: string;
  verify_id: number;
};

export type LoginDataResponse = {
  data: {
    access_token: string;
    user: UserData;
  };
};
