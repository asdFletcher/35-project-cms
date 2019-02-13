
import React from 'react';
export const LoginContext = React.createContext();


class LoginProvider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      login: this.login,
      logout: this.logout,
    }
  }

  login = () => {
    console.log(`from login context 🍫`);
  }

  logout = () => {
    console.log(`from logout context 🍰`);
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