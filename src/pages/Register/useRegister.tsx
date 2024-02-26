import { useMutation, useQuery } from "react-query";
import { useTranslate } from "../../hooks/useTranslate";
import { authTranslations } from "../../lang/authTranslations";
import { getRegisterParams, registerStep1 } from "../../services/authorization";
import { FormField } from "../../types/general";
import { RegisterParams } from "../../types/register";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CloseIcon from "../../assets/icons/CloseIcon";
import { registerForm } from "../../formArrays/registerForm";
import { useState } from "react";

export const useRegister = () => {
  const { t } = useTranslate(authTranslations);
  const navigate = useNavigate();
  const [pepInfoModal, setPepInfoModal] = useState(false);

  const { data } = useQuery({
    queryKey: "getRegisterParams",
    queryFn: getRegisterParams,
  });

  const { mutate: stepOneMutate, isLoading: stepOneLoading } = useMutation({
    mutationFn: registerStep1,
    onSuccess(data) {
      navigate("/register/identomat");
      localStorage.setItem("iframe_url", data.data.iframe_url);
      localStorage.setItem("token", data.data.token);
    },
    onError(data: any) {
      toast(
        <div className="flex items-center">
          {data.response.data.message}
          <button onClick={() => toast.remove("errorToast")}>
            <CloseIcon className="w-6 hover:text-gray-600 hover:bg-red-200 rounded-md transition-all duration-300" />
          </button>
        </div>,
        {
          duration: 99999999,
          position: "bottom-right",
          className: "bg-red-500 text-white",
          id: "errorToast",
        }
      );
    },
  });

  const params: RegisterParams | undefined = data?.data.data;

  const fields: () => FormField[] = () => {
    const formFields: FormField[] = [
      ...registerForm,
      {
        name: "limits",
        label: "limits",
        type: "checkbox",
        validation: {
          required: "requiredField",
        },
        link: params?.links.limits,
      },
      {
        name: "privacy_policy",
        label: "privacy_policy",
        type: "checkbox",
        validation: {
          required: "requiredField",
        },
        link: params?.links.privacy_policy,
      },
      {
        name: "contract",
        label: "contract",
        type: "checkbox",
        validation: {
          required: "requiredField",
        },
        link: params?.links.contract,
      },
    ];
    if (params) {
      formFields.push({
        name: "pep_status",
        label: "pep_status",
        type: "radio",
        validation: {
          required: "requiredField",
        },
      });
      formFields.push({
        name: "pep_family_status",
        label: "pep_family_status",
        type: "radio",
        validation: {
          required: "requiredField",
        },
      });
    }
    return formFields;
  };

  return {
    stepOneLoading,
    fields,
    params,
    stepOneMutate,
    t,
    pepInfoModal,
    setPepInfoModal,
  };
};
