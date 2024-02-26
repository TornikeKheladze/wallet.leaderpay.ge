import { useSelector } from "react-redux";
import { useTranslate } from "../../hooks/useTranslate";
import { homeTranslations } from "../../lang/homeTranslations";
import { RootState } from "../../store/store";
import { getService, getServiceInfo } from "../../services/services";
import { useEffect, useState } from "react";
import { Template } from "../../types/general";
import { templateTranslations } from "../../lang/templateTranslations";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { deleteTemplate } from "../../services/template";
import toast from "react-hot-toast";

const useTemplates = () => {
  const navigate = useNavigate();
  const { t } = useTranslate(homeTranslations, templateTranslations);
  const { templates } = useSelector((store: RootState) => store.template);
  const { lang } = useSelector((store: RootState) => store.lang);

  const [templatesWithService, setTemplatesWithService] = useState<Template[]>(
    []
  );
  const [templateWithInfos, setTemplateWithInfos] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeTemplateId, setActiveTemplateId] = useState<string | number>();

  const queryClient = useQueryClient();

  const { mutate: mutateDelete, isLoading: deleteTemplateLoading } =
    useMutation<any, any, any>({
      mutationFn: deleteTemplate,
      onSuccess() {
        toast.success(t("templateDeleted"));
        queryClient.invalidateQueries({ queryKey: ["getTemplates"] });
        setIsDeleteModalOpen(false);
      },
      onError() {
        toast.error("Something Went Wrong");
      },
    });

  useEffect(() => {
    // bind templates to services and update state
    const fetchTemplates = async () => {
      setIsLoading(true);

      const promises = templates.map((template) =>
        getService(template.service_id)
      );
      const results = await Promise.all(promises);

      const temps = templates.map((t) => {
        return {
          ...t,
          service: results.find((s) => +s.data.service.id === +t.service_id)
            ?.data.service,
        };
      });
      setTemplatesWithService(temps);
      setIsLoading(false);
    };
    fetchTemplates();
  }, [templates]);

  useEffect(() => {
    // bind templates with services to info data and update state again
    const fetchInfos = async () => {
      const proms = templatesWithService.map((temp) =>
        getServiceInfo({ ...temp.params })
      );

      const infos = await Promise.all(proms);

      const updatedTemps = templatesWithService.map((templateWithService) => {
        const identificatorKey: string =
          templateWithService.service?.params_info[0].name || "";

        const info = infos.find(
          (info) => JSON.parse(info.config.data)[identificatorKey]
        );

        return {
          ...templateWithService,
          info: info?.data,
          required: info?.data.person.required,
        };
      });
      setTemplateWithInfos(updatedTemps);
    };

    if (templatesWithService.length > 0) {
      fetchInfos();
    }
  }, [templatesWithService]);

  return {
    t,
    lang,
    setStates: {
      setIsPayModalOpen,
      setIsDeleteModalOpen,
      setActiveTemplateId,
    },
    states: {
      templatesWithService,
      templateWithInfos,
      isPayModalOpen,
      isDeleteModalOpen,
      isLoading,
      activeTemplateId,
    },
    deleteTemplateLoading,
    mutateDelete,
    navigate,
  };
};

export default useTemplates;
