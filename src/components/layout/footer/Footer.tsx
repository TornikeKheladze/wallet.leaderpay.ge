import { Link } from "react-router-dom";
import { useTranslate } from "../../../hooks/useTranslate";
import { layoutTranslations } from "../../../lang/common";
import tweeter from "../../../assets/icons/tweeter.png";
import FacebookIcon from "../../../assets/icons/FacebookIcon";

const Footer = () => {
  const { t } = useTranslate(layoutTranslations);
  return (
    <footer className="bg-buttonGray py-3 px-6 w-full hidden lg:flex flex-col gap-3 justify-center">
      <div className="flex gap-3 items-center justify-between">
        <div className="flex gap-3 min-w-[80px]">
          <a target="_blank" href="https://twitter.com/Leaderpay1">
            <img src={tweeter} className="w-8" alt="" />
          </a>
          <a target="_blank" href="https://www.facebook.com/Leaderpaywallet">
            <FacebookIcon />
          </a>
        </div>
        <div className="flex gap-3 items-center justify-end flex-wrap child:text-xs child-hover:text-primaryYellowHover child:transition-all child:duration-300">
          <Link to={"/pages/aboutUs"}>{t("aboutUs")}</Link>
          <Link to={"/news"}>{t("news")}</Link>
          <Link to={"/pages/agreements"}>{t("termsAndConditions")}</Link>
        </div>
      </div>
      <span className="self-end text-sm">© LEADER PAY 2023</span>
    </footer>
  );
};

export default Footer;
