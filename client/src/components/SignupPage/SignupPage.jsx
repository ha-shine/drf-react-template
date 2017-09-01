import React, { Component } from 'react';
import SignupForm from './SignupForm.jsx';
import LoginForm from './LoginForm.jsx';
import { Route, Link, Redirect } from 'react-router-dom';

export default class SignupPage extends Component {
    wrappedLoginForm = (props) => {
        return (
            <LoginForm {...props} login={this.props.login}/>
        )
    }

    render() {
        if (this.props.isAuthenticated)
            return <Redirect to="/" />;
        
        return (
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-two-thirds"></div>
                        <div className="column">
                            <div className="tabs is-toggle is-fullwidth">
                                <ul>
                                    <li 
                                        className={this.props.location.pathname === '/login' ? 'is-active' : ''}
                                    >
                                        <Link to="/login">
                                            Login
                                        </Link>
                                    </li>
                                    <li 
                                        className={this.props.location.pathname === '/signup' ? 'is-active' : ''}
                                    >
                                        <Link to="/signup">
                                            Signup
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <Route path="/signup" component={SignupForm} />
                            <Route path="/login" component={this.wrappedLoginForm} />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}