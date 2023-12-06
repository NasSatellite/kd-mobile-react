import {baseApi} from './base.service';

export const cartApi = baseApi
  .enhanceEndpoints({addTagTypes: ['Cart']})
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
        // onQueryStarted: async (arg, api) => {
        //   try {
        //     const cart = await api.queryFulfilled;
        //     console.log(cart);
        //   } catch (error) {
        //     console.log(error);
        //   }
        // },
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
    }),
  });

export const {useGetCartQuery, useAddToCartMutation} = cartApi;
