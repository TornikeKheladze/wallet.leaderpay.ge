import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useTranslate } from "../../hooks/useTranslate";
import { layoutTranslations } from "../../lang/common";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/layout/loadingSpinner/LoadingSpinner";
import { getContact, sendMessage } from "../../services/infos";
import LocationIcon from "../../assets/icons/LocationIcon";
import PhoneIcon from "../../assets/icons/PhoneIcon";
import MailIcon from "../../assets/icons/MailIcon";
import ClockIcon from "../../assets/icons/ClockIcon";

const Contact = () => {
  const { t } = useTranslate(layoutTranslations);
  const { register, handleSubmit } = useForm();

  const { mutate: messageMutate, isLoading: messageLoading } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      toast.success("თქვენი მეილი წარმატებით გაიგზავნა");
    },
    onError: () => {
      toast.error("მეილის გაგზავნა ვერ მოხერხდა");
    },
  });

  const { data = {} } = useQuery({
    queryFn: () => getContact().then((res) => res.data.data),
    queryKey: ["getContact"],
  });

  const submitHandler = (data: any) => {
    messageMutate(data);
  };

  return (
    <section className="text-primaryYellow flex flex-col items-center mt-12">
      <h2 className="text-3xl font-bold mb-4">{t("contact")}</h2>

      <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 mb-4">
        <div className="card p-5 flex flex-col gap-3 items-center">
          <LocationIcon className="stroke-primaryYellow w-10" />
          <h3 className="text-xl font-bold">{t("address")}</h3>
          <p className="text-textPrimary text-center">{data.address}</p>
        </div>
        <div className="card p-5 flex flex-col gap-3 items-center">
          <PhoneIcon />
          <h3 className="text-xl font-bold">{t("phone")}</h3>
          <p className="text-textPrimary text-center">{data.phone}</p>
        </div>
        <div className="card p-5 flex flex-col gap-3 items-center">
          <MailIcon />
          <h3 className="text-xl font-bold">{t("contactUs")}</h3>
          <p className="text-textPrimary text-center">{data.email}</p>
        </div>
        <div className="card p-5 flex flex-col gap-3 items-center">
          <ClockIcon className="stroke-primaryYellow" />
          <h3 className="text-xl font-bold">{t("openHours")}</h3>
          <div className="flex flex-col items-center">
            <p className="text-textPrimary">ორშაბათი - პარასკევი</p>
            <p className="text-textPrimary">11:00AM - 08:00PM</p>
          </div>
        </div>
      </div>

      <div className="col-span-1 card p-5 mb-16 !max-w-[500px]">
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="flex flex-col gap-4 ">
            <div className="flex md:flex-row flex-col gap-4 w-full">
              <input
                {...register("name")}
                type="text"
                className="form_input !placeholder-gray-700"
                placeholder={t("yourName")}
                required
              />
              <input
                {...register("email")}
                type="email"
                className="form_input !placeholder-gray-700"
                placeholder={t("yourEmail")}
                required
              />
            </div>

            <div className="col-span-1">
              <input
                {...register("title")}
                type="text"
                className="form_input !placeholder-gray-700"
                name="title"
                placeholder={t("subject")}
                required
              />
            </div>

            <div className="col-span-1">
              <textarea
                {...register("text")}
                className="form_input !placeholder-gray-700 !h-20"
                placeholder={t("message")}
                required
              ></textarea>
            </div>

            <div className="col-span-1 text-center">
              <button className="button_primary" type="submit">
                {messageLoading ? <LoadingSpinner /> : t("sendMessage")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
