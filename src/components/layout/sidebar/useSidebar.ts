import { useLocation, useNavigate } from "react-router-dom";

import { useTranslate } from "../../../hooks/useTranslate";
import { layoutTranslations } from "../../../lang/common";
import { useMutation } from "react-query";
import { logout } from "../../../services/authorization";
import { useDispatch } from "react-redux";
import { saveUser } from "../../../store/userSlice";

const useSidebar = () => {
  const { t } = useTranslate(layoutTranslations);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: logoutMutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/");
      localStorage.removeItem("access_token");
      dispatch(saveUser({}));
    },
  });
  const { pathname } = useLocation();

  return { t, pathname, logoutMutate };
};

export default useSidebar;
