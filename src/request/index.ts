import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import config from './config'
import { ResponseCode } from '@/enums/Resonponse'
import { Toast } from 'vant';
import { getToken, clearStore } from '@/utils/user'
import router from '@/router'
import { RouteLocationRaw } from 'vue-router'

const service: AxiosInstance = axios.create(config)

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      config.headers['X-ECAPI-Authorization'] = token
    }
    // console.log(config,9991)
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (res: AxiosResponse) => {
    // console.log('res', res)
    // console.log('router', router)
    const contentType = res.headers['content-type']
    if (contentType === 'application/octet-stream' || contentType==='application/vnd.ms-excel;charset=utf-8') {
      const data = res.data
      res.data = {
        code: ResponseCode.Success,
        message: 'ok',
        data,
      }
      return res
    }
    if (res.data.code != ResponseCode.Success) {
      if (res.data.code === ResponseCode.InvalidToken) {
        // 清空localstorage & 跳登录页
        const { fullPath } = router.currentRoute.value
        const to: RouteLocationRaw = {
          path: '/login',
        }
        if (fullPath) {
          to.query = {
            redirect: fullPath,
          }
        }
        clearStore()
        router.push(to)
      } else {
        Toast.fail(res.data.msg)
      }
      return Promise.reject(res)
    }
    
    return res
  },
  (error: AxiosError) => {
    // 网络层面错误，如接口地址写错了会走到这里
    Toast.fail(error.response?.statusText || error.message || '网络错误')
    return Promise.reject(error)
  }
)
export default service
