import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.apw.ge/walletApi/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fileInstance = axios.create({
  baseURL: "https://api.apw.ge/walletApi/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

fileInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
