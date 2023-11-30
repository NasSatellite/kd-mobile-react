import {clearAuthState, setToken} from '../features/auth/authSlice';
import {baseApi} from './base.service';

import {store} from '../store';

const dispatch = store.dispatch;

type AuthBody = {
  email: string;
  password: string;
};

type AuthResponse = {
  access_token: string;
};

const _authApi = baseApi.enhanceEndpoints({
  addTagTypes: ['AuthApi', 'UserApi'],
});
const authApi = _authApi.injectEndpoints({
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
        return response;
      },

      onQueryStarted: async (_arg, api) => {
        try {
          const {data} = await api.queryFulfilled;
          dispatch(setToken(data));
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
