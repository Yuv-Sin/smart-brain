import React, { Component } from 'react';

class Register extends Component {
	constructor(props){
		super(props);
		this.state ={
			email: '',
			password: '',
			name: ''
		}
	}

	onNameChange = (event) =>{
		this.setState({ name: event.target.value });
	}

	onEmailChange = (event) =>{
		this.setState({ email: event.target.value });
	}

	onPasswordChange = (event) =>{
		this.setState({ password: event.target.value });
	}

	

	onSubmitRegister = () => {
		console.log(this.state);
		fetch('https://stormy-bastion-22152.herokuapp.com/register', {
		method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name
		})
	})
		.then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
		}	
		})
	}


	render(){
		return(
		<article class="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
					<main className="pa4 black-80">
					  <div className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f1 fw6 ph0 mh0">Register</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f3" htmlFor="name">Name</label>
					        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 tc" 
					        type="text" 
					        name="name"  
					        id="name" 
					        size = "40"
					        onChange ={ this.onNameChange }
					        />
					      </div>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f3" htmlFor="email-address">Email</label>
					        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 tc" 
					        type="email" 
					        name="email-address"  
					        id="email-address" 
					        size = "40"
					        onChange ={ this.onEmailChange }
					        />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f3" htmlFor="password">Password</label>
					        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 tc" 
					        type="password" 
					        name="password"  
					        id="password" 
					        size = "40"
					        onChange ={ this.onPasswordChange }
					        />
					      </div>
					    </fieldset>
					    <div className="">
					      <input onClick={ this.onSubmitRegister } 
					      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" 
					      type="submit" 
					      value="Register"/>
					    </div>
					  </div>
					</main>
		</article>
		);
	}
	
}
export default Register;