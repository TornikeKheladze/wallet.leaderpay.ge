import React, { ReactNode } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslate } from "../../hooks/useTranslate";
import { formTranslations } from "../../lang/formTranslations";
import { FormField } from "../../types/general";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../layout/loadingSpinner/LoadingSpinner";

type FormProps = {
  fields: FormField[];
  onSubmit: (data: any) => void;
  resetButton?: ReactNode;
  resetAll?: boolean;
  loading?: boolean;
  buttonLabel?: string;
  defaultValues?: { [key: string]: any };
};

const Form: React.FC<FormProps> = ({
  fields,
  onSubmit,
  resetButton,
  resetAll,
  loading = false,
  buttonLabel,
  defaultValues = {},
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    mode: resetAll ? "all" : "onSubmit",
    defaultValues,
  });
  const { pathname } = useLocation();

  const submit = (data: any) => {
    onSubmit(data);
    if (resetAll) {
      reset();
    }
  };

  const password = useWatch({ control, name: "password" });
  const newPassword = useWatch({ control, name: "new_password" });

  const { t } = useTranslate(formTranslations);

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-md mx-auto">
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
                  <option key={optionIndex} value={option.value}>
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
          ) : field.name === "confirm_password" ? (
            <input
              type="password"
              className={`${
                errors[field.name] ? "border-error focus:ring-0" : ""
              } form_input`}
              {...register(field.name, {
                validate: (val: string) => {
                  if (
                    (newPassword && newPassword !== val) ||
                    (password && password !== val)
                  ) {
                    return "passwordNotMatch";
                  }
                },
              })}
            />
          ) : field.readonly && field.value ? (
            <p className="form_input">{field.value}</p>
          ) : (
            <input
              type={field.type}
              placeholder={field.placeholder}
              readOnly={field.readonly || false}
              className={`${
                errors[field.name] ? "border-error focus:ring-0" : ""
              } form_input`}
              {...register(field.name, field.validation)}
            />
          )}

          <p
            className={`${
              pathname === "/profile/password_change" &&
              field.name === "password"
                ? "lg:mb-0 mb-10"
                : ""
            } text-error h-4 text-xs mt-1 ${
              errors[field.name] ? "opacity-100" : "opacity-0"
            } `}
          >
            {(errors[field.name] as any)?.message
              .split(" ")
              .map((err: string) => `${t(err)} `)}
          </p>
        </div>
      ))}
      {resetButton}
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

export default Form;
