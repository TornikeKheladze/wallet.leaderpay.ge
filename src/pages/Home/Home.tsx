import { Toaster } from "react-hot-toast";

import TransactionTable from "./TransactionTable";
import useHome from "./useHome";
import FilterIcon from "../../assets/icons/FilterIcon";
import Modal from "../../components/modal/Modal";
import Form from "../../components/form/Form";
import { transactionFilter } from "../../formArrays/filterForm";
import { removeEmpty } from "../../helpers/removeEmpty";
import RemoveFilterIcon from "../../assets/icons/RemoveFilterIcon";

const Home = () => {
  const {
    t,
    transactionsMutate,
    showMore,
    states: {
      transactions,
      openFilterModal,
      filter,
      activeTransaction,
      openTransactionModal,
    },
    setStates: {
      setFilter,
      setOpenFilterModal,
      setActiveTransactions,
      setOpenTransactionModal,
    },
    isLoading,
    currency,
    tableArr,
  } = useHome();

  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Modal isOpen={openFilterModal} setIsOpen={setOpenFilterModal}>
        <button
          onClick={() => {
            transactionsMutate({ limit: 10 });
            setOpenFilterModal(false);
            setFilter({ limit: 10 });
          }}
          className="rounded-md bg-primaryYellow text-textBlack flex gap-1 items-center mb-2 p-1"
        >
          {t("removeFilter")} <RemoveFilterIcon className="w-4" />
        </button>
        <Form
          fields={transactionFilter}
          defaultValues={filter}
          onSubmit={(e) => {
            setFilter((prevState) => {
              return { ...prevState, ...e };
            });
            transactionsMutate({ ...removeEmpty(e), limit: filter.limit });
            setOpenFilterModal(false);
          }}
          buttonLabel={t("filter")}
        />
      </Modal>
      <Modal isOpen={openTransactionModal} setIsOpen={setOpenTransactionModal}>
        <div className="md:text-xl text-lg md:w-[500px] flex flex-col gap-2 text-textPrimary ">
          <div className="flex gap-4 child:flex-1 border-b pb-2 border-gray-600 border-opacity-40">
            <span>{t("service")}</span>
            <span>{activeTransaction.serviceName}</span>
          </div>

          <div className="flex gap-4 child:flex-1 border-b pb-2 border-gray-600 border-opacity-40">
            <span>{t("amount")}</span>
            {activeTransaction.type === 0 ? (
              <span className="text-red-300">-{activeTransaction.amount}</span>
            ) : (
              <span className="text-green-400">
                +{activeTransaction.amount}
              </span>
            )}
          </div>

          <div className="flex gap-4 child:flex-1 border-b pb-2 border-gray-600 border-opacity-40">
            <span>{t("balance")}</span>
            <span>{activeTransaction.balance}</span>
          </div>
          <div className="flex gap-4 child:flex-1 border-b pb-2 border-gray-600 border-opacity-40">
            <span>{t("currency")}</span>
            <span>{activeTransaction.currency}</span>
          </div>
          <div className="flex gap-4 child:flex-1 border-b pb-2 border-gray-600 border-opacity-40">
            <span>{t("date")}</span>
            <span>{activeTransaction.date}</span>
          </div>
          <div className="flex gap-4 child:flex-1 border-b pb-2 border-gray-600 border-opacity-40">
            <span>{t("description")}</span>
            <span>{activeTransaction.description}</span>
          </div>
          <div className="flex gap-4 child:flex-1 border-b pb-2 border-gray-600 border-opacity-40">
            <span>{t("categoryName")}</span>
            <span>{activeTransaction.categoryName}</span>
          </div>
        </div>
      </Modal>

      <div className="card my-4 lg:mt-8 p-2 min-h-[300px] relative">
        <div className="flex justify-between items-center">
          <h2 className="m-5 md:text-2xl text-xl text-textPrimary">
            {t("transactions")} {currency ? currency : ""}
          </h2>
          <button
            className="m-5 md:hidden gap-1 items-center flex button_primary"
            onClick={() => setOpenFilterModal(true)}
          >
            {t("filter")} <FilterIcon className="w-4" />
          </button>
        </div>
        <TransactionTable
          t={t}
          fetchedArr={transactions}
          staticArr={tableArr}
          searchSubmit={() => transactionsMutate(removeEmpty(filter))}
          filterState={filter}
          setFilter={setFilter}
          loading={isLoading}
          setActiveTransactions={setActiveTransactions}
          setOpenTransactionModal={setOpenTransactionModal}
        />
        {transactions.length === 0 ? (
          <p className="text-center mt-4 text-customGray">
            {t("recordNotFound")}
          </p>
        ) : (
          <button
            onClick={showMore}
            className={`${isLoading && "hidden"} button_primary m-6`}
          >
            {t("showMore")}...
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
