import { baseApi } from "./baseApi";

const liveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLiveStream: builder.query({
      query: () => {
        return {
          url: `/live-stream/get-my-live-room`,
          method: "GET",
        };
      },
      providesTags: ["live"],
    }),

    createLiveStream: builder.mutation({
      query: () => {
        return {
          url: "/live-stream/create-streaming-room",
          method: "POST",
        };
      },
      invalidatesTags: ["live"],
    }),
  }),
});

export const { useCreateLiveStreamMutation, useGetLiveStreamQuery } =
  liveApi;
