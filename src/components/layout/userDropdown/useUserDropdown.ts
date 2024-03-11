import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { logout } from "../../../services/authorization";
import { useMutation } from "react-query";
import { useTranslate } from "../../../hooks/useTranslate";
import { layoutTranslations } from "../../../lang/common";
import { useDispatch } from "react-redux";
import { saveUser } from "../../../store/userSlice";

const useUserDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslate(layoutTranslations);
  const dispatch = useDispatch();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { user } = useSelector((store: RootState) => store.user);

  const { mutate: logoutMutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/");
      localStorage.removeItem("access_token");
      dispatch(saveUser({}));
    },
  });

  return { dropdownRef, isOpen, setIsOpen, user, t, logoutMutate };
};

export default useUserDropdown;
