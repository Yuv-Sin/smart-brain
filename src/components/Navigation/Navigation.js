import React from 'react';
const Navigation = ({ onRouteChange, IsSignedIn }) => {
	if(IsSignedIn){
		return(
		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
		<p onClick={  () => onRouteChange('SignOut') } className='f3 dim balck underline pa3 pointer'>Sign Out</p>
		</nav>
		);
	}
	else{
		return(
		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
		<p onClick={  () => onRouteChange('SignIn') } className='f3 dim balck underline pa3 pointer'>Sign In</p>
		<p onClick={  () => onRouteChange('Register') } className='f3 dim balck underline pa3 pointer'>Register</p>
		</nav>
		);
	}
		
}
export default Navigation;