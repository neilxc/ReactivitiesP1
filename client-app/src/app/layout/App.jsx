import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar.jsx';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard.jsx';
import { Route, Switch, withRouter } from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import HomePage from '../../features/home/HomePage.jsx';
import ActivityForm from '../../features/activities/form/ActivityForm.jsx';
import ActivityDetails from '../../features/activities/details/ActivityDetails.jsx';
import { NotFound } from '../common/errors/NotFound.jsx';
import ErrorBoundary from '../common/errors/ErrorBoundary.jsx';
import { inject, observer } from 'mobx-react';
import LoadingComponent from './LoadingComponent.jsx';
import ModalContainer from '../modals/ModalContainer.jsx';
import ProfilePage from '../../features/profiles/ProfilePage.jsx';

@inject('commonStore', 'userStore')
@observer
class App extends Component {
  componentWillMount() {
    const {commonStore} = this.props;
    if (!commonStore.token) {
      commonStore.setAppLoaded()
    }
  }

  componentDidMount() {
    const {commonStore, userStore} = this.props;
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    }
  }

  render() {
    const {commonStore: {appLoaded}} = this.props;
    if (!appLoaded) return <LoadingComponent content='Loading app...' />
    return (
      <ErrorBoundary>
        <ToastContainer position={'bottom-right'} />
        <ModalContainer />
        <Route exact path='/' component={HomePage} />
        <Route
          path={'/(.+)'}
          render={() => (
            <Fragment>
              <NavBar />
              <Container style={{ marginTop: '7em' }}>
                <Switch key={this.props.location.key}>
                  <Route
                    exact
                    path='/activities'
                    component={ActivityDashboard}
                  />
                  <Route path='/activities/:id' component={ActivityDetails} />
                  <Route path='/manage/:id' component={ActivityForm} />
                  <Route path='/createActivity' component={ActivityForm} />
                  <Route path='/profiles/:username' component={ProfilePage} />
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

export default withRouter(App);
