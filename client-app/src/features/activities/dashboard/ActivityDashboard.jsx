import React, { Component } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { inject, observer } from 'mobx-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';

@inject('activityStore')
@observer
class ActivityDashboard extends Component {
  componentDidMount() {
    this.props.activityStore.loadActivities();
  }

  render() {
    const {
      activityStore: { loadingInitial }
    } = this.props;
    if (loadingInitial)
      return (
        <LoadingComponent inverted={true} content='Loading Activities...' />
      );
    return (
      <Grid>
        <GridColumn width={10}>
          <ActivityList />
        </GridColumn>
        <GridColumn width={6}>Filters go here</GridColumn>
      </Grid>
    );
  }
}

export default ActivityDashboard;
