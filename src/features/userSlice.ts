import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipient: null,
  users: [],
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async (recipientId, thunkAPI) => {
    try {
      console.log(recipientId);

      const res = await fetch(
        `http://localhost:4000/find-user/${recipientId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
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

export const getusers = createAsyncThunk(
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
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.recipient = action.payload;
    });
  },
});

// export const { a } = userSlice.actions;

export default userSlice.reducer;
