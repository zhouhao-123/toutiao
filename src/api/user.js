// 用户相关请求
import request from '@/utils/request.js'

// Login 登录 按需导出
export const Login = (data) => {
    return request({
        url: '/app/v1_0/authorizations',
        method: 'POST',
        data
    })
}

// 发送验证码
export const sendSms = (mobile) => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`
    })
}
