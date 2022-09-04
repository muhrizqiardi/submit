import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

let defaultAxiosRequestConfig: AxiosRequestConfig = {};

if (process !== undefined) {
  defaultAxiosRequestConfig.baseURL = process?.env?.API_BASE_URL;
} else {
  defaultAxiosRequestConfig.baseURL = "https://localhost:9000";
}

const axiosInstance = <D = any>(
  axiosRequestConfig: AxiosRequestConfig<D> = defaultAxiosRequestConfig
): AxiosInstance => {
  let token = window.localStorage.getItem("token");

  if (token === null) return axios.create(axiosRequestConfig);

  return axios.create({
    ...axiosRequestConfig,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export default axiosInstance;
