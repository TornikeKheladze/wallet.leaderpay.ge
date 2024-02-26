import { FormField } from "../types/general";
import { FullService, InfoData } from "../types/serviceTypes";

export const infoFields = (service: FullService) => {
  const fields: FormField[] = service.params_info.map((info) => {
    return {
      name: info.name,
      label: info.name,
      type: "text",
      placeholder: info.example,
      validation: {
        validate: (val: string) => {
          const matches = info.regexp.match(/^\/(.*)\/([gimuy]*)$/);
          if (!matches) {
            console.error("Invalid regex format from backend:", info.regexp);
            return "Invalid regex format";
          }
          const [, pattern, flags] = matches;
          const regex = new RegExp(pattern, flags);
          if (!regex.test(val)) {
            return `wrong format , example : ${info.example}`;
          }
        },
      },
    };
  });

  return fields;
};

export const payFields = (service: FullService, infoData?: InfoData) => {
  if (service.id === "2" || service.id === "121") {
    // JUST FOR TBC BANK ACCOUNT & LIBERTY BANK იმიტომ რომ ორივეს ასარჩევი აქვს
    // და აქ ფორმ ფილდებს ოფშენებსაც ვამატებ
    const bankFields: FormField[] = service.params_info.map((info) => {
      return {
        name: info.name,
        label: info.name,
        type: "text",
        placeholder: info.example,
        validation: {
          validate: (val: string) => {
            const matches = info.regexp.match(/^\/(.*)\/([gimuy]*)$/);
            if (!matches) {
              console.error("Invalid regex format from backend:", info.regexp);
              return "Invalid regex format";
            }
            const [, pattern, flags] = matches;
            const regex = new RegExp(pattern, flags);
            if (!regex.test(val)) {
              return `wrong format , example : ${info.example}`;
            }
          },
        },
      };
    });

    const options = infoData?.data?.account?.map((acc) => {
      return {
        label: acc.name,
        // თიბისისთვის-> &&&& იმიტორო 2 ვალიუ მჭირდება და select option ში
        // ობიექტს ვერ ვაძლევ და ასე გავსპლიტავ სტრინგს და ორივე
        // ხელმისაწვდომი მექნება
        // თუ თიბისი არაა პირდაპირ ვალიუ იქნება ექაუნთი და ეგაა
        value:
          service.id === "2" ? `${acc.account}&&&&${acc.name}` : acc.account,
      };
    });

    const withOptions: FormField[] = [
      ...bankFields.map((f) => {
        {
          return { ...f, readonly: true };
        }
      }),
      {
        name: "account",
        label: "account",
        type: "select",
        options: options,
        validation: {
          required: "requiredField",
        },
      },
    ];
    return withOptions;
  }
  const fields: FormField[] = service.params_pay.map((payData) => {
    return {
      name: payData.name,
      label: payData.name,
      type: "text",
      placeholder: payData.example,
      // პირველი ფილდები რიდონლი ხდება, ანუ ინფოს ფილდები რაც ემთხვევა
      // რიდონლი იქნება და დაემატება ახალი ფილდები
      readonly: service.params_info.find((info) => info.name === payData.name)
        ? true
        : false,
      validation: {
        validate: (val: string) => {
          const matches = payData.regexp.match(/^\/(.*)\/([gimuy]*)$/);
          if (!matches) {
            console.error("Invalid regex format from backend:", payData.regexp);
            return "Invalid regex format";
          }
          const [, pattern, flags] = matches;
          const regex = new RegExp(pattern, flags);
          if (!regex.test(val)) {
            return `wrong format , example : ${payData.example}`;
          }
        },
      },
    };
  });

  return fields;
};

export const merchantFields: FormField[] = [
  {
    name: "mFirstName",
    label: "firstName",
    placeholder: "firstName",
    type: "text",
    validation: {
      required: "requiredField",
    },
  },
  {
    name: "mLastName",
    label: "lastName",
    placeholder: "lastName",
    type: "text",
    validation: {
      required: "requiredField",
    },
  },
  {
    name: "mPersonal_no",
    label: "personalNumber",
    placeholder: "01000101231",
    type: "text",
    validation: {
      required: "requiredField",
    },
  },
  {
    name: "mBirthDate",
    label: "birthDate",
    placeholder: "1999-09-19",
    type: "text",
    validation: {
      required: "requiredField",
    },
  },
];
