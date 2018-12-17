import axios from 'axios';
import { PUBLIC_PATH } from './constant';

const bodyConnect = body => {
	let arr = Object.keys(body).map(each => `${each}=${body[each]}`);
	return arr.length ? `?${arr.join("&")}` : "";
};

axios.defaults.timeout = 20000;
//无论何种请求方式，参数均使用json格式
export default ({url='',method='get', body={}}) => {
	const url_ = `${PUBLIC_PATH}/${url}`;
	method = method.toLowerCase();
	let rest;
	switch(method){
		case 'get':
			rest = [url_ + bodyConnect(body)];
		break; 
		case 'delete': 
			if(JSON.stringify(body) === "{}")
				rest = [url_];
			else {
				rest = [url_, {data: body}];//如果服务端将参数当做url参数接收:rest = [url_, {params: body}]
			};
		break;
		case 'put': 
		case 'post': 
			rest = [url_, body];
		break;
	}
	return new Promise((resolve, reject) => axios[method] && axios[method](...rest).then(res => {
			const { code, ctn={} } = res.data || {};//ctn为协商的默认的返回数据
			!ctn && (res.data.ctn={});
			code === 2000 ? resolve(res.data.ctn) : reject(res.data);
			if(code === 4401){
				alert("用户未登录！");
				window.location.href = '/login';
			}
		}).catch(err => {
			err.errorReason = window.navigator.onLine ? '服务器异常，请稍候重试' : '网络异常，请检查网络设置';
	    reject(err);
	  })
	);
}