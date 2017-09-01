import React, { Component } from 'react';
import axios from 'axios';
import { HOST } from '../../constants';

export default class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailError : '',
            passwordError : '',
            passwordAgainError : '',
            connectionError : '',
            isLoading: false,
            signupComplete: false
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    startLoading() {
        this.setState({
            isLoading: true
        });
    }

    stopLoading() {
        this.setState({
            isLoading: false
        });
    }

    submitForm = () => {
        let email = this.emailInput.value;
        let password = this.pwdInput.value;
        let passwordAgain = this.pwdAgainInput.value;
        let emailError = '';
        let passwordError = '';
        let passwordAgainError = '';
        let hasError = false;

        if (!this.validateEmail(email)) {
            emailError = 'Enter a valid email address';
            hasError = true;
        }
        if (password.length < 6) {
            passwordError = 'Password must not be less than 6 characters';
            hasError = true;
        }
        if (password !== passwordAgain) {
            passwordAgainError = 'The passwords must match'
            hasError = true;
        }

        this.setState({
            emailError,
            passwordError,
            passwordAgainError
        })

        if (!hasError) {
            this.createUser(email, password);
        }
    }

    createUser(email, password) {
        const signupURL = HOST + 'users/';
        let view = this;
        view.startLoading();
        axios.post(signupURL, {email, password}).then(response => {
            view.stopLoading();
            view.setState({
                connectionError: '',
                signupComplete: true
            });
        }).catch(error => {
            view.stopLoading();
            if (error.response.status === 400) {
                let res = error.response.data;
                let emailError = res.email? 'Email already exists' : '';
                view.setState({
                    emailError
                });
            }
            else {
                view.setState({
                    connectionError: 'Something went wrong with the connection. Please try again later'
                })
            }
        })
    }

    render() {
        const emailClassname = this.state.emailError !== '' ? 'input is-danger' : 'input';
        const pwdClassname = this.state.passwordError !== '' ? 'input is-danger' : 'input';
        const pwdAgainClassname = this.state.passwordAgainError !== '' ? 'input is-danger' : 'input';
        const buttonClassname = this.state.isLoading ? 'button is-primary is-loading' : 'button is-primary';
        return (
            <div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input 
                            type="text" 
                            className={emailClassname}
                            ref={(input) => { this.emailInput = input; } }
                        />
                    </div>
                    {   this.state.emailError !== '' ? 
                        <p className="help is-danger">{this.state.emailError}</p> : ''
                    }
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input 
                            type="password" 
                            className={pwdClassname}
                            ref={(input) => { this.pwdInput = input; } }
                        />
                    </div>
                    {   this.state.passwordError !== '' ? 
                        <p className="help is-danger">{this.state.passwordError}</p> : ''
                    }
                </div>
                <div className="field">
                    <label className="label">Password Again</label>
                    <div className="control">
                        <input 
                            type="password" 
                            className={pwdAgainClassname}
                            ref={(input) => { this.pwdAgainInput = input; } }
                        />
                    </div>
                    {   this.state.passwordAgainError !== '' ? 
                        <p className="help is-danger">{this.state.passwordAgainError}</p> : ''
                    }
                </div>
                {   this.state.connectionError !== '' ? 
                    <p className="help is-danger">{this.state.connectionError}</p> : ''
                }
                {   this.state.signupComplete ?
                    <div className="field">
                        <p className="has-text-success">
                            <span><i className="fa fa-check-circle fa-lg" aria-hidden="true"></i> </span>
                            Account creation complete
                        </p>
                    </div> :
                    <div className="field">
                        <div className="control">
                            <button className={buttonClassname} onClick={this.submitForm}>Sign Up</button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}