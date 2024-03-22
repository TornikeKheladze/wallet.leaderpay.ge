import { useMutation } from "react-query";
import BankCardIcon from "../../assets/icons/BankCardIcon";
import LoadingSpinner from "../../components/layout/loadingSpinner/LoadingSpinner";
import { useTranslate } from "../../hooks/useTranslate";
import { transferTranslations } from "../../lang/transferTranslations";
import { addBalanceWithCard } from "../../services/services";
import { ChangeEvent, useState } from "react";
import { tableTranslations } from "../../lang/tableTranslations";
import toast from "react-hot-toast";

const AddBalance = () => {
  const { t } = useTranslate(transferTranslations, tableTranslations);
  const [amount, setAmount] = useState("");
  const { isLoading, mutate } = useMutation({
    mutationFn: () => addBalanceWithCard(amount),
    onSuccess: (data) => {
      window.location.href = data.data.url;
    },
    onError: () => {
      toast.error("somethingWentWrong");
    },
  });

  return (
    <>
      <div className="card p-5 my-4 lg:mt-8">
        <h1 className="md:text-2xl text-xl mb-4">{t("addBalance")}</h1>
        <a
          className="mb-3 border flex justify-between gap-2 items-center md:flex-row flex-col rounded-md p-2 border-buttonGray bg-bg4 md:hover:bg-bg1 transition-colors duration-300"
          target="_blank"
          href="https://www.lider-bet.com/"
        >
          <div className="flex gap-2 flex-col">
            <h3 className="font-bold text-lg text-primaryYellow">
              {t("leaderbet")}{" "}
              <span className="bg-primaryYellow text-textBlack rounded-md p-1">
                0%
              </span>
            </h3>
            <p>{t("toTransferMoneyPressButton")}</p>
          </div>
          <button className="button_primary max-h-12 md:w-44 w-full whitespace-nowrap">
            {t("addBalance")}
          </button>
        </a>
      </div>
      <div className="card p-5 flex flex-col gap-3">
        <h1 className="md:text-2xl text-xl">{t("addBalanceWithCard")}</h1>
        <label htmlFor="name">{t("amount")}</label>
        <input
          value={amount}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAmount(e.target.value)
          }
          type="number"
          id="name"
          className="form_input"
        />
        <button
          onClick={() => mutate()}
          disabled={!amount}
          className="disabled:cursor-not-allowed border mb-3 w-full flex justify-between gap-2 items-center rounded-md p-2 border-buttonGray bg-bg4 md:hover:bg-bg1 transition-colors duration-300"
        >
          {t("confirm")}
          {isLoading ? <LoadingSpinner /> : <BankCardIcon />}
        </button>
      </div>
    </>
  );
};

export default AddBalance;
