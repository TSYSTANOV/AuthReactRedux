import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dataUsers from "../server/users.json";
export const fetchGuests = createAsyncThunk(
  "guests/fetch",
  async (_, thunkApi) => {
    try {
      return dataUsers;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const fetchPostEvents = createAsyncThunk(
  "events/post",
  async (eventInfo, thunkApi) => {
    try {
      thunkApi.dispatch(setEvents(eventInfo));
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const fetchEvents = createAsyncThunk(
  "events/get",
  async (_, thunkApi) => {
    try {
      const username = thunkApi.getState().authorisation.user;
      const events = localStorage.getItem("events")
        ? JSON.parse(localStorage.getItem("events"))
        : [];
      return events.filter((item) => item.author === username);
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
const EventSlice = createSlice({
  name: "event",
  initialState: {
    events: localStorage.getItem("events")
      ? JSON.parse(localStorage.getItem("events"))
      : [],
    guests: [],
    isLoading: false,
    error: "",
  },
  reducers: {
    setGuests: (state, action) => {
      state.guests.push(action.payload);
    },
    setEvents: (state, action) => {
      state.events.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGuests.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(fetchGuests.fulfilled, (state, action) => {
      state.guests = action.payload;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(fetchGuests.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchPostEvents.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(fetchPostEvents.fulfilled, (state) => {
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(fetchPostEvents.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchEvents.pending, (state, action) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.events = action.payload;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
export const { setEvents, setGuests } = EventSlice.actions;
export default EventSlice.reducer;
