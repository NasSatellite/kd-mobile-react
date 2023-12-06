import {baseApi} from './base.service';

export const ordersApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ['Order'],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getOrders: builder.query<any, any>({
        query: () => '/order',
        providesTags: ['Order'],
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
    }),
  });

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
} = ordersApi;
