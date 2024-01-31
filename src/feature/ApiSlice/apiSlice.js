import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseURL = `${import.meta.env.VITE_BASE_URL}`;

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseURL,
  }),
  tagTypes: ["project"],
  endpoints: (builder) => ({
    getAllProject: builder.query({
      query: () => {
        return {
          url: `/projects/web/task/api/get-req-data/sections?type=slug&value=home&get_section=yes&image=yes&post=yes&file=yes&gallery=yes`,
          method: "GET",
          headers: {
            // "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },

      providesTags: [""],
    }),
  }),
});

export const { useGetAllProjectQuery } = apiSlice;
