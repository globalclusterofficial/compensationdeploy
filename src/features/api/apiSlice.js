import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosInstance } from "../../lib/axios";

// Custom fetchBaseQuery using axiosInstance
/**
 * Makes a custom fetch request using axios with the provided parameters.
 * @param {Object} options - An object containing the request options.
 * @param {string} [options.baseUrl=''] - The base URL for the request.
 * @param {string} [options.url=''] - The URL for the request.
 * @param {string} [options.method='GET'] - The HTTP method for the request.
 * @param {Object} [options.headers={}] - The headers for the request.
 * @param {Object} options.body - The body of the request.
 * @returns {Promise} A promise that resolves to an object with the response data or an error object.
 */
const customFetchBaseQuery = ({
  baseUrl = "",
  url = "",
  method = "GET",
  headers = {},
  body,
}) => {
  const accessToken = localStorage.getItem("accessToken"); // Or however you store your access token

  // // Add the Authorization header if we have a token
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return axiosInstance({
    method,
    url: `${baseUrl}${url}`,
    headers,
    data: body,
  })
    .then((response) => ({
      data: response.data,
    }))
    .catch((error) => {
      if (error.response) {
        const { status, data } = error.response;
        return { error: { status, data } };
      } else if (error.request) {
        return { error: { status: 500, data: "Network error" } };
      } else {
        return { error: { status: 500, data: error.message } };
      }
    });
};
/**
 * Creates a global cluster API using the given configuration.
 * @param {Object} config - The configuration object for creating the API.
 * @param {string} config.reducerPath - The path for the reducer.
 * @param {Function} config.baseQuery - The base query function for the API.
 * @param {Function} config.endpoints - The endpoints configuration function.
 * @returns The global cluster API.
 */
export const globalClusterApi = createApi({
  reducerPath: "api",
  baseQuery: customFetchBaseQuery,
  endpoints: (builder) => ({
    // Define your endpoints here when they are ready
  }),
});

export const globalClusterReducer = globalClusterApi.reducer;
export const globalClusterMiddleware = globalClusterApi.middleware;
