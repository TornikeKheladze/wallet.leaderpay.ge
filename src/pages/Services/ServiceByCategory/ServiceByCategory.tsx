import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getServicesByCategoryId } from "../../../services/services";
import LoadingSpinner from "../../../components/layout/loadingSpinner/LoadingSpinner";
import { Service, ServiceCategory } from "../../../types/serviceTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import GoBackBtn from "../../../assets/icons/GoBackBtn";
import { useTranslate } from "../../../hooks/useTranslate";
import { serviceTranslations } from "../../../lang/serviceTranslations";
import QuestionIcon from "../../../assets/icons/QuestionIcon";
import ServiceSearch from "../ServiceCategories/ServiceSearch/ServiceSearch";
import { useAuthService } from "../useAuthService";

const ServiceByCategory = () => {
  const { t } = useTranslate(serviceTranslations);
  const { id = "" } = useParams();
  const { lang } = useSelector((store: RootState) => store.lang);
  const { isLoading, data } = useQuery(["getServicesByCategoryId", id], () =>
    getServicesByCategoryId(id)
  );
  const { user } = useSelector((store: RootState) => store.user);

  const services: Service[] = data?.data.services || [];
  const category: ServiceCategory = data?.data.category || { lang: {} };

  const { backBtnClass, cardMargin, servicePath, toLogin } = useAuthService(id);

  return (
    <div className={`card p-4 my-4 relative text-textPrimary ${cardMargin}`}>
      <ServiceSearch />
      <GoBackBtn to={servicePath} className={backBtnClass} />
      <h3 className="m-2 md:text-2xl text-xl">{category.lang[lang]}</h3>
      <div className="relative min-h-[200px] grid gap-1 lg:gap-3 lg:grid-cols-4 grid-cols-2">
        {isLoading ? (
          <LoadingSpinner blur />
        ) : services.length > 0 ? (
          services.map((service) => {
            let serviceUrl = `${servicePath}/${service.id}`;
            if (service.id === "2") {
              serviceUrl = `/services/2?service_id=2&&&&personal_number=${user.wallet_number}&&&&birthdate=${user.birth_date}&&&&`;
            }
            if (service.id === "90") {
              serviceUrl = `/services/90?service_id=90&&&&account=${user.pin_code}&&&&`;
            }
            if (toLogin) {
              serviceUrl = "/";
            }

            return (
              <Link
                to={serviceUrl}
                key={service.id}
                className="bg-bg7 p-2 relative rounded-md flex items-center flex-col justify-around lg:h-56 md:h-48 h-36 cursor-pointer hover:bg-primaryYellowHover text-textPrimary hover:text-textBlack hover:bg-opacity-70 transition-colors duration-300"
              >
                <img
                  className="w-16 lg:w-24 xl:w-36"
                  src={service.image}
                  alt=""
                />
                <h3 className="text-center lg:text-lg md:text-base text-sm 0 w-full py-2">
                  {service.lang[lang]}
                </h3>
              </Link>
            );
          })
        ) : (
          <div className="col-span-2 lg:col-span-4  flex items-center justify-center flex-col gap-3">
            <span>{t("serviceNotFound")}</span> <QuestionIcon />
          </div>
        )}
        {}
      </div>
    </div>
  );
};

export default ServiceByCategory;
