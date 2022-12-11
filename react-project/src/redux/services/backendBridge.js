import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BackendBridge = createApi({
  reducerPath: 'backendBridge',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost/api',
  }),

  endpoints: (builder) => ({
    getChart: builder.query({
      query: () => '/music/chart',
    }),

    doSearch: builder.query({
      query: (query) => `/music/search?query=${query}`,
    }),

    getAudio: builder.query({
      query: (key) => `/music/audio?key=${key}`,
    }),
  }),
});

export const {
  useGetChartQuery,
  useDoSearchQuery,
  useGetAudioQuery,
} = BackendBridge;
