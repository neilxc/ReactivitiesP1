import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import data from '../api/activities.json';
import NavBar from '../../features/nav/NavBar.jsx';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard.jsx';
import {format} from 'date-fns';

class App extends Component {
  state = {
    activities: [],
    selectedActivity: null,
    editMode: false
  };

  componentDidMount() {
    data.forEach(activity => {
      activity.date = format(activity.date, 'YYYY-MM-DDTHH:mm')
    });
    this.setState(({ activities }) => ({
      activities: data
    }));
  }

  handleActivitySelect = id =>
    this.setState(({ activities }) => ({
      selectedActivity: activities.find(a => a.id === id),
      editMode: false
    }));

  handleCancelSelectActivity = () =>
    this.setState({
      selectedActivity: null
    });

  handleCreateFormOpen = () => {
    this.setState({
      editMode: true,
      selectedActivity: null
    })
  }

  handleCancelFormOpen = () => {
    this.setState({
      editMode: false
    })
  }

  handleActivityCreate = activity => {
    this.setState(({activities}) => ({
      activities: [...activities, activity],
      editMode: false
    }))
  }

  handleActivityEdit = activity => {
    this.setState(({activities})=> ({
      activities: activities.map(a => {
        if (a.id === activity.id) {
          return {...activity}
        } else {
          return a
        }
      }),
      editMode: false,
      selectedActivity: activity
    }))
  }

  handleActivitySelectEdit = id => {
    this.setState(({activities}) => ({
      selectedActivity: activities.find(a => a.id === id),
      editMode: true
    }))
  }

  handleActivityDelete = (id) => {
    this.setState(({activities}) => ({
      activities: activities.filter(a => a.id !== id),
      selectedActivity: null,
      editMode: false
    }))
  }

  getActivitiesByDate(activities) {
    return activities.sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    )
  }

  render() {
    const { activities, selectedActivity, editMode } = this.state;
    const activitiesByDate = this.getActivitiesByDate(activities);
    return (
      <Fragment>
        <NavBar createFormOpen={this.handleCreateFormOpen}/>
        <Container style={{ marginTop: '7em' }}>
          <ActivityDashboard
            activities={activitiesByDate}
            selectActivity={this.handleActivitySelect}
            selectedActivity={selectedActivity}
            cancelSelectedActivity={this.handleCancelSelectActivity}
            editMode={editMode}
            cancelFormOpen={this.handleCancelFormOpen}
            createActivity={this.handleActivityCreate}
            editSelectedActivity={this.handleActivitySelectEdit}
            editActivity={this.handleActivityEdit}
            handleActivityDelete={this.handleActivityDelete}
          />
        </Container>
      </Fragment>
    );
  }
}

export default App;
