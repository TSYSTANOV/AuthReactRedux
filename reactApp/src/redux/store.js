import { configureStore } from "@reduxjs/toolkit";
import AuthSlice, { localStorAuthUser } from "./AuthSlice";
import EventSlice from "./EventSlice";

export const store = configureStore({
  reducer: {
    authorisation: AuthSlice,
    events: EventSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(localStorAuthUser);
  },
});
