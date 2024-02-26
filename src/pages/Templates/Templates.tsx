import LoadingSpinner from "../../components/layout/loadingSpinner/LoadingSpinner";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import useTemplates from "./useTemplates";
import Modal from "../../components/modal/Modal";

const Templates = () => {
  const {
    t,
    lang,
    states,
    setStates,
    navigate,
    mutateDelete,
    deleteTemplateLoading,
  } = useTemplates();

  const renderTBody = () => {
    const templateToMap =
      states.templateWithInfos.length > 0
        ? states.templateWithInfos
        : states.templatesWithService;

    return (
      <tbody>
        {templateToMap.map((template) => (
          <tr className="child:px-4 child:py-2 " key={template.id}>
            <td className="flex justify-center">
              <img
                className="w-8 rounded-md bg-gray-200 p-1"
                src={template.service?.image}
                alt=""
              />
            </td>
            <td className="text-center">{template.service?.lang[lang]}</td>
            {/* შემდეგ ხაზზე უნდა დაემატოს დავალიანება 0 ის ნაცვლად */}
            <td className="text-center">
              {!template.info ? <LoadingSpinner /> : 0}
            </td>
            <td className="text-center">
              <span className="flex gap-1">
                {template.params.personal_number ||
                  template.params.phone_number ||
                  template.params.account}
              </span>
            </td>
            <td className="flex items-center gap-1 justify-center">
              <button
                onClick={() => {
                  let serviceUrl = "";
                  Object.keys(template.params).forEach((key) => {
                    serviceUrl += `${key}=${template.params[key]}&&&&`;
                  });
                  navigate(`/services/${template.service_id}?${serviceUrl}`);
                }}
                className="min-w-[60px] text-sm p-1 rounded bg-green-800 text-white hover:bg-green-500 transition-all duration-300"
              >
                {t("pay")}
              </button>
              <button
                onClick={() => {
                  setStates.setIsDeleteModalOpen(true);
                  setStates.setActiveTemplateId(template.id);
                }}
                className="group flex items-center gap-1 text-sm p-1 rounded bg-danger text-white hover:bg-red-400 transition-all duration-300"
              >
                {t("delete")}
                <DeleteIcon className="group-hover:text-gray-200 text-white w-4 h-4 transition-all duration-300" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div>
      <div className="card p-5 my-4 relative overflow-x-scroll min-h-[150px]">
        <Modal
          setIsOpen={setStates.setIsDeleteModalOpen}
          isOpen={states.isDeleteModalOpen}
        >
          <div className="max-w-[300px] md:max-w-2xl">
            <p className="text-lg font-medium">
              {t("areYouSureToDelete")}
              {t("template")}
            </p>
            <button
              onClick={() => mutateDelete(states.activeTemplateId)}
              className=" mt-8 group flex items-center gap-1 text-sm p-1 rounded bg-danger text-white hover:bg-red-400 transition-all duration-300"
            >
              {deleteTemplateLoading ? <LoadingSpinner /> : t("submit")}
            </button>
          </div>
        </Modal>
        {states.isLoading && <LoadingSpinner blur />}
        <h2 className="mb-3 text-2xl">{t("myTemplates")}</h2>
        <table className="table-auto w-full">
          <thead className="border-b border-buttonGray border-opacity-50 text-primaryYellow">
            <tr className="child:px-4 child:py-2">
              <th>{t("logo")}</th>
              <th>{t("name")}</th>
              <th>{t("debt")}</th>
              <th>{t("account")}</th>
              <th>{t("action")}</th>
            </tr>
          </thead>
          {renderTBody()}
        </table>
      </div>
    </div>
  );
};

export default Templates;
