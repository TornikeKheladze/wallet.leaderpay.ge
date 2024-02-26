import CheckedIcon from "../../../assets/icons/CheckedIcon";
import SaveIcon from "../../../assets/icons/SaveIcon";
import LoadingSpinner from "../../../components/layout/loadingSpinner/LoadingSpinner";
import { useTranslate } from "../../../hooks/useTranslate";
import { serviceTranslations } from "../../../lang/serviceTranslations";
import { InfoData } from "../../../types/serviceTypes";

const TemplateButton: React.FC<{
  infoData: { data: InfoData } | undefined;
  templateExicts: boolean;
  loading: boolean;
}> = ({ infoData, templateExicts, loading }) => {
  const { t } = useTranslate(serviceTranslations);
  return infoData ? (
    <button
      type={templateExicts ? "button" : "submit"}
      form="service_form"
      className="button_primary min-w-[50px] flex items-center gap-2 !bg-green-600 hover:!bg-green-900 text-xs md:h-10 h-8"
    >
      {loading ? (
        <LoadingSpinner />
      ) : templateExicts ? (
        t("templateAdded")
      ) : (
        t("saveToTemplates")
      )}
      {templateExicts ? (
        <CheckedIcon className="md:h-6 h-4" />
      ) : (
        <SaveIcon className="md:h-6 h-4" />
      )}
    </button>
  ) : (
    <></>
  );
};

export default TemplateButton;
