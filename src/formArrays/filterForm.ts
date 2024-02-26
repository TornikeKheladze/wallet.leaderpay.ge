import { currencies } from "../data/currencies";
import { FormField } from "../types/general";

export const transactionFilter: FormField[] = [
  {
    name: "from_date",
    label: "fromDate",
    type: "date",
  },
  {
    name: "to_date",
    label: "toDate",
    type: "date",
  },
  {
    name: "from_amount",
    label: "fromAmount",
    type: "number",
  },
  {
    name: "to_amount",
    label: "toAmount",
    type: "number",
  },
  {
    name: "currency_id",
    label: "currency",
    type: "select",
    options: currencies,
  },
];
