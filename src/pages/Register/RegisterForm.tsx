import { useForm, useWatch } from "react-hook-form";
import { useTranslate } from "../../hooks/useTranslate";
import { formTranslations } from "../../lang/formTranslations";
import { FormField } from "../../types/general";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../../components/layout/loadingSpinner/LoadingSpinner";
import { authTranslations } from "../../lang/authTranslations";
import { RegisterParams } from "../../types/register";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import Modal from "../../components/modal/Modal";
import QuestionIcon from "../../assets/icons/QuestionIcon";
import ErrIcon from "../../assets/icons/ErrIcon";
import { Tooltip } from "@material-tailwind/react";
import CheckedIcon from "../../assets/icons/CheckedIcon";

type FormProps = {
  fields: FormField[];
  onSubmit: (data: any) => void;
  loading?: boolean;
  buttonLabel?: string;
  registerParams?: RegisterParams;
};

const RegisterForm: React.FC<FormProps> = ({
  fields,
  onSubmit,
  loading = false,
  buttonLabel,
  registerParams,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    control,
    setValue,
  } = useForm({
    mode: "all",
  });
  const { pathname } = useLocation();

  const password = useWatch({ control, name: "password" });
  const pep_status = useWatch({ control, name: "pep_status" });
  const address_same = useWatch({ control, name: "address_same" });
  const pep_family_status = useWatch({ control, name: "pep_family_status" });
  const [pepInfoModal, setPepInfoModal] = useState(false);
  const [pepFamilyInfoModal, setPepFamilyInfoModal] = useState(false);

  const { t } = useTranslate(formTranslations, authTranslations);

  const allFields = () => {
    let flds = [...fields];
    if (pep_status === "1" && registerParams) {
      if (!flds.find(({ name }) => name === "pep")) {
        flds.forEach((field, i) => {
          if (field.name === "pep_status") {
            flds.splice(i + 1, 0, {
              name: "pep_title",
              label: "pep_title",
              type: "text",
              validation: {
                required: "requiredField",
              },
            });
          }
        });
      }
    } else {
      flds = [...flds.filter((item) => item.name !== "pep")];
    }

    if (address_same === "1" && registerParams) {
      flds = [...flds.filter((item) => item.name !== "real_address")];
    }

    if (pep_family_status === "1" && registerParams) {
      if (!flds.find(({ name }) => name === "pep_family")) {
        flds.push({
          name: "pep_family",
          label: "pep_family",
          type: "text",
          validation: {
            required: "requiredField",
          },
        });
      }
    } else {
      flds = [...flds.filter((item) => item.name !== "pep_family")];
    }

    return flds;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex flex-col">
      <Modal isOpen={pepInfoModal} setIsOpen={setPepInfoModal}>
        <div className="max-h-[90vh] overflow-y-scroll md:max-w-[80vw]">
          {registerParams?.pep_definition}
        </div>
      </Modal>
      <Modal isOpen={pepFamilyInfoModal} setIsOpen={setPepFamilyInfoModal}>
        <div className="max-h-[90vh] overflow-y-scroll md:max-w-[80vw]">
          {registerParams?.pep_family_definition}
        </div>
      </Modal>

      {allFields().map((field, index) => {
        const errorMessage = (errors[field.name] as any)?.message
          .split(" ")
          .map((err: string) => `${t(err)} `);
        return (
          <div key={index} className="mb-4 relative">
            {field.link ? (
              <div className="inline">
                <input
                  id={field.name}
                  type="checkbox"
                  className="mr-2 leading-tight cursor-pointer"
                  {...register(field.name, field.validation)}
                />
                <label
                  htmlFor={field.name}
                  className="cursor-pointer text-textPrimary"
                >
                  {t("agreeTerms")}
                </label>
                <a
                  href={`/src/assets/files/${field.name}.pdf`}
                  download
                  className="text-blue-500 underline hover:text-blue-800 mr-4"
                >
                  {t(field.label)}
                </a>
                {field.validation ? (
                  <span className="mr-1 text-red-500">*</span>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <label className="flex items-center text-textPrimary text-sm font-bold mb-2">
                {t(field.label)}
                {field.validation ? (
                  <span className="mr-1 text-red-500">*</span>
                ) : (
                  <></>
                )}
                {field.name === "pep_status" ? (
                  <span
                    className="cursor-pointer w-8"
                    onClick={() => setPepInfoModal(true)}
                  >
                    <QuestionIcon className="text-white" />
                  </span>
                ) : (
                  <></>
                )}
                {field.name === "pep_family_status" ? (
                  <span
                    className="cursor-pointer w-8"
                    onClick={() => setPepFamilyInfoModal(true)}
                  >
                    <QuestionIcon className="text-white" />
                  </span>
                ) : (
                  <></>
                )}
              </label>
            )}
            {field.type === "select" ? (
              <select
                className={`${
                  errors[field.name] ? "border-error focus:ring-0" : ""
                } form_input`}
                {...register(field.name, field.validation)}
              >
                {field.options &&
                  field.options.map((option, optionIndex) => (
                    <option className="" key={optionIndex} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>
            ) : field.type === "checkbox" ? (
              <></>
            ) : field.type === "radio" ? (
              <div className="flex flex-col gap-3">
                <div className="w-16 flex justify-between">
                  <label
                    className="cursor-pointer"
                    htmlFor={`yes_${field.name}`}
                  >
                    {t("yes")}
                  </label>
                  <input
                    {...register(field.name, field.validation)}
                    type="radio"
                    value="1"
                    id={`yes_${field.name}`}
                  />
                </div>
                <div className="w-16 flex justify-between">
                  <label
                    className="cursor-pointer"
                    htmlFor={`no_${field.name}`}
                  >
                    {t("no")}
                  </label>
                  <input
                    {...register(field.name, field.validation)}
                    type="radio"
                    value="0"
                    id={`no_${field.name}`}
                  />
                </div>
              </div>
            ) : field.name === "confirm_password" ? (
              <input
                type="password"
                className={`${
                  errors[field.name] ? "border-error focus:ring-0" : ""
                } form_input`}
                placeholder={field.placeholder}
                {...register(field.name, {
                  validate: (val: string) => {
                    if (password != val) {
                      return "passwordNotMatch";
                    }
                  },
                })}
              />
            ) : field.name === "mobile" ? (
              <PhoneInput
                country={"ge"}
                inputProps={{
                  className: `${
                    errors[field.name] ? "border-error focus:ring-0" : ""
                  } form_input form_input !pl-12`,
                }}
                {...register(field.name, field.validation)}
                onChange={(e) => setValue("mobile", e)}
              />
            ) : (
              <input
                type={field.type}
                placeholder={t(field.placeholder || "")}
                className={`${
                  errors[field.name] ? "border-error focus:ring-0" : ""
                } form_input`}
                {...register(field.name, field.validation)}
              />
            )}
            {field.name === "password" && (
              <>
                {dirtyFields.password && !errors.password ? (
                  <CheckedIcon className="absolute pt-1 text-green-600 right-1 top-1/2 transform -translate-y-1/2" />
                ) : (
                  <Tooltip content={t("passwordRules")}>
                    <button
                      type="button"
                      className="absolute pt-1 right-1 top-1/2 transform -translate-y-1/2"
                    >
                      <ErrIcon className="text-red-500 w-6" />
                    </button>
                  </Tooltip>
                )}
              </>
            )}

            <p
              className={`${
                pathname === "/profile/password_change" &&
                field.name === "password"
                  ? "lg:mb-0 mb-10"
                  : ""
              } text-error h-5 text-xs mt-1 ${
                errors[field.name] ? "opacity-100" : "opacity-0"
              } `}
            >
              {errorMessage}
            </p>
          </div>
        );
      })}
      <div className="w-full flex md:flex-row flex-col md:gap-4 gap-2">
        <button
          type="submit"
          className="bg-primaryYellow uppercase font-normal cursor-pointer w-full transition-colors duration-300 hover:bg-primaryYellowHover text-textBlack py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
        >
          {loading ? <LoadingSpinner /> : t(buttonLabel || "submit")}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
