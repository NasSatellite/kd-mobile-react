import {createSlice, current} from '@reduxjs/toolkit';

interface UserState {
  _id: string;
  name: string;
  email: string;
  company_id: string;
  phone: string;
  role: string;
}
interface AuthState {
  token: string | null;
  user: UserState | null;
}

const initialState: AuthState = {
  token: null,
  user: {
    _id: '',
    name: '',
    email: '',
    phone: '',
    company_id: '',
    role: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      const {access_token} = action.payload;
      return {...current(state), token: access_token};
    },

    clearToken: state => {
      return {...current(state), token: null};
    },

    setUser: (state, action) => {
      return {
        ...current(state),
        user: action.payload?.data ?? action.payload,
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clearAuthState: state => {
      return initialState;
    },
  },
});

export const {setToken, clearToken, setUser, clearAuthState} =
  authSlice.actions;

export const selectToken = (state: any) => state.auth.token;

export default authSlice.reducer;
