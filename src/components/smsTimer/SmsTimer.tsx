import { useEffect, useState } from "react";
import { UseMutateFunction } from "react-query";
import RefreshIcon from "../../assets/icons/RefreshIcon";
import LoadingSpinner from "../layout/loadingSpinner/LoadingSpinner";
import TimerIcon from "../../assets/icons/TimerIcon";
import { useTranslate } from "../../hooks/useTranslate";
import { serviceTranslations } from "../../lang/serviceTranslations";

const SmsTimer: React.FC<{
  smsLoading: boolean;
  smsMutate: UseMutateFunction<any, any>;
}> = ({ smsMutate, smsLoading }) => {
  const [seconds, setSeconds] = useState(60);
  const { t } = useTranslate(serviceTranslations);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const resendHandler = () => {
    smsMutate();
    setTimeout(() => {
      setSeconds(60);
    }, 500);
  };
  return (
    <>
      {seconds === 0 ? (
        <button
          type="button"
          onClick={resendHandler}
          className="min-w-[100px] group button_primary absolute right-0 bottom-0 flex items-center justify-center gap-1 text-sm rounded-md h-11"
        >
          {smsLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <RefreshIcon className="w-5" />
              {t("resendSms")}
            </>
          )}
        </button>
      ) : (
        <span className="absolute right-3 bottom-2 flex gap-2 items-center justify-center text-textBlack">
          {seconds} <TimerIcon />
        </span>
      )}
    </>
  );
};

export default SmsTimer;
