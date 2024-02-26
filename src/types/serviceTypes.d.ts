export type Service = {
  category_id: string;
  country: string;
  currency_id: string;
  description: string;
  id: string;
  image: string;
  lang: {
    ka: string;
    en: string;
    ru: string;
  };
  max_amount: string;
  min_amount: string;
  name: string;
};

export type ServiceCategory = {
  id: string;
  image: string;
  lang: {
    ka: string;
    en: string;
    ru: string;
  };
  count: number;
};

type Commission = {
  min_to_agent: number;
  percent_to_agent: number;
  fixed_to_agent: number;
  client_commission_fixed: number;
  client_commission_percent: number;
  fixed_from_agent: number;
  max_amount: number;
  max_client_commission: number;
  max_from_agent: number;
  max_to_agent: number;
  min_amount: number;
  min_client_commission: number;
  min_from_agent: number;
  percent_from_agent: number;
  rate: number;
  [key: string]: number;
};

type Params = {
  name: string;
  regexp: string;
  description: string;
  example: string;
};

export interface FullService extends Service {
  commission: Commission;
  params_info: Params[];
  params_pay: Params[];
}

type Account = {
  account: string;
  name: string;
};

export type InfoData = {
  accountant: {
    agentBenefit: number;
    agentCommission: number;
    clientCommission: number;
    genAmount: number;
    rate: number;
  };
  data?: {
    account: Account[];
    clientinfo: string;
    balance: number;
    fullname: string;
    [key: string]: number;
  };
  errorCode: number;
  errorMessage: string;
  person: {
    receiver: {
      firstname: number;
      lastname: number;
      type: number;
    };
    required: {
      receiver_firstname: number;
      receiver_lastname: number;
      receiver_type: number;
      sender_firstname: number;
      sender_lastname: number;
      [key: string]: number;
    };
  };
  sms: number;
};
