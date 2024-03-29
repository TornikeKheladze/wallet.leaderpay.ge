import AddIcon from "../../assets/icons/AddIcon";
import { Toaster } from "react-hot-toast";
import Modal from "../../components/modal/Modal";
import LoadingSpinner from "../../components/layout/loadingSpinner/LoadingSpinner";
import { useWithDraw } from "./useWithdraw";
import ConfirmWithdrawModal from "./components/ConfirmWithdrawModal";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import CardsListItem from "./components/CardsListItem";
import Table from "../../components/table/Table";
import { operationArr } from "../../tableArrays/operationArr";
import ErrorModal from "./components/ErrorModal";
import InfoModal from "./components/InfoModal";
import { TableObj } from "../../types/general";
import { Tooltip } from "@material-tailwind/react";
import ErrIcon from "../../assets/icons/ErrIcon";

const WithDraw = () => {
  const {
    t,
    cardList,
    smsData,
    withdrawError,
    states: {
      confirmModal,
      errorMessage,
      errorModal,
      requestData,
      deleteModal,
      infoModal,
      filter,
      noMore,
    },
    setStates: {
      setConfirmModal,
      setErrorModal,
      setRequestData,
      setDeleteModal,
      setInfoModal,
      setFilter,
    },
    loadings: {
      listLoading,
      smsLoading,
      withdrawLoading,
      addCardLoading,
      operationListLoading,
      deleteLoading,
    },
    functions: {
      submitPayment,
      withdrawHandler,
      calculateCommision,
      filterHandler,
      showMore,
    },
    mutations: { smsMutate, addCardMutate, deleteMutate },
    operationList,
  } = useWithDraw();

  const updatedStaticArr = operationArr.map((tableObj) => {
    if (tableObj.options) {
      const optionValues = tableObj.options.values.map((item) => {
        return { ...item, label: t(item.label) };
      });
      const result: TableObj = {
        ...tableObj,
        options: {
          ...tableObj.options,
          values: optionValues,
        },
      };
      return result;
    } else {
      return tableObj;
    }
  });

  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={false} />
      <ErrorModal
        errorModal={errorModal}
        setErrorModal={setErrorModal}
        errorMessage={errorMessage}
      />
      <InfoModal
        infoModal={infoModal}
        setInfoModal={setInfoModal}
        addCardMutate={addCardMutate}
        addCardLoading={addCardLoading}
      />

      <Modal isOpen={deleteModal} setIsOpen={setDeleteModal}>
        <div className="flex flex-col justify-center items-center gap-5">
          <h4 className="font-bold ">{t("areYouSureToDeleteCard")}!</h4>
          <div className="flex gap-3">
            <button
              onClick={() => deleteMutate(requestData.card_id)}
              className="text-white flex items-center p-1 hover:bg-red-800 transition-colors duration-300 bg-red-500 rounded-md"
            >
              <span>{t("confirm")}</span>
              {deleteLoading ? (
                <LoadingSpinner />
              ) : (
                <DeleteIcon className="w-4" />
              )}
            </button>
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-gray-600 hover:bg-gray-800 transition-colors duration-300 rounded-md p-1 text-white"
            >
              <span>{t("cancel")}</span>
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmWithdrawModal
        smsMutate={smsMutate}
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
        t={t}
        smsData={smsData}
        requestData={requestData}
        calculateCommision={calculateCommision}
        smsLoading={smsLoading}
        setRequestData={setRequestData}
        submitPayment={submitPayment}
        withdrawLoading={withdrawLoading}
        withdrawError={withdrawError}
      />
      <div className="card p-5 lg:mt-8 my-4 relative">
        {listLoading ? <LoadingSpinner blur /> : <></>}
        <div className="flex justify-between items-center mb-1">
          <h1 className="md:text-xl text-base mb-4">
            {t("withdrawMoneyToTheCard")}
          </h1>
          <Tooltip content={t("depositWithdrawLimit")}>
            <button>
              <ErrIcon />
            </button>
          </Tooltip>
        </div>
        <div>
          <button
            onClick={() => setInfoModal(true)}
            className="button_primary flex items-center md:text-base text-sm gap-2 ml-auto"
          >
            {t("addNewCard")} <AddIcon className="w-6 md:w-10" />
          </button>
          {cardList.map((card) => (
            <CardsListItem
              key={card.card_id + card.name}
              card={card}
              requestData={requestData}
              setRequestData={setRequestData}
              calculateCommision={calculateCommision}
              t={t}
              withdrawHandler={withdrawHandler}
              smsLoading={smsLoading}
              setDeleteModal={setDeleteModal}
            />
          ))}
        </div>
      </div>
      <div className="card p-5 mt-4 mb-4 relative">
        <Table
          t={t}
          fetchedArr={operationList}
          staticArr={updatedStaticArr}
          searchSubmit={filterHandler}
          filterState={filter}
          setFilter={setFilter}
          loading={operationListLoading}
        />
        {operationList.length === 0 ? (
          <p className="text-center mt-4 text-customGray">
            {t("recordNotFound")}
          </p>
        ) : (
          <button
            onClick={showMore}
            className={`${
              (operationListLoading || noMore) && "hidden"
            } button_primary m-6`}
          >
            {t("showMore")}...
          </button>
        )}
      </div>
    </div>
  );
};

export default WithDraw;
