import INTERFACES from '../interface'

export const getData = dispatch => param => INTERFACES.getData(param)
	.then(res => dispatch({
		type: 'SET_DATA',
		payload: res
})).catch(console.error);