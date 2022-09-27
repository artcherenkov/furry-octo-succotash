import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  TDeleteWidgetRequest,
  TDeleteWidgetResponse,
  TGetWidgetRequest,
  TGetWidgetResponse,
  TGetWidgetsRequest,
  TGetWidgetsResponse,
  TPostUserRequest,
  TPostUserResponse,
  TPostWidgetsRequest,
  TPostWidgetsResponse,
  TPutWidgetRequest,
  TPutWidgetResponse,
} from "../../types";
import { getToken } from "../../utils/local-storage";

const ApiEndpoint = {
  ROOT: "https://fortune.podruge-apps.ru/api",
  LOGIN: "/login",
  WIDGETS: "/widgets",
};

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: ApiEndpoint.ROOT,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.query<TPostUserResponse, TPostUserRequest>({
      query: (body) => ({
        url: ApiEndpoint.LOGIN,
        method: "POST",
        body,
      }),
    }),
    getWidgets: builder.query<TGetWidgetsResponse, TGetWidgetsRequest>({
      query: () => ({
        url: ApiEndpoint.WIDGETS,
      }),
    }),
    postWidgets: builder.query<TPostWidgetsResponse, TPostWidgetsRequest>({
      query: (body) => ({
        url: ApiEndpoint.WIDGETS,
        method: "POST",
        body,
      }),
    }),
    getWidgetById: builder.query<TGetWidgetResponse, TGetWidgetRequest>({
      query: (id) => ({
        url: `${ApiEndpoint.WIDGETS}/${id}`,
      }),
    }),
    putWidgetById: builder.query<TPutWidgetResponse, TPutWidgetRequest>({
      query: (body) => ({
        url: `${ApiEndpoint.WIDGETS}/${body.id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteWidgetById: builder.query<
      TDeleteWidgetResponse,
      TDeleteWidgetRequest
    >({
      query: (id) => ({
        url: `${ApiEndpoint.WIDGETS}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLazyLoginQuery,
  useGetWidgetsQuery,
  useGetWidgetByIdQuery,
  useLazyPutWidgetByIdQuery,
  useLazyPostWidgetsQuery,
  useLazyDeleteWidgetByIdQuery,
} = api;
