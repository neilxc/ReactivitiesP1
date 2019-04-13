import React, { Component } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityDetailsHeader from './ActivityDetailedHeader';
import ActivityDetailsInfo from './ActivityDetailsInfo';
import ActivityDetailsChat from './ActivityDetailsChat';
import ActivityDetailsSidebar from './ActivityDetailsSidebar';

@inject('activityStore')
@observer
class ActivityDetails extends Component {
  componentWillMount() {
    const { activityStore, match } = this.props;
    activityStore.loadActivity(+match.params.id, true);
    activityStore.createHubConnection();
  }

  componentWillUnmount() {
    this.props.activityStore.stopHubConnection();
  }

  render() {
    const {
      activityStore: { activity, loading, loadingInitial, attendActivity, cancelAttendance }
    } = this.props;
    if (loadingInitial)
      return (
        <LoadingComponent inverted={false} content={'Loading activity...'} />
      );
    return (
      <Grid>
        <GridColumn width={10}>
          <ActivityDetailsHeader
            activity={activity}
            attendActivity={attendActivity}
            cancelAttendance={cancelAttendance}
            loading={loading}
          />
          <ActivityDetailsInfo activity={activity} />
          <ActivityDetailsChat activity={activity} />
        </GridColumn>
        <GridColumn width={6}>
          <ActivityDetailsSidebar attendees={activity.attendees} />
        </GridColumn>
      </Grid>
    );
  }
}

export default ActivityDetails;
