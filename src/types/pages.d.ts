export type Agreement = {
  date: string;
  file: string;
  name: string;
  status: string;
};

export type GetAgreementRes = {
  data: { agreements: Agreement[]; cat_image: string; cat_name: string }[];
};
