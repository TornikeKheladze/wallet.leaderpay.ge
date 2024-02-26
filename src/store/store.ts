import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./languageSlice";
import userSlice from "./userSlice";
import templateSlice from "./templateSlice";

export const store = configureStore({
  reducer: {
    lang: languageSlice,
    user: userSlice,
    template: templateSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
