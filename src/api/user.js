import http from '@/utils/request'
const baseUrl = '/api'


// 账号登陆
export const accountLogin = (userInfo) => {
    return http.fetchPost(`${baseUrl}/admin/login`, userInfo)
}

// 发送验证吗
export const verif = (userInfo) => {
    return http.fetchPost(`${baseUrl}/admin/verif`, userInfo)
}

// 注册
export const register = (userInfo) => {
    return http.fetchPost(`${baseUrl}/admin/register`, userInfo)
}

// 修改密码
export const updatePassword = (userInfo) => {
    return http.fetchPost(`${baseUrl}/admin/updatePassword`, userInfo)
}

// 获取个人信息
export const userInfo = (userInfo) => {
    return http.fetchPost(`${baseUrl}/admin/getUserInfo`, userInfo)
}

// 用户退出
export const singout = (userInfo) => {
    return http.fetchGet(`${baseUrl}/admin/singout`, userInfo)
}