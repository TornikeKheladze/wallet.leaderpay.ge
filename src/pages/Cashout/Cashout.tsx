import { useQuery } from "react-query";
import { getCashouts } from "../../services/infos";
import { Cashbox } from "../../types/transfer";
import { Service } from "../../types/serviceTypes";
import { useTranslate } from "../../hooks/useTranslate";
import { transferTranslations } from "../../lang/transferTranslations";
import { Link, useLocation } from "react-router-dom";
import ClockIcon from "../../assets/icons/ClockIcon";
import LocationIcon from "../../assets/icons/LocationIcon";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Cashout = () => {
  const { data: cashOutsRes } = useQuery({
    queryKey: "getCashouts",
    queryFn: getCashouts,
  });
  const { t } = useTranslate(transferTranslations);
  const { lang } = useSelector((store: RootState) => store.lang);
  const { user } = useSelector((store: RootState) => store.user);

  const { search } = useLocation();

  const cashoutData:
    | { cashboxies: Cashbox[]; banks: { services: Service[] } }
    | undefined = cashOutsRes?.data.data;

  const activeClass =
    "text-primaryYellow border-b-2 border-primaryYellow transition-all duration-300";
  const notActiveClass =
    "hover:text-primaryYellowHover border-b-2 border-opacity-0 border-primaryYellowHover hover:border-opacity-100 rounded-md hover:bg-buttonGray transition-all duration-300";

  return (
    <div>
      <div className="card md:p-5 p-2 my-4 lg:mt-8">
        <div className="flex justify-between w-full text-lg gap-8 px-4">
          <Link
            to={""}
            className={`flex-grow pb-2 text-center ${
              search === "?banks" ? notActiveClass : activeClass
            } `}
          >
            {t("cashboxes")}
          </Link>
          <Link
            to={"/transfer/cashout?banks"}
            className={`flex-grow pb-2 text-center + ${
              search === "?banks" ? activeClass : notActiveClass
            }`}
          >
            {t("banks")}
          </Link>
        </div>
        {search === "?banks" ? (
          <ul className="flex gap-1 flex-col mt-3 lg:text-sm text-xs">
            {cashoutData &&
              cashoutData.banks.services.map((service) => {
                let serviceUrl = `/services/${service.id}`;
                if (service.id === "2") {
                  serviceUrl = `/services/2?service_id=2&&&&personal_number=${user.wallet_number}&&&&birthdate=${user.birth_date}&&&&`;
                }
                return (
                  <li
                    className="flex items-center justify-between gap-1 border-y border-buttonGray p-1 max-h-16"
                    key={service.id}
                  >
                    <img
                      className="lg:max-h-16 max-h-8"
                      src={service.image}
                      alt=""
                    />
                    <span className="text-center">{service.lang[lang]}</span>

                    <Link
                      to={serviceUrl}
                      className="button_primary text-center w-20 lg:w-28"
                    >
                      {t("check")}
                    </Link>
                  </li>
                );
              })}
          </ul>
        ) : (
          <div className="grid mt-3 gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:text-sm text-xs">
            {cashoutData &&
              cashoutData.cashboxies.map((cashbox) => {
                return (
                  <div
                    key={cashbox.lat + cashbox.lng + Math.random()}
                    className="bg-primaryYellow rounded-md text-textBlack py-1 px-3 flex flex-col gap-2"
                  >
                    <h3 className="font-semibold text-lg">{cashbox.city}</h3>
                    <div className="flex items-center gap-2">
                      <LocationIcon /> <span>{cashbox.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon />
                      <span>{cashbox.work}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cashout;
