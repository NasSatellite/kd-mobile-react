import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {baseApi} from './services/base.service';

import userReducer from './features/users/userSlice';
import authReducer from './features/auth/authSlice';
import companyReducer from './features/company/companySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    company: companyReducer,

    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([baseApi.middleware]),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
