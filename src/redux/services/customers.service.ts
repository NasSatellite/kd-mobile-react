import { baseApi } from "./base.service";

export const customersApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ["Customer", "Customers"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCustomers: builder.query<any, any>({
        query: () => "/users/customers",
        providesTags: ["Customers"],
      }),

      getCustomer: builder.query({
        query: (id) => `/customers/${id}`,
      }),

      addCustomer: builder.mutation({
        query: (body) => ({
          url: "/users/customers",
          method: "POST",
          body,
        }),

        invalidatesTags: ["Customers"],
      }),

      updateCustomer: builder.mutation({
        query: ({ id, ...body }) => ({
          url: `/customers/${id}`,
          method: "PATCH",
          body,
        }),
      }),

      deleteCustomer: builder.mutation({
        query: (id) => ({
          url: `/customers/${id}`,
          method: "DELETE",
        }),
      }),
    }),
  });

export const {
  useAddCustomerMutation,
  useGetCustomersQuery,
  useGetCustomerQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customersApi;
