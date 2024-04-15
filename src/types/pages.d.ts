export type Agreement = {
  date: string;
  file: string;
  name: string;
  status_id: number;
};

export type GetAgreementRes = {
  data: { agreements: Agreement[]; cat_image: string; cat_name: string }[];
};
