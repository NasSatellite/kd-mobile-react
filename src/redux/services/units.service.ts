import { url } from "inspector";
import { baseApi } from "./base.service";

const unitsApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["Units", "unit"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUnits: builder.query({
        query: () => "/units",
      }),
    }),
  });

export const { useGetUnitsQuery } = unitsApi;
