import { useLocation } from "react-router-dom";

export const useAuthService = (categoryId?: string) => {
  const gamblingId = "30";
  const financeId = "31";
  const { pathname } = useLocation();
  const notAuthorized = pathname.includes("guest");

  const servicePath = notAuthorized ? "/guest/services" : "/services";
  const cardMargin = notAuthorized ? "mt-16" : "lg:mt-8 ";
  const backBtnClass = notAuthorized ? "absolute !left-4" : "";

  let toLogin = false;

  if (
    (notAuthorized && categoryId === gamblingId) ||
    (notAuthorized && categoryId === financeId)
  ) {
    toLogin = true;
  }

  return {
    servicePath,
    cardMargin,
    backBtnClass,
    notAuthorized,
    toLogin,
  };
};
