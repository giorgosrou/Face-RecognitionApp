import React from "react";
import { Component } from "react";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            emailError: '',
            passwordError: '',
            nameError: ''
        }
    }

    validateEmail = () => {
        if (!this.state.email) {
            this.setState({ emailError: 'Email is required' });
        } else {
            this.setState({ emailError: '' });
        }
    };
        
        validatePassword = () => {
        if (!this.state.password) {
            this.setState({ passwordError: 'Password is required' });
        } else {
            this.setState({ passwordError: '' });
        }
    };
        
        validateName = () => {
        if (!this.state.name) {
            this.setState({ nameError: 'Name is required' });
        } else {
            this.setState({ nameError: '' });
        }
    };

    onNameChange = (event) => {
        this.setState({name: event.target.value});
        this.validateName();
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
        this.validateEmail();
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
        this.validatePassword();
    }

    onSubmitSignIn = () => {
        this.validateEmail();
        this.validatePassword();
        this.validateName();
        fetch('https://face-detection-backend-0tsv.onrender.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response=> response.json())
            .then(user=> {
                if (user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                }
            })
    }

    render() {
        return (
            <div>
                <article className="br3  ba dark-grey b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Register</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                    <input 
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="text" 
                                        name="name"  
                                        id="name"
                                        onChange = {this.onNameChange}/>
                                        <p className="error">{this.state.nameError}</p>
                                </div>
                                <div 
                                    className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input 
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="email"
                                        name="email-address"  
                                        id="email-address"
                                        onChange = {this.onEmailChange}/>
                                        <p className="error">{this.state.emailError}</p>
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input 
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="password" 
                                        name="password"  
                                        id="password"
                                        onChange = {this.onPasswordChange}/>
                                        <p className="error">{this.state.passwordError}</p>
                                </div>
                            </fieldset>
                            <div className="">
                                <input
                                    onClick={this.onSubmitSignIn} 
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                    type="submit" 
                                    value="Register"/>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        )
    }
}

export default Register;