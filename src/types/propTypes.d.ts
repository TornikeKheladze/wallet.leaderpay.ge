import { TableObj } from "./general";

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
