import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar.jsx';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard.jsx';
import { format } from 'date-fns';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent.jsx';

class App extends Component {
  state = {
    activities: [],
    selectedActivity: null,
    editMode: false,
    loading: false,
    targetButton: null
  };

  componentDidMount() {
    this.setState({ loading: true });
    agent.Activities.list()
      .then(activities => {
        activities.forEach(activity => {
          activity.date = format(activity.date, 'YYYY-MM-DDTHH:mm');
        });
        this.setState({ activities });
      })
      .finally(() => this.setState({ loading: false }));
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
    });
  };

  handleCancelFormOpen = () => {
    this.setState({
      editMode: false
    });
  };

  handleActivityCreate = activity => {
    this.setState({ loading: true });
    agent.Activities.create(activity)
      .then(createdActivity => {
        this.setState(({ activities }) => ({
          activities: [...activities, createdActivity],
          editMode: false
        }));
      })
      .finally(() => this.setState({ loading: false }));
  };

  handleActivityEdit = activity => {
    this.setState({loading: true});
    agent.Activities.update(activity)
      .then(updatedActivity => {
        this.setState(({ activities }) => ({
          activities: activities.map(a => {
            if (a.id === updatedActivity.id) {
              return { ...updatedActivity };
            } else {
              return a;
            }
          }),
          editMode: false,
          selectedActivity: activity
        }));
      }).finally(() => this.setState({loading: false}))

  };

  handleActivitySelectEdit = id => {
    this.setState(({ activities }) => ({
      selectedActivity: activities.find(a => a.id === id),
      editMode: true
    }));
  };

  handleActivityDelete = (e, id) => {
    this.setState({loading: true, targetButton: e.target.name});
    agent.Activities.delete(id)
      .then(() => {
        this.setState(({ activities }) => ({
          activities: activities.filter(a => a.id !== id),
          selectedActivity: null,
          editMode: false
        }));
      }).finally(() => this.setState({loading: false, targetButton: null}))
  };

  getActivitiesByDate(activities) {
    return activities.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  render() {
    const { activities, selectedActivity, editMode, loading, targetButton } = this.state;
    const activitiesByDate = this.getActivitiesByDate(activities);
    if (loading && activities.length === 0)
      return (
        <LoadingComponent inverted={true} content='Loading Activities...' />
      );
    return (
      <Fragment>
        <NavBar createFormOpen={this.handleCreateFormOpen} />
        <Container style={{ marginTop: '7em' }}>
          <ActivityDashboard
            loading={loading}
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
            targetButton={targetButton}
          />
        </Container>
      </Fragment>
    );
  }
}

export default App;
