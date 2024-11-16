import request from '@/utils/request'
// 查询列表
export function listcx02(data) {
  let pageNum = data.pageNum ? data.pageNum : 1;
  let pageSize = data.pageSize ? data.pageSize: 10;
  return request({
    url: '/business/christine/cx02/list?pageNum='+pageNum+"&pageSize="+pageSize,
    method: 'post',
    data: data
  })
}
//查看
export function Lookcx02(id) {
	return request({
	  url: '/business/christine/cx02/get/'+id,
	  method: 'get',
	})
}
//修改
export function getTestReportCX02(id) {
	return request({
	  url: '/business/christine/cx02/get/'+id,
	  method: 'get',
	})
}