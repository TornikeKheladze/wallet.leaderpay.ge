import React from "react";

interface GeorgianFlagIconProps {
  className?: string;
}

const GeorgianFlagIcon: React.FC<GeorgianFlagIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="900"
      height="600"
      viewBox="0 0 30 20"
      fill="#f00"
      className={className}
    >
      <title>Flag of Georgia</title>
      <path fill="#fff" d="m0 0h30v20H0z" />
      <path d="m13 0h4v20h-4zM0 8h30v4H0z" />
      <g id="c">
        <g id="b">
          <path
            id="a"
            d="m5.7968 1.954a5.4 5.4 0 0 0 1.4064 0 10.4 10.4 0 0 0 0 4.092 5.4 5.4 0 0 0-1.4064 0 10.4 10.4 0 0 0 0-4.092z"
          />
          <use transform="rotate(90,6.5,4)" xlinkHref="#a" />
        </g>
        <use x="17" xlinkHref="#b" />
      </g>
      <use y="12" xlinkHref="#c" />
    </svg>
  );
};

export default GeorgianFlagIcon;
