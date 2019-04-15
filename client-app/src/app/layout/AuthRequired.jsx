import React, {Component} from 'react';

import userStore from '../stores/userStore';
import { Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('userStore')
@observer
class AuthRequired extends Component {
    render() {
        const {userStore: {isLoggedIn}, Component} = this.props;
        console.log(isLoggedIn);
        if (!userStore.isLoggedIn) {
            return <Component />;
          }
          return <Redirect to='/' />;
    }
}

export default AuthRequired;
