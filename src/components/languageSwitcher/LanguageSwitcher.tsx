import EnglishFlagIcon from "../../assets/icons/EnglishFlagIcon";
import GeorgianFlagIcon from "../../assets/icons/GeorgianFlagIcon";
import RussianFlagIcon from "../../assets/icons/RussianFlagIcon";
import useLanguageSwitcher from "./useLanguageSwitcher";

const languages = [
  { code: "en", label: "Eng", icon: <EnglishFlagIcon /> },
  { code: "ka", label: "Geo", icon: <GeorgianFlagIcon /> },
  { code: "ru", label: "Rus", icon: <RussianFlagIcon /> },
];

const LanguageSwitcher: React.FC = () => {
  const { dropdownRef, isOpen, setIsOpen, handleLanguageChange, lang } =
    useLanguageSwitcher();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="rounded-md flex justify-between items-center gap-1 text-sm text-textBlack bg-primaryYellow hover:bg-primaryYellowHover w-16 p-1 focus:outline-none transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {languages.find((item) => item.code === lang)?.label}
        {languages.find((item) => item.code === lang)?.icon}
      </button>
      {isOpen && (
        <div className="absolute z-50 top-10 right-0 mt-2 bg-white shadow-lg">
          {languages.map((language) => (
            <div
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className="px-4 py-2 cursor-pointer hover:bg-primaryYellowHover flex justify-between items-center gap-1 text-sm"
            >
              <span className="text-textBlack">{language.label}</span>
              {language.icon}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
