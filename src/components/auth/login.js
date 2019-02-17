import React from 'react';
import util from 'util';
import { When } from './../if';
import superagent from 'superagent';
import queryString from 'querystring';

import { LoginContext } from "./context.js";

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  logout = (e, contextLogoutFunction) => {
    e.preventDefault();
    contextLogoutFunction();
  }

  login = (e, contextLoginFunction) => {
    e.preventDefault();
    superagent.post(`https://javascript-401-api.herokuapp.com/signin`)
      .auth(this.state.username, this.state.password)
      .then( res => {
        let token = res.text;
        contextLoginFunction(token);
      })
      .catch(console.error);

  }

  render() {
    return (
      <LoginContext.Consumer>
          { (context) => {
            return (
              <>
                <When condition={context.loggedIn}>
                  <button 
                  onClick={(e) => { this.logout(e, context.logout)}}>Logout</button>
                </When>
                <When condition={!context.loggedIn}>
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
