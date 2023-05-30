import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import {
  HttpError,
  RequestMethods,
  HttpResponse,
  HttpRequestConfig
} from "./type.d";

const { VITE_PROXY_DOMAIN, VITE_PROXY_DOMAIN_REAL } = import.meta.env;
const router = useRouter();

export const baseURL =
  process.env.NODE_ENV === "development"
    ? VITE_PROXY_DOMAIN
    : VITE_PROXY_DOMAIN_REAL;

const defaultConfig: AxiosRequestConfig = {
  baseURL,
  timeout: 60000
};

class HttpRequest {
  constructor() {
    this.HttpInterceptRequest();
    this.HttpInterceptResponse();
  }
  private static initConfig: HttpRequestConfig = {};
  // 保存axios实例
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

  // 请求拦截
  private HttpInterceptRequest(): void {
    HttpRequest.axiosInstance.interceptors.request.use(
      (config: HttpRequestConfig) => {
        const $config = config;
        if (typeof config.beforeRequestCallback === "function") {
          config.beforeRequestCallback($config);
          return $config;
        }
        if (HttpRequest.initConfig.beforeRequestCallback) {
          HttpRequest.initConfig.beforeRequestCallback($config);
          return $config;
        }
        return $config;
      },
      err => Promise.reject(err)
    );
  }

  // 响应拦截
  private HttpInterceptResponse(): void {
    HttpRequest.axiosInstance.interceptors.response.use(
      (response: HttpResponse) => {
        const $config = response.config;
        if (response.data.code === 401) {
          router.push("/login");
        }

        if (typeof response.config.beforeResponseCallback === "function") {
          response.config.beforeResponseCallback(response);
          return $config;
        }
        if (HttpRequest.initConfig.beforeResponseCallback) {
          HttpRequest.initConfig.beforeResponseCallback(response);
          return response.data;
        }
        return response.data;
      },
      (err: HttpError) => Promise.reject(err)
    );
  }

  // 通用请求
  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: HttpRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig
    } as HttpRequestConfig;
    return new Promise((resolve, reject) => {
      HttpRequest.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  // post
  public post<T, P>(
    url: string,
    params?: T,
    axiosConfig?: HttpRequestConfig
  ): Promise<P> {
    return this.request<P>("post", url, params, axiosConfig);
  }

  // get
  public get<T, P>(
    url: string,
    params?: T,
    axiosConfig?: HttpRequestConfig
  ): Promise<P> {
    return this.request<P>("get", url, params, axiosConfig);
  }
}

export const http = new HttpRequest();
