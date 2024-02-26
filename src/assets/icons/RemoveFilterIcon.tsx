import React from "react";

interface RemoveFilterIconProps {
  className?: string;
}

const RemoveFilterIcon: React.FC<RemoveFilterIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M21 21L3 3V6.33726C3 6.58185 3 6.70414 3.02763 6.81923C3.05213 6.92127 3.09253 7.01881 3.14736 7.10828C3.2092 7.2092 3.29568 7.29568 3.46863 7.46863L9.53137 13.5314C9.70432 13.7043 9.7908 13.7908 9.85264 13.8917C9.90747 13.9812 9.94787 14.0787 9.97237 14.1808C10 14.2959 10 14.4182 10 14.6627V21L14 17V14M8.60139 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L16.8008 11.1992"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RemoveFilterIcon;
