import { RootState } from "../../store/store";
import { useInfiniteQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import striptags from "striptags";
import he from "he";
import { motion } from "framer-motion";

import { getNewsList } from "../../services/infos";
import LoadingSpinner from "../../components/layout/loadingSpinner/LoadingSpinner";
import { useTranslate } from "../../hooks/useTranslate";
import { layoutTranslations } from "../../lang/common";
import { tableTranslations } from "../../lang/tableTranslations";
import DateIcon from "../../assets/icons/DateIcon";
import EyeIcon from "../../assets/icons/EyeIcon";

const News = () => {
  const { t } = useTranslate(layoutTranslations, tableTranslations);

  const {
    data: newsData = {
      pageParams: [],
      pages: [],
    },
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: "getNewsList",
    queryFn: ({ pageParam = 12 }) =>
      getNewsList({ limit: pageParam }).then((res) => res.data.data),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.length + 12;
      return nextPage;
    },
  });

  const navigate = useNavigate();
  const { lang } = useSelector((store: RootState) => store.lang);

  const data = newsData.pages[newsData.pages.length - 1] || [];

  return (
    <div className="card p-5 md:mt-10 mt-20">
      <h1 className="text-2xl font-bold text-center mb-6">{t("news")}</h1>

      <div className="grid 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {isLoading && <LoadingSpinner blur />}

        {data.length === 0 && !isLoading ? (
          <p className="text-center mt-4 text-customGray">
            {t("recordNotFound")}
          </p>
        ) : (
          data.map((newsData: any) => {
            const partOfText = he.decode(
              striptags(newsData.txt[lang]).slice(0, 60)
            );

            const date = new Date(newsData.date).toDateString().split(" ");

            const numericDate = `${new Date(newsData.date).getDay()}-${new Date(
              newsData.date
            ).getMonth()}-${new Date(newsData.date).getFullYear()}`;

            return (
              <motion.div
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.9 }}
                className="flex relative  items-center justify-between flex-col border-2 rounded-md shadow-inner overflow-hidden h-64 cursor-pointer"
                onClick={() => navigate(`/news/${newsData.id}`)}
                key={newsData.id}
              >
                <img
                  src={newsData.image}
                  alt=""
                  className="object-cover w-full"
                />
                <div className="absolute z-10 top-3 right-3 bg-red-300 rounded-full flex flex-col items-center justify-center p-1 w-10 text-xs">
                  <span>{date[2]}</span>
                  <span>{date[1]}</span>
                </div>
                <div className="absolute bottom-1 z-10 text-xs text-gray-600 flex items-center justify-between w-full gap-2 px-2">
                  <p className="flex items-center gap-1">
                    <span>
                      <DateIcon className="w-3 h-3" />
                    </span>
                    <span>{numericDate}</span>
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
                <div className="w-full h-1/3 absolute left-0 bottom-0 bg-white text-textBlack flex flex-col items-center">
                  <h4 className="text-center">{newsData.title[lang]}</h4>
                  <p className="text-xs text-center">{partOfText}...</p>
                </div>
              </motion.div>
            );
          })
        )}
        <button
          onClick={() => fetchNextPage()}
          className={`${isLoading && "hidden"} button_primary m-6`}
        >
          {isFetchingNextPage ? <LoadingSpinner /> : t("showMore") + "..."}
        </button>
      </div>
    </div>
  );
};

export default News;
