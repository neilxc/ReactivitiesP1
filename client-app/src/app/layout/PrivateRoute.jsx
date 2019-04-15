import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { inject, observer } from 'mobx-react';

const PrivateRoute = ({component: Component, userStore: {isLoggedIn}, ...rest}) =>
    <Route 
        {...rest}
        render={props =>
            isLoggedIn ? <Component {...props} /> : <Redirect to={'/'} />
        }
    />

export default inject('userStore')(observer(PrivateRoute));