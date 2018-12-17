import React from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import AsyncComponent from 'components/AsyncComponent';

const NotMatch = AsyncComponent(() => import('components/NotMatch'));
const App = AsyncComponent(() => import('pages/app'));

@connect(null, {replace})
export default class RootRouter extends React.Component{
	render(){
		const props = this.props;
		//如果没有权限，在此进行
		return (
			<Router>
				<div>
					<ul>
						<li><Link to='/'>首页</Link></li>
						<li><Link to='/about'>关于</Link></li>
						<li><Link to='/topics'>主题列表</Link></li>
					</ul>
					<hr/>
					<Switch>
						<Route exact path="/" render={() => <Redirect to='/login'/>}/>
						<Route path="/login" component={App} />
						<Route path="/about" component={App} />
						<Route path="/topics" component={App} />
						<Route component={NotMatch} />
					</Switch>	
				</div>
			</Router>
		)
	}
}


