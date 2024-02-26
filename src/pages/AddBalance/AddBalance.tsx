import { useTranslate } from "../../hooks/useTranslate";
import { transferTranslations } from "../../lang/transferTranslations";

const AddBalance = () => {
  const { t } = useTranslate(transferTranslations);

  return (
    <div className="card p-5 my-4 lg:mt-8">
      <h1 className="md:text-2xl text-xl mb-4">{t("addBalance")}</h1>
      <a
        className="border flex justify-between gap-2 items-center md:flex-row flex-col rounded-md p-2 border-buttonGray bg-bg4 md:hover:bg-bg1 transition-colors duration-300"
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
  );
};

export default AddBalance;
