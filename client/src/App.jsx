import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import SignupPage from './components/SignupPage/SignupPage.jsx';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isAuthenticated: false
    }
  }

  login = () => {
    this.setState({
      isAuthenticated: true
    })
  }

  logout = () => {
    localStorage.removeItem('auth_token');
    this.setState({
      isAuthenticated: false
    })
  }

  componentDidMount() {
    if(localStorage.getItem('auth_token')) {
      this.login();
    } else {
      this.logout();
    }
  }

  wrappedSignupPage = (props) => {
    if(!this.state.isAuthenticated)
      return <SignupPage 
                {...props} 
                login={this.login} 
                isAuthenticated={this.state.isAuthenticated}
              />;
    else
      return <Redirect to="/" />
  }

  render() {
    return (
      <Router>
        <div>
          <div className="container">
            <nav className="navbar">
              <div className="navbar-brand">
                <Link className="navbar-item" to="/">Your brand</Link>
              </div>
              <div className="navbar-menu">
                <div className="navbar-end">
                  <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link">
                      Account
                    </a>
                    { this.state.isAuthenticated ?
                      <div className="navbar-dropdown">
                        <a className="navbar-item">Profile</a>
                        <a className="navbar-item" onClick={this.logout}>Logout</a>
                      </div> : 
                      <div className="navbar-dropdown">
                        <Link className="navbar-item" to="/signup">Login/Sign Up</Link>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </nav>
          <div className="container-fluid">
            <Route path="/signup" component={this.wrappedSignupPage} />
            <Route path="/login" component={this.wrappedSignupPage} />
          </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
