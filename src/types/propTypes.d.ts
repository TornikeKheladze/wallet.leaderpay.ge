import { Dispatch, ReactNode, SetStateAction } from "react";
import { FormField, TableObj } from "./general";
import { UseMutateFunction } from "react-query";
import { FullService, InfoData } from "../../../types/serviceTypes";

export type TableProps = {
  fetchedArr: any[] | undefined;
  t: any;
  searchSubmit: any;
  staticArr: TableObj[];
  filterState: TransactionRequest | undefined;
  setFilter: SetStateAction<any>;
  loading: boolean;
};

export type DropdownProps = {
  options: any[];
  onSelect: (option: any) => void;
  placeholder: string;
  label: string;
  active: any;
  className: string;
};

export type ServiceFormProps = {
  fields: FormField[];
  onSubmit: (data: any) => void;
  loading?: boolean;
  buttonLabel?: ReactNode;
  merchantButton: ReactNode;
  setWithMerchant: Dispatch<SetStateAction<FormField[]>>;
  defaultValues?: { [key: string]: string };
  merchantLoading: boolean;
  merchantPaymentButtons: boolean;
};

export type ConfirmPaymentModalProps = {
  reqPayload: { [key: string]: string | number };
  payMutate: UseMutateFunction<any, any, any, unknown>;
  service: FullService;
  infoData: InfoData;
  payLoading: boolean;
  errorMessages: { [key: string]: string };
  smsLoading: boolean;
  smsMutate: UseMutateFunction<any, any>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
