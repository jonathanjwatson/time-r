import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie'
const cookies = new Cookies();


class SignUp extends Component {
	constructor() {
        super();
        this.state = {
            user: {
				email: "",
				password: ""
			},
			token: "",
			submittedForm: false,
			redirect: false
        }
    }
	_handleChange = (e) => {
		const attributeName = e.target.name;
		const attributeValue = e.target.value;
		const user = {...this.state.user};
		user[attributeName] = attributeValue;
		this.setState({ user });
	}
	// _handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	const payload = this.state.user;
	// 	axios.post(`/auth/register`, payload)
	// 	.then((res) => {
    //         console.log(res);
	// 		console.log("success")
	// 		// const submittedForm = !submittedForm
	// 		// this.setState({submittedForm})
	// 		let token = res.data.token;
	// 		console.log(token);
	// 		this.setState({token})
	// 		cookies.set("token", token);
	// 		if(token){
	// 			let redirect = !this.state.redirect;
	// 			this.setState({redirect})
	// 		}
    //     })
    //     .catch((err) => {
    //         console.log(err.response.data.error);
    //     })
	// }
    render() {
		if (this.state.redirect){
			return <Redirect to="/dashboard" jwt={this.state.token}/>
		  }
        return (
            <div>
				<form onSubmit={(e) => this.props._handleSubmit(e, this.state.user, "register")}>
					<input 
						type="text" 
						onChange={this._handleChange}
						value={this.state.user.email}
						name="email"
						placeholder="Email Address"
						required
					/>
					<input 
						type="password" 
						onChange={this._handleChange}
						value={this.state.user.password}
						name="password"
						placeholder="Password"
						required
					/>
					<input 
						type="submit"
						value="Submit" />
				</form>
            </div>
        );
    }
}

export default SignUp;