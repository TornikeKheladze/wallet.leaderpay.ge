const SortArrow: React.FC<{ className?: string; active?: boolean }> = ({
  className,
  active,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={"ionicon w-4 h-4 " + className}
      viewBox="0 0 512 512"
      fill={active ? "black" : "white"}
    >
      <path
        d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="32"
      />
    </svg>
  );
};

export default SortArrow;
