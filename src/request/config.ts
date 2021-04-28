import { AxiosRequestConfig } from 'axios'

const isDev = process.env.NODE_ENV === 'development'
const API_HOST = import.meta.env.VITE_API_HOST as string
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

// console.log('isDev', isDev, import.meta.env, API_HOST, API_BASE_URL)

const axiosConfig: AxiosRequestConfig = {
  baseURL: isDev ? API_BASE_URL : API_HOST + API_BASE_URL,
  // baseURL: API_HOST + API_BASE_URL,
  // 请求超时时间
  timeout: 10 * 1000,
  // 跨域是否带token
  withCredentials: true,
}
export default axiosConfig
