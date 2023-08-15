import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { State } from "./types";

const initialState: State = {
  error: null,
  signingUp: false,
  signingIn: false,
  id: localStorage.getItem("id"),
  login: localStorage.getItem("login"),
  token: localStorage.getItem("token"),
};

export const authSignUp = createAsyncThunk<
  ReturnType<typeof String>,
  {
    name: string;
    subName: string;
    email: string;
    password: string;
  },
  { state: RootState }
>("auth/signup", async ({ name, subName, email, password }, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        subName,
        login: email,
        password,
      }),
    });
    const json = await res.json();
    if (json[0]) {
      return thunkAPI.rejectWithValue(json);
    }

    if (json.error) {
      return thunkAPI.rejectWithValue(json.error);
    }
    return json;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const authSignIn = createAsyncThunk<
  ReturnType<typeof String>,
  { login: string; password: string },
  { state: RootState }
>("auth/signin", async ({ login, password }, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login,
        password,
      }),
    });
    const user = await res.json();
    if (user.error) {
      return thunkAPI.rejectWithValue(user.error);
    }
    localStorage.setItem("id", user.id);
    localStorage.setItem("login", user.login);
    localStorage.setItem("token", user.token);
    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const authSignOut = createAsyncThunk(
  "auth/signout",
  async (_, thunkAPI) => {
    try {
      localStorage.removeItem("id");
      localStorage.removeItem("login");
      localStorage.removeItem("token");
      window.location.reload();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setSignUp(state, action) {
      console.log(action);
      state.signingUp = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authSignUp.pending, (state) => {
        state.signingUp = false;
      })
      .addCase(authSignUp.rejected, (state, action: any) => {
        state.signingUp = false;
        state.error = action.payload;
      })
      .addCase(authSignUp.fulfilled, (state) => {
        state.signingUp = true;
        state.error = null;
      })
      .addCase(authSignIn.pending, (state) => {
        state.signingIn = true;
      })
      .addCase(authSignIn.rejected, (state, action: any) => {
        state.signingIn = false;
        state.error = action.payload;
      })
      .addCase(authSignIn.fulfilled, (state) => {
        state.signingIn = false;
        state.error = null;
        state.id = localStorage.getItem("id");
        state.login = localStorage.getItem("login");
        state.token = localStorage.getItem("token");
      });
  },
});

export const { setSignUp } = applicationSlice.actions;

export default applicationSlice.reducer;
