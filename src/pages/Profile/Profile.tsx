import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useTranslate } from "../../hooks/useTranslate";
import { profileTranslations } from "../../lang/profileTranslations";
import { homeTranslations } from "../../lang/homeTranslations";
import { Link } from "react-router-dom";
import ResetPasIcon from "../../assets/icons/ResetPasIcon";
import CheckedIcon from "../../assets/icons/CheckedIcon";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { avatarChange, getRegisterParams } from "../../services/authorization";
import { authTranslations } from "../../lang/authTranslations";
import DocumentIcon from "../../assets/icons/DocumentIcon";
import PersonIcon from "../../assets/icons/PersonIcon";
import { useState } from "react";
import Modal from "../../components/modal/Modal";
import EditIcon from "../../assets/icons/EditIcon";
import toast from "react-hot-toast";
import ErrIcon from "../../assets/icons/ErrIcon";
import { Tooltip } from "@material-tailwind/react";

const Profile = () => {
  const { user } = useSelector((store: RootState) => store.user);
  const { t } = useTranslate(
    profileTranslations,
    homeTranslations,
    authTranslations
  );

  const [avatar, setAvatar] = useState();
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: "getRegisterParams",
    queryFn: getRegisterParams,
  });

  const { mutate: avatarMutate } = useMutation({
    mutationFn: avatarChange,
    onSuccess() {
      toast.success(t("avatarChanged"));
      queryClient.invalidateQueries("getUserInfo");
    },
    onError() {
      toast.error(t("somethingWentWrong"));
    },
  });

  const links = data?.data.data.links;

  const userInfo = {
    name: user.first_name,
    lastName: user.last_name,
    walletPersNumber: user.wallet_number,
    birthDate: user.birth_date,
    email: user.email,
    mobile: user.mobile,
  };

  const onAvatarChange = (e: any) => {
    const file = e.target.files?.[0] || {};

    if (file.type !== "image/png") {
      setErrorMessage(t("imageShouldBePngFormat"));
      setErrorModal(true);
      return;
    }

    if (file.size > 10000) {
      setErrorMessage(t("maxSizeShouldBe10KB"));
      setErrorModal(true);
      return;
    }
    setAvatar(file);

    const getBase64 = (file: any, cb: (data: any) => void) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        cb(reader.result);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    };

    getBase64(file, (image) => avatarMutate({ avatar: image }));
  };

  const verified = user.verify_id === 1 ? false : true;

  return (
    <div>
      <Modal isOpen={errorModal} setIsOpen={setErrorModal}>
        <div className="p-3">
          <p className="text-error">{errorMessage}</p>
        </div>
      </Modal>
      <div className="card p-5 mt-4">
        <div className="flex mb-3 justify-between items-center">
          <div className="rounded-full relative w-20 h-20 cursor-pointer border-[1px] border-leaderGrey group flex justify-center items-center">
            {avatar ? (
              <img
                src={avatar ? URL.createObjectURL(avatar) : ""}
                alt="avatar"
                className="rounded-full h-[80px] w-[80px] object-cover"
              />
            ) : user.avatar ? (
              <img
                src={user.avatar + "?<?=time() ?>"}
                alt="avatar"
                className="rounded-full h-[80px] w-[80px] object-cover"
              />
            ) : (
              <PersonIcon />
            )}

            <input
              onChange={onAvatarChange}
              className="hidden"
              type="file"
              id="avatarInput"
              accept="image/*"
            />
            <label
              htmlFor="avatarInput"
              className="absolute cursor-pointer -bottom-2 right-0 flex gap-1 text-xs items-center hover:text-primaryYellowHover transition-all duration-300"
            >
              <EditIcon className="w-4" />
            </label>
          </div>
          <Tooltip content={t("depositWithdrawLimit")}>
            <button>
              <ErrIcon />
            </button>
          </Tooltip>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(userInfo).map(([key, value]) => (
            <div key={key} className="mb-4 px-2">
              <p className="text-sm text-primaryYellow">{t(key)}</p>
              <p className="text-lg font-medium">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="card p-5 my-4">
        <h2 className="mb-3 text-2xl">{t("settings")}</h2>
        <div className="flex gap-3 justify-between">
          <Link
            className="group w-full transition-colors duration-300 text-primaryYellow hover:bg-bgDefault flex items-center justify-between rounded-md px-2 py-4"
            to={"passwordChange"}
          >
            {t("passwordChange")}
            <ResetPasIcon className="text-primaryYellow transition-colors duration-300" />
          </Link>
          <Link
            className={`group w-full transition-colors duration-300 ${
              verified ? "text-primaryYellow" : "text-error"
            } hover:bg-bgDefault flex items-center justify-between rounded-md px-2 py-4`}
            to={"verification"}
          >
            {t("verification")}
            {verified ? (
              <CheckedIcon className="text-green-500 transition-colors duration-300" />
            ) : (
              <ErrIcon />
            )}
          </Link>
        </div>
      </div>
      <div className="card p-5 my-4">
        <h2 className="mb-3 text-2xl">{t("agreements")}</h2>
        {links ? (
          <div className="flex flex-col gap-3">
            {Object.keys(links).map((key) => {
              return (
                <a
                  className=" underline text-blue-600 hover:text-primaryYellowHover transition-colors duration-300 hover:bg-bgDefault rounded-md p-1 flex w-full justify-between"
                  key={key}
                  href={links[key]}
                  target="_blank"
                >
                  {t(key)} <DocumentIcon className="min-w-[30px]" />
                </a>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Profile;
