import React from 'react';
import { When } from './../if/index.js';
import jwt from 'jsonwebtoken';
import util from 'util';

import { LoginContext } from './context.js';

class Auth extends React.Component {

  _okToRender = (context) => {
    let user = context.token ? jwt.verify(context.token, 'changeit') : {};

    let operationRequirement = this.props.capability;
    let loggedIn = context.loggedIn;

    if (loggedIn && !operationRequirement) {
      return true;
    }

    if(user.capabilities){
      if(user.capabilities.includes(operationRequirement)){
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <LoginContext.Consumer>
        { (context) => {
          let okToRender = this._okToRender(context);
          return (
            <When condition={okToRender}>
              {this.props.children}
            </When>
          )
        }}
      </LoginContext.Consumer>
    );
  }
}

export default Auth;
