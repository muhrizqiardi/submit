import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

let defaultAxiosRequestConfig: AxiosRequestConfig = {
  baseURL: process?.env?.API_BASE_URL ?? "http://localhost:9000",
};

const axiosInstance = <D = any>(
  axiosRequestConfig: AxiosRequestConfig<D> = defaultAxiosRequestConfig
): AxiosInstance => {

  return axios.create({
    ...axiosRequestConfig,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export default axiosInstance;
