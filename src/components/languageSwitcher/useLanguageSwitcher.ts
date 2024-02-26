import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../store/languageSlice";

const useLanguageSwitcher = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useSelector((store: RootState) => store.lang);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleLanguageChange = (languageCode: string) => {
    dispatch(setLanguage(languageCode));
    localStorage.setItem("language", JSON.stringify(languageCode));
    setIsOpen(false);
  };

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

  return {
    dropdownRef,
    isOpen,
    setIsOpen,
    handleLanguageChange,
    lang,
  };
};

export default useLanguageSwitcher;
