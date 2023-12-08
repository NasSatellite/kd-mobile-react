import {baseApi} from './base.service';
import {setCompany} from '../features/company/companySlice';

const _companyApi = baseApi.enhanceEndpoints({addTagTypes: ['Company']});

export const companyApi = _companyApi.injectEndpoints({
  endpoints: builder => ({
    getCompany: builder.query({
      query: id => `/company/${id}`,
      providesTags: ['Company'],
      onQueryStarted: async (arg, api) => {
        try {
          const companyDetails = await api.queryFulfilled;
          // console.log(companyDetails);
          api.dispatch(setCompany(companyDetails.data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateCompany: builder.mutation({
      query: ({id, ...body}) => ({
        url: `/company/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Company'],
    }),
  }),
});

export const {useGetCompanyQuery} = companyApi;
