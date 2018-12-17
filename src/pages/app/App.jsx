import React, { Component } from 'react';

import SubCom from './SubCom';

class App extends Component {
	state = {
		index: 0,
		show: true
	}

	click = e => {
		this.setState(({index}) => ({index: ++index}));
	}
	
	change = v => {
		console.log(v);
	}
	
	componentDidMount(){
		this.props.getData();
	}
	
	render(){
		const {status, changeStatus} = this.props;
		return (
			<div className='app'>
				<span onClick={e => changeStatus(Math.random())}>{status}</span>
				<button onClick={this.click}>按钮{this.state.index}</button>
				<SubCom change={this.change}/>
			</div>
		)
	}
}
export default App;