import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {RootState} from '../store';
import {setToken} from '../features/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://kd-api.vercel.app/api',
  credentials: 'include',
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).auth.token;
    // console.log('all state', getState() as RootState);
    headers.set('authorization', `Bearer ${token}`);
    // if (!headers.has("Content-Type")){
    headers.set('Content-Type', 'application/json');
    // }

    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  // console.log("args",args) // request url, method, body
  // console.log("api",api) // signal, dispatch, getState()
  // console.log("extraopitons",extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  if (result?.error?.status && result?.error?.status === 401) {
    // console.log('sending refresh token')

    // send refresh token to get new access token
    const refreshResult: any = await baseQuery(
      '/auth/refresh',
      api,
      extraOptions,
    );

    // console.log("refreshResult",refreshResult.data)
    if (refreshResult?.data) {
      console.log('got new access token');
      // store the new token
      api.dispatch(setToken(refreshResult.data));

      // save new refresh and access token in local storage
      await AsyncStorage.setItem(
        'refreshToken',
        refreshResult.data.refresh_token,
      );

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      let errorMessage = '';
      if (refreshResult?.error?.status === 401) {
        // console.log('refresh token error', refreshResult)
        errorMessage = 'Your session has expired please login again';
        refreshResult.error.data = errorMessage;
      }
      return refreshResult;
    }
  }

  return result;
};
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: builder => ({}),
});
