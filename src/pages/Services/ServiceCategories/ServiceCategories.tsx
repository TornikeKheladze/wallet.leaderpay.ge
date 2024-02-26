import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { getServiceCategories } from "../../../services/services";
import { ServiceCategory } from "../../../types/serviceTypes";
import LoadingSpinner from "../../../components/layout/loadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";
import ServiceSearch from "./ServiceSearch/ServiceSearch";
import { useAuthService } from "../useAuthService";

const ServiceCategories = () => {
  const { lang } = useSelector((store: RootState) => store.lang);

  const { isLoading: categoriesLoading, data } = useQuery({
    queryKey: "getServiceCategories",
    queryFn: getServiceCategories,
  });

  const categories: ServiceCategory[] = data?.data || [];
  const { cardMargin, servicePath } = useAuthService();

  return (
    <div className={`card relative min-h-[200px] p-4 my-4 ${cardMargin}`}>
      <ServiceSearch />
      <div
        id="service_categories"
        className="grid gap-1 lg:gap-3 md:grid-cols-4 grid-cols-2 mt-4"
      >
        {categoriesLoading && <LoadingSpinner blur />}
        {categories.map((category) => (
          <Link
            to={`${servicePath}/category/${category.id}`}
            key={category.id}
            className="bg-bg7 relative rounded-md flex items-center flex-col justify-center gap-3 lg:h-48 h-24 cursor-pointer hover:bg-primaryYellowHover text-textPrimary hover:text-textBlack hover:bg-opacity-70 transition-colors duration-300"
          >
            <span className="lg:w-6 w-4 lg:text-base text-xs rounded-full text-center bg-primaryYellow text-textBlack absolute right-2 top-2">
              {category.count}
            </span>
            <img className="w-8 lg:w-12 xl:w-16" src={category.image} alt="" />
            <h3 className="text-center lg:text-base text-xs">
              {category.lang[lang]}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServiceCategories;
