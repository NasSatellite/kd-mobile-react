import { baseApi } from "./base.service";

export const locationApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ["Areas", "Area", "Country", "Countries", "Region", "Regions", "Zone", "Zones"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getArea: builder.query({
        query: (id) => `/areas/${id}`,
        providesTags: ["Areas"],
      }),

      getAreas: builder.query({
        query: () => {
          return {
            url: "/areas",
            method: "GET",
          };
        },
      }),

      AddArea: builder.mutation({
        query: (body) => {
          return {
            url: "/areas",
            method: "POST",
            body,
          };
        },
        invalidatesTags: ["Areas"],
      }),

      getCountry: builder.query({
        query: (id) => `/country/${id}`,
      }),

      addCountry: builder.mutation({
        query: (body) => ({
          url: "/country",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Countries"],
      }),

      getCountries: builder.query({
        query: () => `/countries`,
        providesTags: ["Countries"],
      }),

      getRegion: builder.query({
        query: (id) => `/regions/${id}`,
        providesTags: ["Region"],
      }),

      addRegion: builder.mutation({
        query: (body) => ({
          url: "/regions",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Countries"],
      }),

      getRegions: builder.query({
        query: () => `/regions`,
        providesTags: ["Regions"],
      }),

      getZone: builder.query({
        query: (id) => `/zones/${id}`,
        providesTags: ["Zone"],
      }),

      addZone: builder.mutation({
        query: (body) => ({
          url: "/zones",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Zones"],
      }),

      getZones: builder.query({
        query: () => `/zones`,
        providesTags: ["Zones"],
      }),
    }),
  });

export const {
useAddAreaMutation,
useAddCountryMutation,
useAddRegionMutation,
useAddZoneMutation,
useGetAreaQuery,
useGetAreasQuery,
useGetCountryQuery,
useGetCountriesQuery,
useGetRegionQuery,
useGetRegionsQuery,
useGetZoneQuery,
useGetZonesQuery,
} = locationApi;
