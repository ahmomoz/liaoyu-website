import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import Cookies from "js-cookie";

const VITE_API_BASE = import.meta.env.VITE_API_BASE; 

export const loginCheck = createAsyncThunk("auth/loginCheck", async (_, thunkAPI) => {
  try {
    const token = Cookies.get("accessToken");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    axios.defaults.headers.common.Authorization = token;
    await axios.post(`${VITE_API_BASE}/api/user/check`);

    return { isAuth: true }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    loading: false,
    error: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuth = false;
      Cookies.remove("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginCheck.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginCheck.fulfilled, (state, action) => {
        state.isAuth = action.payload.isAuth;
        state.loading = false;
      })
      .addCase(loginCheck.rejected, (state, action) => {
        state.isAuth = false;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
