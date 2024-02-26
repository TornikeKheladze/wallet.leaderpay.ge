import { useLocation, useNavigate } from "react-router-dom";

import { useTranslate } from "../../../hooks/useTranslate";
import { layoutTranslations } from "../../../lang/common";
import { useMutation } from "react-query";
import { logout } from "../../../services/authorization";

const useSidebar = () => {
  const { t } = useTranslate(layoutTranslations);
  const navigate = useNavigate();

  const { mutate: logoutMutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/");
      localStorage.removeItem("access_token");
    },
  });
  const { pathname } = useLocation();

  return { t, pathname, logoutMutate };
};

export default useSidebar;
