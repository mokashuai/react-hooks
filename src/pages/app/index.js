import {connect} from 'react-redux'
import App from './App'
import {getData} from 'actions/index'




const mapStateToProps= state => ({
	status: state.example.status
}),
mapDispatchToProps = dispatch => ({
	changeStatus: payload => dispatch({type: 'CHANGE_STATUS_EXAMPLE', payload}),
	getData: getData(dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(App)