import { configureStore } from "@reduxjs/toolkit";
import signUpSlice from "./slices/auth/signUp.tsx";
import loginSlice from "./slices/auth/login.tsx";
import forgotPasswordSlice from "./slices/auth/login.tsx";
import resetPasswordSlice from "./slices/auth/reset-password.tsx";
import allUsersSlice from "./slices/admin/all-users.tsx";
import inviteUserSlice from "./slices/admin/invite-user.tsx";
import updateRestrictionsSlice from "./slices/admin/update-restricted.tsx";
import fetchAllLeadsSlice from "./slices/auth/leads.tsx";
import getEmailSlice from "./slices/auth/getEmail.tsx";
import usersConversationSlice from "./slices/auth/users-conversation.tsx";
import dashboardSlice from "./slices/auth/dashboard-data.tsx";

export const store = configureStore({
  reducer: {
    signUp: signUpSlice,
    login: loginSlice,
    forgotPassword: forgotPasswordSlice,
    resetPassword: resetPasswordSlice,
    allUsers: allUsersSlice,
    fetchAllLeads: fetchAllLeadsSlice,
    inviteUser: inviteUserSlice,
    updateRestrictions: updateRestrictionsSlice,
    getEmail: getEmailSlice,
    usersConversation: usersConversationSlice,
    dashboardData: dashboardSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
