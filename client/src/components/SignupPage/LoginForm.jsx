import React, { Component } from 'react';
import axios from 'axios';
import { HOST } from '../../constants';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isLoading: false
        };
    }

    startLoading() {
        this.setState({
            isLoading: true
        })
    }

    stopLoading() {
        this.setState({
            isLoading: false
        })
    }

    submitForm = () => {
        this.startLoading();

        let email = this.emailInput.value;
        let password = this.pwdInput.value;
        let view = this;
        let authURL = HOST + 'auth/';

        axios.post(authURL, {username: email, password}).then(response => {
            view.stopLoading();
            let token = response.data.token;
            localStorage.setItem('auth_token', token);
            view.props.login();
        }).catch(error => {
            view.stopLoading();
            let data = error.response.data;
            if(data.non_field_errors) {
                view.setState({
                    error: data.non_field_errors[0]
                });
            }
        })
    }

    render() {
        const buttonClassname = this.state.isLoading? 'button is-primary is-loading' : 'button is-primary';
        return (
            <div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input 
                            type="text" 
                            className="input" 
                            ref={(input) => {this.emailInput = input;}}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input 
                            type="password" 
                            className="input" 
                            ref={(input) => {this.pwdInput = input;}}
                        />
                    </div>
                </div>

                {   this.state.error !== '' ? 
                    <p className="help is-danger">{this.state.error}</p> : ''
                }

                <div className="field">
                    <div className="control">
                        <button className={buttonClassname} onClick={this.submitForm}>Log In</button>
                    </div>
                </div>
            </div>
        )
    }
}