import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "../types/login";

interface UserSlice {
  user: UserData;
}

const initialState: UserSlice = {
  user: {
    avatar: "",
    balance: "",
    balance_eur: "",
    balance_rub: "",
    balance_usd: "",
    birth_date: "",
    email: "",
    first_name: "",
    id: 0,
    last_name: "",
    mobile: "",
    wallet_number: "",
    pin_code: "",
    verify_id: 0,
  },
};

export const counterSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    saveUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { saveUser } = counterSlice.actions;

export default counterSlice.reducer;
