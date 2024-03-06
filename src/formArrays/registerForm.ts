import { FormField } from "../types/general";

export const registerForm: FormField[] = [
  {
    name: "mobile",
    label: "mobile",
    type: "number",
    validation: {
      validate: (val: string) => {
        if (!val) {
          return "requiredField";
        } else if (val.startsWith("995")) {
          const regex = /^(\+?995)?(79\d{7}|5\d{8})$/;
          if (!regex.test(val)) {
            return "invalidFormat";
          }
        } else {
          if (val.length < 6) {
            return "invalidFormat";
          }
        }
      },
    },
    placeholder: "test",
  },
  {
    name: "email",
    label: "email",
    type: "email",
    validation: {
      validate: (val: string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!regex.test(val)) {
          return "invalidFormat";
        }
      },
    },
    placeholder: "example@gmail.com",
  },
  {
    name: "legal_address",
    label: "legal_address",
    type: "text",
    validation: {
      validate: (val: string) => {
        const regex = /^[^a-zA-Zа-яА-Я]*[^a-zA-Zа-яА-Я\s][^a-zA-Zа-яА-Я]*$/;
        if (!regex.test(val)) {
          return "useOnlyGeorgianLetters";
        }
      },
    },
    placeholder: "cityDistrictStreetBuilding",
  },
  {
    name: "address_same",
    label: "address_same",
    type: "radio",
    validation: {
      required: "requiredField",
    },
  },
  {
    name: "real_address",
    label: "real_address",
    type: "text",
    validation: {
      validate: (val: string) => {
        const regex = /^[^a-zA-Zа-яА-Я]*[^a-zA-Zа-яА-Я\s][^a-zA-Zа-яА-Я]*$/;
        if (!regex.test(val)) {
          return "useOnlyGeorgianLetters";
        }
      },
    },
    placeholder: "cityDistrictStreetBuilding",
  },
  {
    name: "password",
    label: "password",
    type: "password",
    validation: {
      validate: (val: string) => {
        const lower = /(?=.*[a-z])/gm;
        const upper = /(?=.*[A-Z])/gm;
        const digit = /(?=.*\d)/gm;
        const specSymbol = /(?=.*[@$!%*?&])/gm;
        const characterLong = /[A-Za-z\d@$!%*?&]{8,}/gm;
        if (!characterLong.test(val)) {
          return "min8characters";
        }
        if (!lower.test(val)) {
          return "minLowercase";
        }
        if (!upper.test(val)) {
          return "minUppercase";
        }
        if (!digit.test(val)) {
          return "minDigit";
        }
        if (!specSymbol.test(val)) {
          return "minSymbol";
        }
      },
    },
    placeholder: "********",
  },
  {
    name: "confirm_password",
    label: "confirmPassword",
    type: "password",
    validation: {
      required: "requiredField",
    },
    placeholder: "********",
  },
];
