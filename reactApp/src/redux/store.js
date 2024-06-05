import { configureStore } from "@reduxjs/toolkit";
import AuthSlice, { localStorAuthUser } from "./AuthSlice";

export const store = configureStore({
  reducer: {
    authorisation: AuthSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(localStorAuthUser);
  },
});
