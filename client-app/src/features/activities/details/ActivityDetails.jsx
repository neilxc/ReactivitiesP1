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
  }

  render() {
    const {
      activityStore: { activity, loading }
    } = this.props;
    if (loading)
      return (
        <LoadingComponent inverted={false} content={'Loading activity...'} />
      );
    return (
      <Grid>
        <GridColumn width={10}>
          <ActivityDetailsHeader activity={activity} />
          <ActivityDetailsInfo activity={activity}/>
          <ActivityDetailsChat />
        </GridColumn>
        <GridColumn width={6}>
          <ActivityDetailsSidebar />
        </GridColumn>
      </Grid>
    );
  }
}

export default ActivityDetails;
