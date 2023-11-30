import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface UserState {
    user: null | any;
    token: null | string;
    userProfile: null | any;
    loading: null | boolean;
    error: null | boolean;
  }
  
  const initialState: UserState = {
    user: null,
    token: null,
    userProfile: null,
    loading: false,
    error: false,
  };
  
  export const userSlice: any = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setCredentials: (
        state,
        { payload: { user, token } }: PayloadAction<{ user: any; token: string }>
      ) => {
        state.user = user;
        state.token = token;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      },
      setUserProfile: (
        state,
        {
          payload: { userProfile, loading, error },
        }: PayloadAction<{ userProfile: any; loading: boolean; error: boolean }>
      ) => {
  
        state.userProfile = userProfile;
        state.loading = loading;
        state.error = error;
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { setCredentials, setUserProfile } = userSlice.actions;
  
  export default userSlice.reducer;
