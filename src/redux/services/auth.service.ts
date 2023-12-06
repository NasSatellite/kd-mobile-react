import {clearAuthState, setToken, setUser} from '../features/auth/authSlice';
import {baseApi} from './base.service';

import {store} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dispatch = store.dispatch;

type AuthBody = {
  email: string;
  password: string;
};

type AuthResponse = {
  access_token: string;
  user: any;
  refresh_token: string;
};

const authApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ['AuthApi', 'UserApi'],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
      login: builder.mutation<AuthResponse, AuthBody>({
        query: body => {
          return {
            url: '/auth/login',
            method: 'POST',
            body,
          };
        },
        transformResponse: (response: any) => {
          // console.log(response);
          // console.log(meta);
          // console.log(arg);
          response.access_token = response.data.access_token;
          response.user = response.data.user;
          return response;
        },

        onQueryStarted: async (_arg, api) => {
          try {
            const {data} = await api.queryFulfilled;
            dispatch(setToken(data));
            dispatch(setUser(data?.user));
          } catch (error) {
            console.log(error);
            // throw error;
          }
        },
      }),

      refresh: builder.mutation<any, any>({
        query: () => {
          return {
            url: '/auth/refresh',
            method: 'GET',
          };
        },
        onQueryStarted: async (_, api) => {
          try {
            const {data}: any = await api.queryFulfilled;
            api.dispatch(setToken(data));
            await AsyncStorage.setItem(
              'refreshToken',
              data.refresh_token ?? data.data.refresh_token,
            );
          } catch (error) {
            console.log(error);
            // throw error;
          }
        },
      }),

      logout: builder.mutation<any, any>({
        query: () => {
          return {
            url: '/auth/logout',
            method: 'POST',
          };
        },

        onQueryStarted: async (_, api) => {
          try {
            await api.queryFulfilled;

            dispatch(clearAuthState());
            dispatch(baseApi.util.resetApiState());
          } catch (error) {
            console.log(error);
          }
        },

        invalidatesTags: ['UserApi'],
      }),
    }),
  });

export const {useLoginMutation, useRefreshMutation, useLogoutMutation} =
  authApi;
