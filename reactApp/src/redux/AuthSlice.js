import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dataUsers from "../server/users.json";
export const fetchUsers = createAsyncThunk(
  "fetch/users",
  async (param, thunkApi) => {
    try {
      const currentUser = dataUsers.find(
        (user) =>
          user.username === param.username && user.password === param.password
      );

      if (currentUser) {
        return currentUser;
      } else {
        return thunkApi.rejectWithValue("Uncorrect username or password");
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const localStorAuthUser = (state) => (next) => (action) => {
  const nextAction = next(action);
  if (action.type === "fetch/users/fulfilled") {
    localStorage.setItem("auth", true);
    localStorage.setItem("user", JSON.stringify(action.payload));
  }
  if (action.type === "auth/logout") {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
  }
  if (action.type === "event/setEvents") {
    localStorage.setItem(
      "events",
      JSON.stringify(state.getState().events.events)
    );
  }
  return nextAction;
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    auth: localStorage.getItem("auth") || false,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {},
    isLoading: false,
    error: "",
  },
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.auth = false;
      state.user = {};
      state.isLoading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.user = action.payload;
      state.auth = true;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
export const { logout, setAuth, setLoading, setError, setUser } =
  AuthSlice.actions;
export default AuthSlice.reducer;
