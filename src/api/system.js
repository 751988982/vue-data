import http from '@/utils/request'
const baseUrl = '/api'

// 查投诉
export const getSuggestList = (userInfo) => {
    return http.fetchPost(`${baseUrl}/suggest/getSuggestList`, userInfo)
}

// 查关于我们
export const getAboutList = (userInfo) => {
    return http.fetchPost(`${baseUrl}/suggest/getAboutList`, userInfo)
}

// 修改
export const upAbout = (userInfo) => {
    return http.fetchPost(`${baseUrl}/suggest/upAbout`, userInfo)
}

// 新增
export const insertAbout = (userInfo) => {
    return http.fetchPost(`${baseUrl}/suggest/insertAbout`, userInfo)
}

// 删除
export const delAbout = (userInfo) => {
    return http.fetchPost(`${baseUrl}/suggest/delAbout`, userInfo)
}

// 查支付
export const getPayList = (userInfo) => {
    return http.fetchPost(`${baseUrl}/suggest/getPayList`, userInfo)
}

// 修改
export const upPay = (userInfo) => {
    return http.fetchPost(`${baseUrl}/suggest/upPay`, userInfo)
}

//新增
export const insertPay = (userInfo) => {
    return http.fetchPost(`${baseUrl}/suggest/insertPay`, userInfo)
}

// 删除
export const delPay = (userInfo) => {
    return http.fetchPost(`${baseUrl}/suggest/delPay`, userInfo)
}