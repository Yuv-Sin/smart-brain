import React, { Component } from 'react';
import logo from './logo.png'
class Header extends Component{
	render(){
		return(
		<div>
		<img  className="br2 shadow-2" style={{height: 200, width: 200}} alt='Logo' src={logo} />
		</div>
		);
		}
}
export default Header;