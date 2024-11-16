import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  return request({
    url: '/getRouters',
    method: 'get'
  })
}


export const getMenus = () => {
	return request({
	  url: '/getMenus',
	  method: 'get'
	})
}