import React, { useState, useRef, useEffect } from "react";
import { DropdownProps } from "../../types/propTypes";

const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  onSelect,
  placeholder,
  label,
  active,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: Event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, []);

  return (
    <div className={"relative " + className} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center transition-all duration-300"
      >
        {active[label] ? active[label] : placeholder}
        <svg
          className={`h-4 w-4 ml-2 transform ${
            isOpen ? "rotate-180" : "rotate-0"
          } transition-transform duration-300`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M7 10l5 5 5-5z" fill="currentColor" />
        </svg>
      </button>
      <div
        className={`absolute z-10 w-full mt-2 transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded shadow-md">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className="cursor-pointer px-4 py-2 hover:bg-primaryYellowHover transition-colors duration-400"
            >
              {option[label]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
