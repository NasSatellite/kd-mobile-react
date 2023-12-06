import {baseApi} from './base.service';

const _categoryApi = baseApi.enhanceEndpoints({
  addTagTypes: ['Category', 'Categories', 'SubCategory', 'Subcategories'],
});

export const categoryApi = _categoryApi.injectEndpoints({
  endpoints: builder => ({
    getCategory: builder.query({
      query: id => `/category/${id}`,
      providesTags: ['Categories'],
      // onQueryStarted: async (arg, api) => {
      //   try {
      //     const categories = await api.queryFulfilled;
      //     console.log(categories);
      //     //   api.dispatch(setCompany(companyDetails.data));
      //   } catch (error) {
      //     console.log(error);
      //   }
      // },
    }),

    getCategoryies: builder.query({
      query: () => {
        return {
          url: '/category',
          method: 'GET',
        };
      },
    }),

    addCategory: builder.mutation({
      query: body => {
        return {
          url: '/category',
          method: 'POST',
          body,
        };
      },
    }),

    getSubCategory: builder.query({
      query: id => `/subcategory/${id}`,
    }),

    addSubCategory: builder.mutation({
      query: body => ({
        url: '/subcategory',
        method: 'POST',
        body,
      }),
    }),

    getSubCategories: builder.query({
      query: () => `/subcategory`,
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useGetCategoryiesQuery,
  useAddCategoryMutation,
  useGetSubCategoryQuery,
  useAddSubCategoryMutation,
  useGetSubCategoriesQuery,
} = categoryApi;
