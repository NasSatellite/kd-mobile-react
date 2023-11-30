import { baseApi } from "./base.service";
// import { setUser } from "../features/auth/authSlice";

const _weightApi = baseApi.enhanceEndpoints({
  addTagTypes: ["WeightApi", "WeightsApi"],
});
export const weightApi = _weightApi.injectEndpoints({
  endpoints: (builder) => ({
    getWeightTypes: builder.query({
      query: () => {
        return {
          url: "/weighttypes",
          method: "GET",
        };
      },
      providesTags:["WeightsApi"]
    }),

    getWeightType: builder.query({
      query: (id) => {
        return {
          url: `/weighttypes/${id}`,
          method: "GET",
        };
      },
    }),

    addWeight: builder.mutation<any, any>({
      query: (body:any) => {
        return {
          url: `/weighttypes/`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["WeightsApi"],
    }),
  }),
});

export const { useAddWeightMutation, useGetWeightTypeQuery, useGetWeightTypesQuery } = weightApi;
