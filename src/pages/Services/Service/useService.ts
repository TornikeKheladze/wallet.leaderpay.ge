import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { useTranslate } from "../../../hooks/useTranslate";
import { serviceTranslations } from "../../../lang/serviceTranslations";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getServiceById,
  getServiceInfo,
  merchantInit,
  pay,
  paySms,
} from "../../../services/services";
import { FullService, InfoData } from "../../../types/serviceTypes";
import { FormField, Template } from "../../../types/general";

import {
  infoFields,
  merchantFields,
  payFields,
} from "../../../formArrays/buildFormFields";
import toast from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";
import { formTranslations } from "../../../lang/formTranslations";
import { addTemplate } from "../../../services/template";
import { useAuthService } from "../useAuthService";

export const useService = () => {
  const { t } = useTranslate(serviceTranslations, formTranslations);
  const { id = "" } = useParams();
  const { lang } = useSelector((store: RootState) => store.lang);
  const { user } = useSelector((store: RootState) => store.user);
  const { templates } = useSelector((store: RootState) => store.template);

  const [isOpen, setIsOpen] = useState(false);
  const [reqPayload, setReqPayload] = useState({});
  const [successModal, setSuccessModal] = useState(false);
  const [withMerchant, setWithMerchant] = useState<FormField[]>([]);
  const [addTemplateData, setAddTemplateData] = useState({});

  const { search } = useLocation();
  const navigate = useNavigate();

  const { cardMargin, backBtnClass, notAuthorized } = useAuthService();

  const { isLoading: pageLoading, data: serviceResponse } = useQuery(
    ["getServiceById", id],
    () => getServiceById(id)
  );
  const queryClient = useQueryClient();

  const service: FullService = useMemo(() => {
    return (
      serviceResponse?.data.service || {
        lang: {},
        params_info: [{}],
        params_pay: [{}],
      }
    );
  }, [serviceResponse?.data.service]);

  const {
    data: infoData,
    mutate: serviceInfoMutate,
    isLoading: infoLoading,
    error: infoErrorData,
  } = useMutation<{ data: InfoData }, any, any>(getServiceInfo);

  const {
    mutate: smsMutate,
    isLoading: smsLoading,
    error: smsErrorData,
  } = useMutation<any, any>({
    mutationFn: paySms,
    onSuccess() {
      toast.success(t("smsCodeSent"));
    },
  });

  const { mutate: addTemplateMutate, isLoading: templateLoading } =
    useMutation<any>({
      mutationFn: addTemplate,
      onSuccess() {
        toast.success(t("templateAdded"));
        queryClient.invalidateQueries({ queryKey: ["getTemplates"] });
      },
      onError() {
        toast.error("Something Went Wrong");
      },
    });

  useEffect(() => {
    if (infoData || infoErrorData) {
      serviceInfoMutate(undefined);
      setWithMerchant([]);
    }
    // eslint-disable-next-line
  }, [id]);

  const defaultInfoParams: { [key: string]: string } = {};
  search
    .slice(1)
    .split("&&&&")
    .slice(0, -1)
    .forEach((param) => {
      defaultInfoParams[param.split("=")[0]] = param.split("=")[1];
    });

  const templateExicts: () => boolean = () => {
    const identificatorKey: string = service?.params_info[0].name || "";
    const inputedTemplateData: { [key: string]: string } = search
      ? defaultInfoParams
      : reqPayload;

    const activeServiceTemplate: Template | undefined = templates.find(
      (temp) => +temp.service_id === +service.id
    );
    if (!activeServiceTemplate) return false;
    if (
      activeServiceTemplate.params[identificatorKey] ===
      inputedTemplateData[identificatorKey]
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (search) {
      serviceInfoMutate({ ...defaultInfoParams });
    }
    // eslint-disable-next-line
  }, [search]);

  const {
    // data: payData,
    mutate: payMutate,
    isLoading: payLoading,
    error: payErrorData,
  } = useMutation<any, any>({
    mutationFn: pay,
    onSuccess() {
      queryClient.invalidateQueries("getUserInfo");
      setIsOpen(false);
      setSuccessModal(true);
    },
  });
  const {
    // data: merchantInitData,
    mutate: merchantInitMutate,
    isLoading: merchantInitLoading,
    // error: merchantInitError,
  } = useMutation({
    mutationFn: merchantInit,
    onSuccess(data) {
      window.location.href = data.data.url;
    },
  });

  const infoErrorMessage: string =
    infoErrorData?.response.data.errorCode === 2006
      ? undefined
      : infoErrorData?.response.data.errorMessage;
  const smsErrorMessage: string = smsErrorData?.response.data.errorMessage;
  const payErrorMessage: string = payErrorData?.response.data.errorMessage;

  const fields = () => {
    const defaultFields = infoFields(service);

    const withAmount: FormField[] = [
      ...payFields(service, infoData?.data),
      {
        name: "amount",
        label: "amount",
        type: "text",
        validation: {
          required: "requiredField",
        },
      },
    ];

    const userDataToShow = infoData?.data.data;
    // თუ დეითა არ მოდის ესეიგი ცარიელი ერეი ბრუნდება და მაგას ვამოწმებ
    // თუ ცარიელი ერეია არაფერი იცვლება, თუ არ არის ცარიელი ერეი რაც
    // ბრუნდება იუზერის დეითა იმას ვამატებ რიდონლი ინპუტებად
    if (userDataToShow && !Array.isArray(userDataToShow)) {
      Object.keys(userDataToShow).forEach((key) => {
        // თუ დეითაშიც კიდე ერეი დეითა გაიჩითა რა, როგორც თბს ბანკშია ჩამოსაშლელი როა
        // მაგ შემთხვევაში არუნდა მაგის გამოჩენა და მაგას ვამოწმებ რო თუ ერეი არაა
        // მაშინ დაამატოს რიდონლი ინპუტი
        if (!Array.isArray(userDataToShow[key])) {
          withAmount.unshift({
            name: key,
            label: key,
            type: "text",
            value: userDataToShow[key],
            readonly: true,
          });
        }
      });
    }
    return infoData ? withAmount : defaultFields;
  };

  const formSubmit = async (e: any) => {
    if (!infoData) {
      serviceInfoMutate({ ...e, service_id: service.id });
      setAddTemplateData({ ...e, service_id: service.id });
      setReqPayload({ ...e, service_id: service.id });
    } else {
      const requiredData = infoData?.data.person.required;
      // იუზერის key ებს ქვედა ტირის გარეშე ვწერ იმიტორო
      // required დატაში მოდის ეგრე და რო დაემთხვეს რა.
      // მაგალითად user_name არის იუზერის დეითადან წამოსული
      // და required ში არის sender_username, რექუაირედს
      // მოვაცლი sender_ ს და დაემთხვევა ერთმანეთს
      const noUnderlineUser: { [key: string]: string | number } = {};
      Object.keys(user).forEach((key) => {
        noUnderlineUser[key.split("_").join("")] = user[key];
      }); // noUnderlineUser ობიექტი რომლის key ებიც ანდერლაინის გარეშეა

      const payload = { ...e, service_id: service.id };
      Object.keys(requiredData).forEach((key) => {
        if (requiredData[key] === 1) {
          // აქ ფეილოუდს ემატება required დატა იუზერიდან
          payload[key] = noUnderlineUser[key.split("_")[1]];
        }
      });

      // FOR TBC BANK ACCOUNT
      // იმიტომ რომ თბს ს ჭირდება account და account_name რომელიც ერთ სტრინგშია
      // გაერთიანებული და აქ ვყოფ სტრინგს და ვაძლევ ცალკცალკე
      if (service.id === "2") {
        Object.keys(payload).forEach((key) => {
          if (key === "account") {
            const [account, account_name] = payload[key].split("&&&&");
            payload.account = account;
            payload.account_name = account_name;
          }
        });
      }

      // e.type მოდის ფორმიდან და არის ან მერჩანტი ან ბალანსი რა.
      // თუ მერჩანტია უნდა გაზარდოს ფორმის ფილდები და დაამატოს მერჩანტის ფილდებიც
      // თუარადა ჩვეულებრივად მოხდება გადახდა ბალანსით
      if (e.type === "merchant") {
        if (withMerchant.find((field) => field.name === "mFirstName")) {
          // setReqPayload(payload);
          merchantInitMutate(payload);
          // setIsOpen(true);
        } else {
          // აქ თუ ავტორიზებული არ არის მაგ შემთხვევაში ემატება მერჩანტის ფილდები
          // თუ ავტორიზებულია არ ჭირდება მერჩანტის ფილდები და პირდაპირ ინიტზე ვუშვებ
          if (notAuthorized) {
            setWithMerchant([...fields(), ...merchantFields]);
          } else {
            merchantInitMutate(payload);
          }
        }
        return;
      }
      if (!e.type) {
        addTemplateMutate({ ...e, id: service.id });
        return;
      }
      if (e.type === "balance" && notAuthorized) {
        navigate("/");
      }
      setIsOpen(true);
      setReqPayload(payload);
      if (infoData.data.sms) smsMutate();
    }
  };

  return {
    service,
    lang,
    serviceResponse,
    fields,
    formSubmit,
    loadings: {
      infoLoading,
      smsLoading,
      payLoading,
      pageLoading,
      templateLoading,
      merchantInitLoading,
    },
    errorMessages: { infoErrorMessage, payErrorMessage, smsErrorMessage },
    t,
    infoData,
    states: {
      isOpen,
      successModal,
      withMerchant,
      reqPayload,
      addTemplateData,
      templates,
    },
    setStates: { setIsOpen, setSuccessModal, setWithMerchant },
    payMutate,
    smsMutate,
    defaultInfoParams,
    templateExicts,
    authHook: { cardMargin, backBtnClass, notAuthorized },
  };
};
