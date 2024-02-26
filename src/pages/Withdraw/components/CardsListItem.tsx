import CloseIcon from "../../../assets/icons/CloseIcon";
import ToCardIcon from "../../../assets/icons/ToCardIcon";
import LoadingSpinner from "../../../components/layout/loadingSpinner/LoadingSpinner";
import visa from "../../../assets/icons/visa.png";
import mastercard from "../../../assets/icons/mastercard.png";
import { isCardExpired } from "../../../helpers/isCardExpired";
import { Card, Withdraw } from "../../../types/withdraw";

type CardListItemProps = {
  card: Card;
  requestData: Withdraw;
  setRequestData: React.Dispatch<React.SetStateAction<Withdraw>>;
  calculateCommision: () => string;
  t: (key: string) => string;
  withdrawHandler: () => void;
  smsLoading: boolean;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CardsListItem: React.FC<CardListItemProps> = ({
  card,
  requestData,
  setRequestData,
  calculateCommision,
  t,
  withdrawHandler,
  smsLoading,
  setDeleteModal,
}) => {
  const cardYear = 2000 + +card.expiry.slice(0, 2);
  const cardMonth = card.expiry.slice(2);
  return (
    <div className="border mt-3 rounded-md border-gray-800 border-opacity-40 p-2 flex lg:flex-row md:justify-between flex-col gap-2">
      <div className="flex gap-2 items-center">
        <span className="">
          {card.type.toLowerCase().includes("visa") && (
            <img className="max-w-[30px]" src={visa} alt="" />
          )}
          {card.type.toLowerCase().includes("mastercard") && (
            <img className="max-w-[30px]" src={mastercard} alt="" />
          )}
        </span>
        <span>{card.name}</span>
        <span
          className={`${
            isCardExpired(cardYear, +cardMonth) ? "bg-red-600" : "bg-green-600"
          } rounded-md min-w-[60px] text-white p-1 text-xs`}
        >
          {cardYear}-{cardMonth}
        </span>
      </div>
      <div className="flex max-h-[30px] text-xs gap-1">
        <input
          type="number"
          placeholder={t("amount")}
          value={card.card_id === requestData.card_id ? requestData.amount : ""}
          onChange={(e) =>
            setRequestData(() => {
              return {
                card_id: card.card_id,
                amount: e.target.value,
                year: 2000 + +card.expiry.slice(0, 2),
                month: +card.expiry.slice(2),
              };
            })
          }
          className="input !p-1 bg-gray-300 placeholder:!text-gray-800"
        />
        <input
          type="text"
          readOnly
          value={
            card.card_id === requestData.card_id
              ? requestData.amount
                ? calculateCommision()
                : ""
              : ""
          }
          placeholder={t("youWillBeCharged")}
          className="input !p-1 bg-gray-300 placeholder:!text-gray-800"
        />
        <button
          onClick={withdrawHandler}
          className="rounded-md p-1 bg-green-500 hover:bg-green-900 transition-all duration-300 text-white flex items-center"
        >
          <span
            className={`md:block hidden ${
              card.card_id === requestData.card_id && smsLoading
                ? "opacity-0"
                : "opacity-100"
            }`}
          >
            {t("withdraw")}
          </span>
          <ToCardIcon
            className={`w-6 ${
              card.card_id === requestData.card_id && smsLoading
                ? "opacity-0"
                : "opacity-100"
            }`}
          />
          {card.card_id === requestData.card_id && smsLoading ? (
            <LoadingSpinner />
          ) : (
            <></>
          )}
        </button>
        <button
          onClick={() => {
            setRequestData((prevState) => {
              return { ...prevState, card_id: card.card_id };
            });
            setDeleteModal(true);
          }}
          className="rounded-md p-1 bg-red-500 hover:bg-red-900 transition-all duration-300 flex text-white items-center"
        >
          <span className="md:block hidden">{t("delete")}</span>
          <CloseIcon className="w-6" />
        </button>
      </div>
    </div>
  );
};
export default CardsListItem;
