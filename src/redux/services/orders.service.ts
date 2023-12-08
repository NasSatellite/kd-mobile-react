import {baseApi} from './base.service';

export const ordersApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ['Order', 'Orders', 'CustomerOrders'],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
      getOrders: builder.query<any, any>({
        query: () => '/order',
        providesTags: ['Orders'],
      }),

      getOrder: builder.query({
        query: id => `/order/${id}`,
      }),

      addOrder: builder.mutation({
        query: body => ({
          url: '/order',
          method: 'POST',
          body,
        }),
      }),

      updateOrder: builder.mutation({
        query: ({id, ...body}) => ({
          url: `/order/${id}`,
          method: 'PATCH',
          body,
        }),
      }),

      getCustomerOrders: builder.query({
        query: id => ({
          url: `/order/customer/${id}`,
          method: 'GET',
        }),
        providesTags: ['CustomerOrders'],
      }),
    }),
  });

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
} = ordersApi;
