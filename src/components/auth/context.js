
import React from 'react';
import cookie from 'react-cookies';
import queryString from 'querystring';

export const LoginContext = React.createContext();

class LoginProvider extends React.Component {
  constructor(props){
    super(props);
    const cookieToken = cookie.load('auth');
    const token = cookieToken || null;
    this.setLoginState();
    this.state = {
      loggedIn: !!token,
      token: null,
      login: this.login,
      logout: this.logout,
    }
  }
  
  setLoginState = (loggedIn) => {
    let token = cookie.load('auth');
    this.setState({ loggedIn, token });
  }

  login = (token) => {
    cookie.save('auth', token);
    this.setLoginState(true);
  }
  
  logout = () => {
    cookie.remove('auth');
    this.setLoginState(false);
  }

  render(){
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    )
  }
}

export default LoginProvider;