import React from "react";

type RussianFlagIconProps = {
  className?: string;
};

const RussianFlagIcon: React.FC<RussianFlagIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 9 6"
      width="900"
      height="600"
      className={className}
    >
      <rect fill="#fff" width="9" height="3" />
      <rect fill="#d52b1e" y="3" width="9" height="3" />
      <rect fill="#0039a6" y="2" width="9" height="2" />
    </svg>
  );
};

export default RussianFlagIcon;
