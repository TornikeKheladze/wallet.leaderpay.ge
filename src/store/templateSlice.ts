import { createSlice } from "@reduxjs/toolkit";
import { Template } from "../types/general";

const initialState: { templates: Template[] } = {
  templates: [],
};

export const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    saveTemplates: (state, { payload }) => {
      state.templates = payload;
    },
  },
});

export const { saveTemplates } = templateSlice.actions;

export default templateSlice.reducer;
