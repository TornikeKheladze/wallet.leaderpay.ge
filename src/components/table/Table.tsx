import { useNavigate } from "react-router-dom";
import SearchIcon from "../../assets/icons/SearchIcon";
import { TableProps } from "../../types/propTypes";
import LoadingSpinner from "../layout/loadingSpinner/LoadingSpinner";

const Table: React.FC<TableProps> = ({
  fetchedArr,
  searchSubmit,
  staticArr,
  t,
  filterState,
  setFilter,
  loading,
}) => {
  const navigate = useNavigate();
  const filterRow = staticArr.find(({ filter }) => filter) && (
    <tr className="lg:table-row hidden border-b border-buttonGray text-textBlack">
      {staticArr.map(({ filter, name, options }) => {
        if (filter === "date") {
          return (
            <th key={filter + name}>
              <div className="flex md:flex-row flex-col items-center gap-2 justify-center pl-2">
                <input
                  type="date"
                  onChange={(e) =>
                    setFilter((prevState: any) => {
                      return {
                        ...prevState,
                        from_date: e.target.value,
                      };
                    })
                  }
                  className="text-[10px] lg:w-24 w-14 font-normal px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  onChange={(e) =>
                    setFilter((prevState: any) => {
                      return {
                        ...prevState,
                        to_date: e.target.value,
                      };
                    })
                  }
                  placeholder="to"
                  className="text-[10px] lg:w-24 w-14 font-normal px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </th>
          );
        } else if (filter === "range") {
          return (
            <th key={filter + name}>
              <div className="flex md:flex-row flex-col md:items-center gap-2 justify-center">
                <input
                  type="number"
                  placeholder={t("from")}
                  value={filterState.from_amount}
                  onChange={(e) =>
                    setFilter((prevState: any) => {
                      return {
                        ...prevState,
                        from_amount: e.target.value,
                      };
                    })
                  }
                  className="text-[10px] font-normal lg:w-16 w-14 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder={t("to")}
                  value={filterState.to_amount}
                  onChange={(e) =>
                    setFilter((prevState: any) => {
                      return {
                        ...prevState,
                        to_amount: e.target.value,
                      };
                    })
                  }
                  className="text-[10px] font-normal lg:w-16 w-14 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </th>
          );
        } else if (filter === "select") {
          return (
            <th key={filter + name}>
              <select
                onChange={(e) => {
                  // if block only for transactions
                  if (options?.searchKey === "currency_id") {
                    if (e.target.value === "all") {
                      navigate("/home");
                    } else {
                      const currency = options.values.find(
                        (item) => item.id === e.target.value
                      );
                      navigate(
                        `?currency=${currency?.label}&id=${currency?.id}`
                      );
                    }
                  } // if block only for transactions

                  if (e.target.value !== "all") {
                    setFilter((prevState: any) => {
                      return {
                        ...prevState,
                        [options?.searchKey || "searchKey"]: e.target.value,
                      };
                    });
                  } else {
                    setFilter((prevState: any) => {
                      return {
                        ...prevState,
                        [options?.searchKey || "searchKey"]: undefined,
                      };
                    });
                  }
                }}
                className="md:max-w-[200px] max-w-[100px] text-sm font-light border border-gray-500 rounded-md cursor-pointer focus:border-blue-400"
              >
                <option value="all">{t("all")}</option>
                {options?.values.map(({ id, label }) => (
                  <option className="cursor-pointer" key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </th>
          );
        } else if (filter === "submit") {
          return (
            <th key={filter + name} className="py-3 px-6">
              <div className="flex items-center justify-center">
                <button
                  onClick={searchSubmit}
                  className="bg-primaryYellow hover:bg-primaryYellowHover text-white font-bold py-1 px-2 rounded"
                >
                  <SearchIcon className="text-textBlack" />
                </button>
              </div>
            </th>
          );
        } else {
          return <th key={name}></th>;
        }
      })}
    </tr>
  );

  return (
    <div className="overflow-x-scroll">
      {loading && <LoadingSpinner blur />}
      <table className="table w-full mt-3">
        <thead className="">
          <tr>
            {staticArr.map(({ name }, index) => (
              <th
                key={name + index}
                className="text-left py-3 lg:px-6 p-1 border-b font-normal text-sm border-buttonGray uppercase"
              >
                <div className="flex items-center justify-between gap-2 whitespace-nowrap">
                  <span>{t(name)}</span>
                </div>
              </th>
            ))}
          </tr>
          {filterRow}
        </thead>

        <tbody>
          {fetchedArr?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {staticArr.map(({ name, options }, columnIndex) => {
                const rowValue = options
                  ? options.values.find(
                      (item) => +item.id === row[options.searchKey]
                    )?.label
                  : row[name];

                return (
                  <td
                    key={columnIndex}
                    className={` py-4 lg:px-6 px-1 border-b border-buttonGray lg:text-sm sm:text-xs text-[8px]`}
                  >
                    <span>{rowValue || row[name]}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
