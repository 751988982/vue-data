import http from '@/utils/request'
const baseUrl = '/api'

// 查公告
export const getNoticeList = (userInfo) => {
  return http.fetchGet(`${baseUrl}/notice/getNoticeList`, userInfo)
}

// 新增
export const insertNotice = (userInfo) => {
  return http.fetchPost(`${baseUrl}/notice/insertNotice`, userInfo)
}

// 修改
export const upNotice = (userInfo) => {
  return http.fetchPost(`${baseUrl}/notice/upNotice`, userInfo)
}

// 删除
export const delNotice = (userInfo) => {
  return http.fetchPost(`${baseUrl}/notice/delNotice`, userInfo)
}

// 查研报
export const getStudyList = (userInfo) => {
  return http.fetchGet(`${baseUrl}/notice/getStudyList`, userInfo)
}

// 新增
export const insertSyudy = (userInfo) => {
  return http.fetchPost(`${baseUrl}/notice/insertSyudy`, userInfo)
}

// 修改
export const upSyudy = (userInfo) => {
  return http.fetchPost(`${baseUrl}/notice/upSyudy`, userInfo)
}

// 删除
export const delSyudy = (userInfo) => {
  return http.fetchPost(`${baseUrl}/notice/delSyudy`, userInfo)
}
