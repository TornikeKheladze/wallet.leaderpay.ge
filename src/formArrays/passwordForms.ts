import { FormField } from "../types/general";

export const walletNumberForm: FormField[] = [
  {
    name: "wallet_number",
    label: "walletPersNumber",
    type: "number",
    validation: {
      validate: (val: string) => {
        if (val.length !== 11) {
          return "mustBe11Digits";
        }
      },
    },
  },
];

export const smsForm: FormField[] = [
  {
    name: "sms",
    label: "smsCode",
    type: "number",
    validation: {
      required: "requiredField",
    },
  },
];

export const resetPasswordForm: FormField[] = [
  {
    name: "password",
    label: "password",
    type: "password",
    validation: {
      validate: (val: string) => {
        const regex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regex.test(val)) {
          return "passwordRules";
        }
      },
    },
  },
  {
    name: "confirm_password",
    label: "confirmPassword",
    type: "password",
  },
];

export const changePasswordForm: FormField[] = [
  {
    name: "old_password",
    label: "oldPassword",
    type: "password",
    validation: {
      required: "requiredField",
    },
  },
  {
    name: "new_password",
    label: "newPassword",
    type: "password",
    validation: {
      validate: (val: string) => {
        const regex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regex.test(val)) {
          return "passwordRules";
        }
      },
    },
  },
  {
    name: "confirm_password",
    label: "confirmPassword",
    type: "password",
  },
];
