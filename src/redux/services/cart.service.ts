import {baseApi} from './base.service';
import {setCart} from '../features/cart/cartSlice';
import {ordersApi} from './orders.service';

export const cartApi = baseApi
  .enhanceEndpoints({addTagTypes: ['Cart', 'Orders']})
  .injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
      getCart: builder.query({
        query: () => {
          return {
            url: '/cart',
            method: 'GET',
          };
        },
        providesTags: ['Cart'],
        onQueryStarted: async (arg, api) => {
          try {
            const cart = await api.queryFulfilled;
            api.dispatch(setCart(cart.data));
            // console.log(cart);
          } catch (error) {
            console.log(error);
          }
        },
      }),

      addToCart: builder.mutation({
        query: (body: {product_id: string; quantity: number}) => {
          return {
            url: '/cart',
            method: 'POST',
            body,
          };
        },
        invalidatesTags: ['Cart'],
      }),

      removeFromCart: builder.mutation({
        query: (id: string) => {
          return {
            url: `/cart/${id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['Cart'],
      }),

      clearCart: builder.mutation({
        query: () => {
          return {
            url: '/cart',
            method: 'DELETE',
          };
        },
        invalidatesTags: ['Cart'],
      }),

      updateCart: builder.mutation({
        query: ({id, ...body}) => {
          return {
            url: `/cart/${id}`,
            method: 'PATCH',
            body,
          };
        },
        invalidatesTags: ['Cart'],
      }),

      checkout: builder.mutation({
        query: body => {
          return {
            url: '/cart/checkout',
            method: 'POST',
            body,
          };
        },
        invalidatesTags: ['Cart', 'Orders'],

        onQueryStarted: async (arg, api) => {
          try {
            const {data} = await api.queryFulfilled;
            console.log(data);
            ordersApi.util.invalidateTags(['Orders']);
            console.log('invalidated');
          } catch (error) {
            console.log(error);
          }
        },
      }),
    }),
  });

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useUpdateCartMutation,
  useCheckoutMutation,
} = cartApi;
