import {baseApi} from './base.service';

export const warehouseApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ['Warehouse', 'Warehouses'],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
      getWarehouses: builder.query({
        query: () => {
          return {
            url: '/warehouses',
            method: 'GET',
          };
        },
        // onQueryStarted: async (arg, api) => {
        //   try {
        //     const warehouses = await api.queryFulfilled;
        //     // console.log(warehouses);
        //   } catch (error) {
        //     console.log(error);
        //   }
        // },
        providesTags: ['Warehouses'],
      }),
    }),
  });

export const {useGetWarehousesQuery} = warehouseApi;
