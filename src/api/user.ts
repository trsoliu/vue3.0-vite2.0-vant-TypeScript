import request from '@/request'
import { Params } from './types'

// 发送短信验证码
export const sendSmsCode = (params: Params) =>
  request.get(`/supr/send/ion/code/${params.mobile}`)

// 用户短信验证码登录
export const login = (params: Params) => request.post('/supr/login', params)
