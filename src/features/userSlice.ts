import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  onlineUsers: null,
  user: {}
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

export const getUser = createAsyncThunk(
  "users/getUser",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().application.token;
    try {
      const res = await fetch(`http://localhost:4000/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (photo, thunkAPI) => {
    console.log("photo", photo)
    const formData = new FormData()
    formData.append('avatar', photo)
    const token = thunkAPI.getState().application.token;
    try {
      const res = await fetch(`http://localhost:4000/user/update`, {
        method: "PATCH",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData
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

export const updateUserName = createAsyncThunk(
  "users/updateUser/name",
  async ({data, type}, thunkAPI) => {
    console.log(data, type)
   
    const token = thunkAPI.getState().application.token;
    try {
      const res = await fetch(`http://localhost:4000/user/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: type === 'status' ? JSON.stringify({status: data}) : JSON.stringify({name: data})
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
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(updateUserName.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setUsersOnline } = userSlice.actions;

export default userSlice.reducer;
