import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userChats: null,
  loading: false,
  error: null,
};

export const getChat = createAsyncThunk(
  "user-chat/getUserChat",
  async (chatId, thunkAPI) => {
    try {
        console.log(chatId);
        
      const res = await fetch(`http://localhost:4000/user-chats/${chatId}`, {
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

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getChat.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getChat.fulfilled, (state, action) => {
      state.userChats = action.payload;
      state.loading = false;
    });
    builder.addCase(getChat.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

// export const { a } = chatSlice.actions;

export default chatSlice.reducer;
