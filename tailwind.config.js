/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "bpg-arial": "bpg-arial",
      },
      width: {
        400: "400px",
      },
      colors: {
        primary: "#0d40c6",
        buttonGray: "#474D57",

        bg1: "#181A20",
        bgDefault: "#0B0E11",
        bgCard: "#292B38",
        bg4: "#5E6673",
        bg6: "#20262D",
        bg7: "#191A1F",

        primaryYellow: "#F6D658",
        primaryYellowHover: "#F0B90B",

        textBlack: "#0B0E11",
        textPrimary: "#EAECEF",

        textSecondary: "#B7BDC6",
        textThird: "#848E9C",
        textDisabled: "#5E6673",
        textBrand: "#F0B90B",
        textToast: "#A37200",

        // --color-gradientBrand: linear-gradient(180deg, #F8D12F 0%, #F0B90B 100%);
        // --color-gradientPrimary: linear-gradient(295.27deg, #15141A 0%, #474D57 84.52%);

        // --color-sell: #F6465D;
        // --color-textSell: #F6465D;
        // --color-sellHover: #FF707E;
        // --color-depthSellBg: #35141D;
        // --color-buy: #0ECB81;
        // --color-textBuy: #0ECB81;
        // --color-buyHover: #32D993;
        // --color-depthBuyBg: #102821;
        // --color-line: #2B3139;
        // --color-outlineHover: #6A4403;
        // --color-primary: #FCD535;
        // --color-primaryHover: #F0B90B;
        // --color-error: #F6465D;
        // --color-errorBg: #35141D;
        // --color-success: #0ECB81;
        // --color-successBg: #102821;
        // --color-disable: #474D57;
        iconNormal: "#848E9C",

        lightBlack: "#212529",
        customGray: "#A2A5B9",
        danger: "rgb(220 38 38);",
        // error: "#fbbf24",
        error: "#F6465D",

        // #ffe346;
        leaderGrey: "#212529",
        leaderDark: "#0e0e13",
        // NEW COLORS
        lightGray: "#3A3C49",
        textGray: "#E4E5E6",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
});
