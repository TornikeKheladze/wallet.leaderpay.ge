import React from "react";
import { useParams } from "react-router-dom";

const PDFpage: React.FC = () => {
  const { name } = useParams();
  return (
    <div>
      <button
        onClick={() => window.close()}
        className={
          "md:w-10 w-8 !left-3 !top-20 fixed  md:left-36 rounded-full bg-primaryYellow hover:bg-primaryYellowHover text-textBlack transition-colors duration-300"
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
      <iframe
        className=" top-0 left-0 h-screen w-screen z-100"
        src={`https://uploads.allpayway.ge/files/pdf/${name}.pdf`}
      ></iframe>
    </div>
  );
};

export default PDFpage;
