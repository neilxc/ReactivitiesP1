import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { inject, observer } from 'mobx-react';

export default inject('activityStore')(
  observer(({ activityStore: { activity, editMode } }) => (
    <Grid>
      <GridColumn width={10}>
        <ActivityList />
      </GridColumn>
      <GridColumn width={6}>
        {activity && !editMode && <ActivityDetails />}
        {editMode && <ActivityForm key={activity ? activity.id : 0} />}
      </GridColumn>
    </Grid>
  ))
);
