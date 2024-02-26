import { FormField } from "../types/general";

export const loginForm: FormField[] = [
  {
    name: "wallet_number",
    label: "walletPersNumber",
    type: "number",
    validation: {
      required: "requiredField",
    },
  },
  {
    name: "password",
    label: "password",
    type: "password",
    validation: {
      required: "requiredField",
    },
  },
];
