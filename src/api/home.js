import http from '@/utils/request'
const baseUrl = '/api'


// 账号登陆
export const getSlideshowList = (userInfo) => {
    return http.fetchPost(`${baseUrl}/home/getSlideshowList`, userInfo)
}
