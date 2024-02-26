import { FullService, InfoData } from "./serviceTypes";

export type Translations = {
  [key: string]: {
    en: string;
    ru: string;
    ka: string;
  };
};

export type FormField = {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "radio"
    | "checkbox"
    | "number"
    | "select"
    | "date";
  validation?: any;
  placeholder?: string;
  options?: { label: string; value: string | number }[];
  readonly?: boolean;
  value?: string | number;
  link?: string;
};

export type TableObj = {
  name: string;
  filter?: "date" | "range" | "submit" | "select";
  options?: { searchKey: string; values: { id: string; label: string }[] };
};

export type Template = {
  id: string;
  service_id: string;
  params: { [key: string]: string };
  service: FullService;
  info: InfoData;
};
