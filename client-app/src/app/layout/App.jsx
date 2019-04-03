import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar.jsx';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard.jsx';
import { inject, observer } from 'mobx-react';
import { Route, Switch, withRouter } from 'react-router-dom';
import HomePage from '../../features/home/HomePage.jsx';
import ActivityForm from '../../features/activities/form/ActivityForm.jsx';
import ActivityDetails from '../../features/activities/details/ActivityDetails.jsx';

@inject('activityStore')
@observer
class App extends Component {
  render() {
    const {
      activityStore: { createFormOpen }
    } = this.props;
    return (
      <Fragment>
        <NavBar createFormOpen={createFormOpen} />
        <Container style={{ marginTop: '7em' }}>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/activities' component={ActivityDashboard} />
            <Route path='/activities/:id' component={ActivityDetails} />
            <Route path='/manage/:id' component={ActivityForm} />
            <Route path='/createActivity' component={ActivityForm} />
          </Switch>
        </Container>
      </Fragment>
    );
  }
}

export default withRouter(App);
