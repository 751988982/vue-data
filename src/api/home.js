import http from '@/utils/request'
const baseUrl = '/api'

// 查轮播图
export const getSlideshowList = (userInfo) => {
  return http.fetchPost(`${baseUrl}/home/getSlideshowList`, userInfo)
}

// 新增
export const instertSlideshow = (userInfo) => {
  return http.fetchPost(`${baseUrl}/home/instertSlideshow`, userInfo)
}

// 修改
export const upSlideshow = (userInfo) => {
  return http.fetchPost(`${baseUrl}/home/upSlideshow`, userInfo)
}

// 删除
export const delSlideshow = (userInfo) => {
  return http.fetchPost(`${baseUrl}/home/delSlideshow`, userInfo)
}
