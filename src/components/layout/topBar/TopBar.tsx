import LanguageSwitcher from "../../languageSwitcher/LanguageSwitcher";
import UserDropdown from "../userDropdown/UserDropdown";

const TopBar = () => {
  return (
    <div className="fixed z-30 top-0 right-0 md:px-10 px-4 h-16 flex items-center justify-end">
      <div className="ml-auto flex items-center gap-6">
        <LanguageSwitcher className="text-textPrimary hover:bg-gray-800" />
        <UserDropdown />
      </div>
    </div>
  );
};
export default TopBar;
