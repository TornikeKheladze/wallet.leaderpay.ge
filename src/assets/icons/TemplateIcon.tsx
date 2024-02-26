const TemplateIcon: React.FC<{ className: string }> = ({ className }) => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 3H9V3C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V10.5V17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 17V19C14 20.1046 14.8954 21 16 21V21C17.1046 21 18 20.1046 18 19V9V4.5C18 3.67157 18.6716 3 19.5 3V3C20.3284 3 21 3.67157 21 4.5V4.5C21 5.32843 20.3284 6 19.5 6H18.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 21H5C3.89543 21 3 20.1046 3 19V19C3 17.8954 3.89543 17 5 17H14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 7H14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 11H14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TemplateIcon;
