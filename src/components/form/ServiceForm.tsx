import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useTranslate } from "../../hooks/useTranslate";
import { formTranslations } from "../../lang/formTranslations";
import { FormField } from "../../types/general";
import LoadingSpinner from "../layout/loadingSpinner/LoadingSpinner";
import { merchantFields } from "../../formArrays/buildFormFields";
import BankCardIcon from "../../assets/icons/BankCardIcon";

type ServiceFormProps = {
  fields: FormField[];
  onSubmit: (data: any) => void;
  loading?: boolean;
  buttonLabel?: ReactNode;
  merchantButton: ReactNode;
  setWithMerchant: Dispatch<SetStateAction<FormField[]>>;
  defaultValues?: { [key: string]: string };
};

const ServiceForm: React.FC<ServiceFormProps> = ({
  fields,
  onSubmit,
  loading = false,
  buttonLabel,
  merchantButton,
  setWithMerchant,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const { t } = useTranslate(formTranslations);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="service_form"
      className="mx-auto"
    >
      {fields.map((field, index) => (
        <div key={index} className="mb-4">
          <label className="block text-textPrimary text-sm font-bold mb-2">
            {t(field.label)}
          </label>
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
          ) : field.type === "radio" ? (
            <input
              type="radio"
              className="mr-2 leading-tight"
              value={field.name}
              {...register(field.name)}
            />
          ) : field.type === "checkbox" ? (
            <input
              type="checkbox"
              className="mr-2 leading-tight"
              {...register(field.name, field.validation)}
            />
          ) : field.type === "number" ? (
            <input
              type="number"
              className={`${
                errors[field.name] ? "border-error focus:ring-0" : ""
              } form_input`}
              {...register(field.name, field.validation)}
            />
          ) : field.readonly && field.value ? (
            <p className="form_input">{field.value}</p>
          ) : (
            <input
              type={field.type}
              placeholder={t(field.placeholder || "")}
              readOnly={field.readonly || false}
              className={`${
                errors[field.name] ? "border-error focus:ring-0" : ""
              } form_input`}
              {...register(field.name, field.validation)}
            />
          )}

          <p
            className={` text-error h-4 text-xs mt-1 ${
              errors[field.name] ? "opacity-100" : "opacity-0"
            } `}
          >
            {(errors[field.name] as any)?.message
              .split(" ")
              .map((err: string) => `${t(err)} `)}
          </p>
        </div>
      ))}
      <div className="w-full flex md:flex-row flex-col md:gap-4 gap-2">
        <button
          type="button"
          onClick={() => {
            // აქ ვამოწმებ რომელიმე ფილდი თუ შეიცავს მერჩანტის ფილდს mFirstName ესეიგი
            // ბალანსით გადახდა არ ხდება და თუ ბალანსით გადახდას დააჭერს
            // მერჩანტის ფილდები ამოვარდება ფილდების ერეიდან.
            if (fields.find((field) => field.name === "mFirstName")) {
              const merchantFieldNames = merchantFields.map(
                (field) => field.name
              );
              const filteredFields = fields.filter(
                (field) => !merchantFieldNames.includes(field.name)
              );
              setWithMerchant(filteredFields);
            } else {
              handleSubmit((formData) =>
                onSubmit({ ...formData, type: "balance" })
              )();
            }
          }}
          className="flex items-center justify-between md:justify-center md:gap-3 bg-primaryYellow hover:bg-primaryYellowHover uppercase font-normal cursor-pointer w-full transition-colors duration-300 text-textBlack py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
        >
          {loading ? <LoadingSpinner /> : buttonLabel}
        </button>
        {merchantButton ? (
          <button
            type="button"
            onClick={() =>
              handleSubmit((formData) =>
                onSubmit({ ...formData, type: "merchant" })
              )()
            }
            className="flex items-center justify-between md:justify-center md:gap-3 bg-primaryYellow hover:bg-primaryYellowHover uppercase font-normal cursor-pointer w-full transition-colors duration-300 text-textBlack py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
          >
            <BankCardIcon />
            {t("payWithCard")}
          </button>
        ) : (
          <></>
        )}
      </div>
    </form>
  );
};

export default ServiceForm;
