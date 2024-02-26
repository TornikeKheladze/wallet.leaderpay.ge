import React from "react";

interface ClockIconProps {
  className?: string;
}

const ClockIcon: React.FC<ClockIconProps> = ({
  className = "stroke-black",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`ionicon ${className} min-w-[30px]`}
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 7V12H15"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ClockIcon;
