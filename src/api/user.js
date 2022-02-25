import http from '@/utils/request'
const baseUrl = '/api'


// 账号登陆
export const accountLogin = (userInfo) => {
    return http.fetchGet(`${baseUrl}/user/accountLogin`, userInfo)
}

// // 发送验证吗
// export const verif = (userInfo) => {
//     return http.fetchPost(`${baseUrl}/admin/verif`, userInfo)
// }

// // 注册
// export const register = (userInfo) => {
//     return http.fetchPost(`${baseUrl}/admin/register`, userInfo)
// }

// 修改密码
export const upPassworld = (userInfo) => {
    return http.fetchPost(`${baseUrl}/user/upPassworld`, userInfo)
}

// 获取个人信息
export const userInfo = (userInfo) => {
    return http.fetchPost(`${baseUrl}/user/getUserInfo`, userInfo)
}

// 用户退出
export const singout = (userInfo) => {
    return http.fetchGet(`${baseUrl}/user/singout`, userInfo)
}

// 获取用户列表
export const getUserList = (userInfo) => {
    return http.fetchPost(`${baseUrl}/user/getUserList`, userInfo)
}

// 创建用户
export const insertAdmin = (userInfo) => {
    return http.fetchPost(`${baseUrl}/user/insertAdmin`, userInfo)
}

// 删除用户
export const delAdmin = (userInfo) => {
    return http.fetchPost(`${baseUrl}/user/delAdmin`, userInfo)
}

// 获取用户列表
export const getPlayerList = (userInfo) => {
    return http.fetchPost(`${baseUrl}/admin/getPlayerList`, userInfo)
}