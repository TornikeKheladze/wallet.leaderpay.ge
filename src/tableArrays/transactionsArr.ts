import { TableObj } from "../types/general";

export const transactionsArr: TableObj[] = [
  {
    name: "date",
    filter: "date",
  },
  {
    name: "serviceName",
  },
  {
    name: "categoryName",
  },
  {
    name: "amount",
    filter: "range",
  },
  {
    name: "currency",
    filter: "select",
    options: {
      searchKey: "currency_id",
      values: [
        {
          id: "981",
          label: "GEL",
        },
        {
          id: "840",
          label: "USD",
        },
        {
          id: "643",
          label: "RUB",
        },
        {
          id: "978",
          label: "EUR",
        },
      ],
    },
  },
  {
    name: "balance",
    filter: "submit",
  },
];
