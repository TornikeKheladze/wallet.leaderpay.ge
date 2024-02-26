import { useNavigate } from "react-router-dom";

const GoBackBtn: React.FC<{ to?: any; className?: string }> = ({
  to = -1,
  className,
}) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className={
        "md:w-10 w-8 fixed top-3 md:left-36 left-9 rounded-full bg-primaryYellow hover:bg-primaryYellowHover text-textBlack transition-colors duration-300 " +
        className
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="ionicon h-full w-full"
        viewBox="0 0 512 512"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
          d="M244 400L100 256l144-144M120 256h292"
        />
      </svg>
    </button>
  );
};

export default GoBackBtn;
