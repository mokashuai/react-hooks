import R from 'utils/request'
export default {
	getData: body => R({body, url: 'get'}),//请求方式缺省，为get
	updateData: body => R({method: 'put', body, url: 'put'}),
	submitData: body => R({method: 'post', body, url: 'post'}),
	deleteData: body => R({method: 'delete', body, url: 'delete'}),
}