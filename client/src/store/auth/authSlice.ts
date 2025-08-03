import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "./authTypes";
import { loginThunk, logoutThunk, signupThunk } from "./authThunk";

const getUserFromStorage = (): User | null => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (err: unknown) {
    return null;
  }
};

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem("isAuthenticated"),
  user: getUserFromStorage(),
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<User>) => {
       const isSuccess = action.payload.success;
       state.loading = false;
       if(isSuccess){
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(action.payload.user));
       }else {
        state.isAuthenticated = false;
       }
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(signupThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupThunk.fulfilled, (state, action: PayloadAction<User>) => {
       const isSuccess = action.payload.success;
       state.loading = false;
       if(isSuccess){
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(action.payload.user));
       }else {
        state.isAuthenticated = false;
       }
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(logoutThunk.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
