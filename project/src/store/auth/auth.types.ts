export const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
};

export const AuthActionTypes = {
  LOGIN: 'auth/login',
  SIGNUP: 'auth/signup',
  GET_CURRENT_USER: 'auth/getCurrentUser',
  UPDATE_PROFILE: 'auth/updateProfile',
  UPLOAD_PROFILE_PICTURE: 'auth/uploadProfilePicture',
  LOGOUT: 'auth/logout',
} as const;

export type AuthActionType = typeof AuthActionTypes[keyof typeof AuthActionTypes];

