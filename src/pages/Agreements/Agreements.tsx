import { Accordion, CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import { useQuery } from "react-query";
import { getAgreements } from "../../services/infos";
import { useTranslate } from "../../hooks/useTranslate";
import ArrowIcon from "../../assets/icons/ArrowIcon";
import { layoutTranslations } from "../../lang/common";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const customTheme: CustomFlowbiteTheme = {
  accordion: {
    root: {
      base: "divide-y divide-lightGray",
      flush: {
        off: "rounded-lg",
        on: "",
      },
    },
    content: {
      base: "py-3 first:rounded-t-lg last:rounded-b-lg accordion-content",
    },
    title: {
      base: "h-12 hover:text-opacity-90 text-opacity-70 flex w-full text-sm items-center justify-between py-5 text-left font-medium text-textGray first:rounded-t-lg last:rounded-b-lg",
      arrow: {
        base: "h-6 w-6 shrink-0",
        open: {
          off: "",
          on: "rotate-180",
        },
      },
      flush: {
        off: "",
        on: "bg-transparent dark:bg-transparent",
      },
      heading: "",
      open: {
        off: "",
        on: "text-opacity-100",
      },
    },
  },
};

function Agreements() {
  const { lang } = useSelector((state: RootState) => state.lang);
  const { t } = useTranslate(layoutTranslations);
  const { data = [] } = useQuery({
    queryKey: ["getAgreements", lang],
    queryFn: () => getAgreements({ lang }).then((res) => res.data),
  });

  return (
    <div className="card p-5 md:mt-10 mt-20 md:!w-[70%]">
      <h2 className="text-primaryYellow mb-4">{t("termsAndConditions")}</h2>
      <Flowbite theme={{ theme: customTheme }}>
        <Accordion collapseAll={true}>
          {data.map(({ agreements, cat_image, cat_name }) => {
            return (
              <Accordion.Panel key={cat_name}>
                <Accordion.Title>
                  <div className="flex gap-5 items-center">
                    <span className="w-8 h-8 rounded-xl bg-lightGray flex items-center justify-center">
                      <img alt={cat_name} src={cat_image} className="w-4" />
                    </span>
                    <span>{cat_name}</span>
                  </div>
                </Accordion.Title>
                <Accordion.Content>
                  <table className="w-full text-[10px] md:text-xs">
                    <thead className="text-left text-primaryYellow">
                      <tr className="border-b border-lightGray">
                        <th className="w-1/4 md:w-1/6 pb-4 md:pr-0 pr-2">
                          {t("date")}
                        </th>
                        <th className="w-1/4 md:w-1/6 pb-4 pr-2">
                          {t("status")}
                        </th>
                        <th className="pb-4 pr-2 w-1/2">{t("documentName")}</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {agreements.map(({ name, date, file, status_id }) => (
                        <tr
                          className="[&>td]:py-5 [&>td]:align-baseline"
                          key={name + date + file}
                        >
                          <td>{date}</td>
                          <td
                            className={` ${
                              status_id === 1 ? "text-success" : "text-danger"
                            }`}
                          >
                            {status_id === 1 ? t("active") : t("inActive")}
                          </td>
                          <td>{name}</td>
                          <td className="flex items-end justify-end">
                            <a
                              className="flex items-center justify-end text-primaryYellow gap-2"
                              href={file}
                              target="_blank"
                            >
                              <span className="pb-1">{t("show")}</span>
                              <ArrowIcon className="w-3 h-3" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Accordion.Content>
              </Accordion.Panel>
            );
          })}
        </Accordion>
      </Flowbite>
    </div>
  );
}

export default Agreements;
