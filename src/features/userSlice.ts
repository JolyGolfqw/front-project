import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  onlineUsers: null,
};

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/find-users`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }
      return json;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsersOnline(state, action) {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const { setUsersOnline } = userSlice.actions;

export default userSlice.reducer;
