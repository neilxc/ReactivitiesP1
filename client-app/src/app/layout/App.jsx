import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar.jsx';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard.jsx';
import { Route, Switch } from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import HomePage from '../../features/home/HomePage.jsx';
import ActivityForm from '../../features/activities/form/ActivityForm.jsx';
import ActivityDetails from '../../features/activities/details/ActivityDetails.jsx';
import { NotFound } from '../common/errors/NotFound.jsx';
import ErrorBoundary from '../common/errors/ErrorBoundary.jsx';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <ToastContainer position={'bottom-right'} />
        <Route exact path='/' component={HomePage} />
        <Route
          path={'/(.+)'}
          render={() => (
            <Fragment>
              <NavBar />
              <Container style={{ marginTop: '7em' }}>
                <Switch>
                  <Route
                    exact
                    path='/activities'
                    component={ActivityDashboard}
                  />
                  <Route path='/activities/:id' component={ActivityDetails} />
                  <Route path='/manage/:id' component={ActivityForm} />
                  <Route path='/createActivity' component={ActivityForm} />
                  <Route component={NotFound} />
                </Switch>
              </Container>
            </Fragment>
          )}
        />
      </ErrorBoundary>
    );
  }
}

export default App;
