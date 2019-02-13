import React from 'react';
import util from 'util';
import { When } from './../if';
import { LoginContext } from "./context.js";
class Login extends React.Component {

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  logout = (e, contextLogoutFunction) => {
    e.preventDefault();
    contextLogoutFunction();
  }
  login = (e, contextLoginFunction) => {
    e.preventDefault();
    contextLoginFunction();
  }

  render() {
    return (
      <LoginContext.Consumer>
          { (context) => {
            return (
              <>
                <h1>this is the login component</h1>
                <When condition={true}>
                  <button 
                  onClick={(e) => { this.logout(e, context.logout)}}>Logout</button>
                </When>
                <When condition={true}>
                  <form>
                    <input 
                    name="username"
                    onChange={this.handleChange}
                    placeholder="name" />
                    <input 
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                    placeholder="password" />
                    <button 
                    onClick={(e)=> this.login(e, context.login)} 
                    type="submit">Login</button>
                  </form>
                </When>
              </>
            );
          }}
        </LoginContext.Consumer>
    );
  }
}

export default Login;
