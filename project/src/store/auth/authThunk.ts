import { createAsyncThunk } from "@reduxjs/toolkit";
import { User, LoginCredentials, SignupData } from "../../types";
import { authService } from "../../services/authService";
import { createAsyncAction } from "./../utils/createAsyncAction";
import { AuthActionTypes } from "./auth.types";

export const loginUser = createAsyncAction<
  LoginCredentials,
  { user: User; token: string }
>(AuthActionTypes.LOGIN, authService.login);

export const signupUser = createAsyncAction<
  SignupData,
  { user: User; token: string }
>(AuthActionTypes.SIGNUP, authService.signup);

export const getCurrentUser = createAsyncAction<void, User>(
  AuthActionTypes.GET_CURRENT_USER,
  authService.getCurrentUser
);

export const updateProfile = createAsyncAction<Partial<User>, User>(
  AuthActionTypes.UPDATE_PROFILE,
  authService.updateProfile
);

export const uploadProfilePicture = createAsyncAction<File, string>(
  AuthActionTypes.UPLOAD_PROFILE_PICTURE,
  authService.uploadProfilePicture
);

export const logoutUser = createAsyncThunk(
  AuthActionTypes.LOGOUT,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (err: unknwon) {
      console.log(err);
    } finally {
      localStorage.removeItem("token");
    }
  }
);
