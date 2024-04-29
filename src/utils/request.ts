
import axios, { AxiosPromise, AxiosResponse } from "axios";
import { clearStorage, getStorage } from "./storage";
import { CodeEnum } from "@/enum/code";
import { throttle } from "lodash-es";
import { message } from "antd";

interface ResponseData<T = never> {
  code: number;
  message: string;
  data?: T;
  result: T;
}

export type AjaxResponse<T> = AxiosPromise<ResponseData<T>>;


export const assetUrl = "https://xtspace.cc:8310/file";

export const downloadUrl = import.meta.env.DEV ? "/" : location.origin + "/";

const baseURL = import.meta.env.DEV ? "/api" : "https://xtspace.cc:8310/api"

const request = axios.create({
  baseURL:baseURL,
  timeout: 1000000,
});


// 白名单，不需要带token
const whiteList: string[] = [
  "/user/register",
  "/user/login",
  "/pano/detail",
];


const tokenExpireCallback = throttle(() => {
  message.error("TOKEN已过期，请重新登录！");
  clearStorage();
  window.location.replace("");
}, 1000);


request.interceptors.request.use(
  (config) => {
    if (!whiteList.includes(config.url!)) {
      config.headers.Authorization = getStorage("TOKEN")!;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);



request.interceptors.response.use(
  (response: AxiosResponse) => {
  const res = response.data;
    if (![CodeEnum.SUCCESS].includes(response.status)) {
      return Promise.reject(new Error(res.message || "System Error"));
    }
     if (res.code === CodeEnum.UNAUTHORIZED) {
      tokenExpireCallback();
    }
    return response;
  },
  (error) => {
     if (error.response?.status === 401) {
      tokenExpireCallback();
    }
    return error;
  },
);

export { request };
