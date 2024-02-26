import React, { useState, useRef, useEffect } from "react";
import SearchIcon from "../../../../assets/icons/SearchIcon";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { Service } from "../../../../types/serviceTypes";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../../../hooks/useTranslate";
import { serviceTranslations } from "../../../../lang/serviceTranslations";
import { useQuery } from "react-query";
import { getAllServices } from "../../../../services/services";

const ServiceSearch = () => {
  const { data: allServicesRes } = useQuery({
    queryKey: "getAllServices",
    queryFn: getAllServices,
  });

  const allServices: Service[] = allServicesRes?.data || [];

  const navigate = useNavigate();
  const { lang } = useSelector((store: RootState) => store.lang);
  const { t } = useTranslate(serviceTranslations);
  const { user } = useSelector((store: RootState) => store.user);

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<Service[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setSuggestions(
      allServices.filter((option) => {
        return (
          option.lang.en.toLowerCase().includes(value.toLowerCase()) ||
          option.lang.ka.toLowerCase().includes(value.toLowerCase()) ||
          option.lang.ru.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  };

  const handleSuggestionClick = (value: Service) => {
    let serviceUrl = `/services/${value.id}`;
    if (value.id === "2") {
      serviceUrl = `/services/2?service_id=2&&&&personal_number=${user.wallet_number}&&&&birthdate=${user.birth_date}&&&&`;
    }
    if (value.id === "90") {
      serviceUrl = `/services/90?service_id=90&&&&account=${user.pin_code}&&&&`;
    }
    navigate(serviceUrl);
    setSuggestions([]);
  };

  return (
    <div ref={wrapperRef} className="relative w-60 2xl:w-80 ml-auto">
      <SearchIcon className="absolute right-1 top-1" />
      <input
        type="text"
        value={search}
        onChange={handleInputChange}
        placeholder={t("searchService")}
        className="px-4 py-2 text-sm border text-textBlack border-gray-600 w-full placeholder:text-gray-600 rounded-md outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      {suggestions.length > 0 && (
        <ul className="absolute max-h-[250px] 2xl:max-h-[350px] overflow-y-scroll top-10 z-10 mt-2 w-full bg-bg4 rounded-md shadow-lg">
          {suggestions.map((option) => (
            <li
              key={option.id}
              className="px-4 py-2 hover:bg-primaryYellowHover text-textBlack transition-colors duration-300 cursor-pointer"
              onClick={() => handleSuggestionClick(option)}
            >
              {option.lang[lang]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceSearch;
