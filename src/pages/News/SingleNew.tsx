import { useQuery } from "react-query";
import { getSingleNew } from "../../services/infos";
import LoadingSpinner from "../../components/layout/loadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link, useParams } from "react-router-dom";
import { useTranslate } from "../../hooks/useTranslate";
import { layoutTranslations } from "../../lang/common";
import DateIcon from "../../assets/icons/DateIcon";
import EyeIcon from "../../assets/icons/EyeIcon";

const SingleNews = () => {
  const { t } = useTranslate(layoutTranslations);
  const { id } = useParams();
  const { lang } = useSelector((store: RootState) => store.lang);

  const { isLoading, data } = useQuery(["getSingleNew", id], () =>
    getSingleNew(id)
  );

  const newsData = data?.data.data || { title: {}, txt: {} };

  return (
    <div className="card p-5 md:mt-10 mt-20">
      <h1 className="lg:text-2xl text-base font-bold text-center mb-6">
        {newsData.title[lang]}
      </h1>

      <div className="flex flex-col items-center gap-5">
        {isLoading && <LoadingSpinner blur />}
        <div className="flex items-center gap-3 lg:text-base text-sm">
          <p className="flex items-center gap-1">
            <span>
              <DateIcon className="w-3 h-3" />
            </span>
            <span>{newsData.date?.split(" ")[0]}</span>
          </p>
          <p className="flex items-center gap-1">
            <span>
              <EyeIcon className="w-3 h-3" />
            </span>
            <span>
              {t("views")} {newsData.views}
            </span>
          </p>
        </div>
        <img src={newsData.image} className="lg:w-1/4 w-full" alt="" />

        <div
          className="child:px-5 lg:text-base text-sm"
          dangerouslySetInnerHTML={{
            __html: newsData.txt[lang],
          }}
        />
        <Link to={"/news"} className="button_primary">
          {t("seeAllNews")}
        </Link>
      </div>
    </div>
  );
};

export default SingleNews;
