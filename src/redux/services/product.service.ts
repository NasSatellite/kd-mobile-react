import { baseApi } from "./base.service";

const _product = baseApi.enhanceEndpoints({
  addTagTypes: ["Products", "PackagingTypes"],
});

export const productApi = _product.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    getProduct: builder.query({
      query: (id) => `/packaging/${id}`,
      providesTags: ["PackagingTypes"],
      onQueryStarted: async (arg, api) => {
        try {
          const products = await api.queryFulfilled;
          console.log(products);
          //   api.dispatch(setCompany(companyDetails.data));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    getProducts: builder.query({
      query: () => {
        return {
          url: "/products?populate=category_id,subcategory_id",
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),

    addPackagingType: builder.mutation({
      query: (body) => {
        return {
          url: "/packaging",
          method: "POST",
          body
        };
      },
      invalidatesTags: ["PackagingTypes"],
    }),

    getPackagingTypes: builder.query({
      query: () => {
        return {
          url: "/packaging",
          method: "GET",
        };
      },
      providesTags: ["PackagingTypes"],
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductsQuery,
  useAddProductMutation,
  useGetPackagingTypesQuery,
} = productApi;
