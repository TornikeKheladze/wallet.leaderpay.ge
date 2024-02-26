import { createSlice } from "@reduxjs/toolkit";

interface LanguageSlice {
  lang: "en" | "ka" | "ru";
}

const language = localStorage.getItem("language");

const initialState: LanguageSlice = {
  lang: (language && JSON.parse(language)) || "ka",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, { payload }) => {
      state.lang = payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
