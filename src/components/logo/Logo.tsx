import logoSrc from "../../assets/icons/LPlogo (copy).png";

const Logo = () => {
  return (
    <div className="flex flex-col items-center absolute left-1/2 transform -translate-x-1/2 z-30 md:w-20 md:top-8 top-3 w-16  cursor-pointer">
      <img className="w-14" src={logoSrc} alt="" />
      <p className="text-[12px] min-w-[73px]">
        <span>Leader</span> <span className="text-primaryYellow">pay</span>
      </p>
    </div>
  );
};

export default Logo;
