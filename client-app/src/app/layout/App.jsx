import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar.jsx';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard.jsx';
import LoadingComponent from './LoadingComponent.jsx';
import { inject, observer } from 'mobx-react';

@inject('activityStore')
@observer
class App extends Component {
  componentDidMount() {
    this.props.activityStore.loadActivities();
  }

  render() {
    const {
      activityStore: { activitiesByDate, loading, createFormOpen }
    } = this.props;
    if (loading && activitiesByDate.length === 0)
      return (
        <LoadingComponent inverted={true} content='Loading Activities...' />
      );
    return (
      <Fragment>
        <NavBar createFormOpen={createFormOpen} />
        <Container style={{ marginTop: '7em' }}>
          <ActivityDashboard />
        </Container>
      </Fragment>
    );
  }
}

export default App;
