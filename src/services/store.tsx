import { configureStore } from "@reduxjs/toolkit";
import signUpSlice from "./slices/auth/signUp.tsx";
import loginSlice from "./slices/auth/login.tsx";
import forgotPasswordSlice from "./slices/auth/login.tsx";
import resetPasswordSlice from "./slices/auth/reset-password.tsx";

export const store = configureStore({
  reducer: {
    signUp: signUpSlice,
    login: loginSlice,
    forgotPassword: forgotPasswordSlice,
    resetPassword: resetPasswordSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
