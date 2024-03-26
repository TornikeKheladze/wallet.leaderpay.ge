import { TableObj } from "../types/general";

export const operationArr: TableObj[] = [
  {
    name: "type_id",
    filter: "select",
    options: {
      searchKey: "type_id",
      values: [
        {
          id: "1",
          label: "cardSave",
        },
        {
          id: "2",
          label: "transferToCard",
        },
      ],
    },
  },
  {
    name: "status_id",
    filter: "select",
    options: {
      searchKey: "status_id",
      values: [
        {
          id: "1",
          label: "registered",
        },
        {
          id: "2",
          label: "completed",
        },
        {
          id: "3",
          label: "cancelled",
        },
      ],
    },
  },
  {
    name: "amount",
    filter: "range",
  },
  {
    name: "performed_at",
    filter: "date",
  },
  {
    name: "commision",
    filter: "submit",
  },
];
