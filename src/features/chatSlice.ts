import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userChats: null,
  currentChat: {},
  messages: [],
  newMessage: null,
  loading: false,
  error: null,
};

export const getChat = createAsyncThunk(
  "user-chat/getUserChat",
  async (chatId, thunkAPI) => {
    try {
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

export const getMessages = createAsyncThunk(
  "user-messages/getUserMessages",
  async (chatId, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/user-messages/${chatId}`, {
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

export const createChat = createAsyncThunk(
  "create-chat/createChat",
  async ({ firstId, secondId }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/user-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstId,
          secondId,
        }),
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

export const sendMessage = createAsyncThunk(
  "send-message/sendMessage",
  async ({ chatId, senderId, text }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/user-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId,
          senderId,
          text,
        }),
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
  reducers: {
    setCurrentChat(state, action) {
      state.currentChat = action.payload;
    },
    setNewMessage(state, action) {
      state.messages = [...state.messages, action.payload];
    },
  },
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
    builder.addCase(createChat.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createChat.fulfilled, (state, action) => {
      const haveChat = state.userChats.filter((element) =>
        element.members.find((item) => item === action.meta.arg.secondId)
      );
      if (!haveChat[0]) {
        state.userChats = [...state.userChats, action.payload];
      }

      state.loading = false;
    });
    builder.addCase(createChat.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    }),
      builder.addCase(sendMessage.fulfilled, (state, action) => {
        state.messages = [...state.messages, action.payload];
        state.newMessage = action.payload;
      });
  },
});

export const { setCurrentChat, setNewMessage } = chatSlice.actions;

export default chatSlice.reducer;
