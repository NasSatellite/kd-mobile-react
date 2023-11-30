import { baseApi } from "./base.service";
import { setUser } from "../features/auth/authSlice";
import { companyApi } from "./company.service";
import { setCompany } from "../features/company/companySlice";

export const usersApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [
      "Users",
      "UserApi",
      "CurrentUser",
      "Admins",
      "Customers",
      "Distributors",
    ],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUsers: builder.query({
        query: () => {
          return {
            url: "/users",
            method: "GET",
          };
        },
        providesTags: ["Users"],
      }),

      getUser: builder.query({
        query: (id) => {
          return {
            url: `/users/${id}`,
            method: "GET",
          };
        },
      }),

      getCurrentUser: builder.query<void, void>({
        query: () => {
          return {
            url: `/users/me`,
            method: "GET",
          };
        },
        onQueryStarted: async (arg, api) => {
          try {
            const { data }: any = await api.queryFulfilled;
            api.dispatch(setUser(data));
            api.dispatch(setCompany(data?.data.company_id));
            // console.log('query',companyApi.endpoints.getCompany.useQuery(data.company_id));
          } catch (error) {
            // console.log("user error",error);
            // throw error;
          }
        },
        providesTags: ["CurrentUser"],
      }),

      AddUser: builder.mutation({
        query: (body) => {
          return {
            url: "/users",
            method: "POST",
            body,
          };
        },
        invalidatesTags: ["Users", "Admins"],
      }),

      getAdmins: builder.query({
        query: () => {
          return {
            url: `/users/admins`,
            method: "GET",
          };
        },
        providesTags: ["Admins"],
      }),
    }),
  });

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetCurrentUserQuery,
  useAddUserMutation,
  useGetAdminsQuery,
} = usersApi;
