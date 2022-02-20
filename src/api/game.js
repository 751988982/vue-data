import http from '@/utils/request'
const baseUrl = '/api'

// 查模块
export const getGameList = (userInfo) => {
  return http.fetchGet(`${baseUrl}/game/getGameList`, userInfo)
}

// 查分类
export const getGameTypeList = (userInfo) => {
  return http.fetchGet(`${baseUrl}/game/getGameTypeList`, userInfo)
}

// 添加模块
export const insertGame = (userInfo) => {
  return http.fetchPost(`${baseUrl}/game/insertGame`, userInfo)
}

// 添加分类
export const insertGameType = (userInfo) => {
  return http.fetchPost(`${baseUrl}/game/insertGameType`, userInfo)
}

// 修改模块
export const upGame = (userInfo) => {
  return http.fetchPost(`${baseUrl}/game/upGame`, userInfo)
}

// 修改分类
export const upGameType = (userInfo) => {
  return http.fetchPost(`${baseUrl}/game/upGameType`, userInfo)
}

// 删除模块
export const delGame = (userInfo) => {
  return http.fetchPost(`${baseUrl}/game/delGame`, userInfo)
}

// 删除分类
export const delGameType = (userInfo) => {
  return http.fetchPost(`${baseUrl}/game/delGameType`, userInfo)
}

// 获取历史票列表
export const getBillTypeList = (userInfo) => {
  return http.fetchGet(`${baseUrl}/game/getBillTypeList`, userInfo)
}

// 添加历史票
export const insertBillType = (userInfo) => {
  return http.fetchPost(`${baseUrl}/game/insertBillType`, userInfo)
}

// 修改历史票
export const upBillType = (userInfo) => {
  return http.fetchPost(`${baseUrl}/game/upBillType`, userInfo)
}

// 删除历史票
export const delBillType = (userInfo) => {
  return http.fetchPost(`${baseUrl}/game/delBillType`, userInfo)
}

// 获取文案列表
export const getBillList = (userInfo) => {
  return http.fetchGet(`${baseUrl}/game/getBillList`, userInfo)
}

// 添加文案
export const insertBillInfo = (userInfo) => {
  return http.fetchPost(`${baseUrl}/game/insertBillInfo`, userInfo)
}

// 修改文案
export const upBillInfo = (userInfo) => {
  return http.fetchPost(`${baseUrl}/game/upBillInfo`, userInfo)
}

// 删除文案
export const delBillInfo = (userInfo) => {
  return http.fetchPost(`${baseUrl}/game/delBillInfo`, userInfo)
}

// 获取vip列表
export const getVipTypeList = (userInfo) => {
  return http.fetchGet(`${baseUrl}/game/getVipTypeList`, userInfo)
}

// 添加vip
export const insertVipInfo = (userInfo) => {
  return http.fetchPost(`${baseUrl}/game/insertVipInfo`, userInfo)
}

// 修改vip
export const upVipType = (userInfo) => {
  return http.fetchPost(`${baseUrl}/game/upVipType`, userInfo)
}

// 删除vip
export const delVipType = (userInfo) => {
  return http.fetchPost(`${baseUrl}/game/delVipType`, userInfo)
}
