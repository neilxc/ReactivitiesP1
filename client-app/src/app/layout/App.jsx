import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import data from '../api/activities.json';
import NavBar from '../../features/nav/NavBar.jsx';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard.jsx';

class App extends Component {
  state = {
    activities: [],
    selectedActivity: null,
    editMode: false
  };

  componentDidMount() {
    this.setState({ activities: data });
  }

  handleActivitySelect = id =>
    this.setState(({ activities }) => ({
      selectedActivity: activities.find(a => a.id === id)
    }));

  handleCancelSelectActivity = () =>
    this.setState({
      selectedActivity: null
    });

  render() {
    const { activities, selectedActivity, editMode } = this.state;
    return (
      <Fragment>
        <NavBar />
        <Container style={{ marginTop: '7em' }}>
          <ActivityDashboard
            activities={activities}
            selectActivity={this.handleActivitySelect}
            selectedActivity={selectedActivity}
            cancelSelectedActivity={this.handleCancelSelectActivity}
            editMode={editMode}
          />
        </Container>
      </Fragment>
    );
  }
}

export default App;
