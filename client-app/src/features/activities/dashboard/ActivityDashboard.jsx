import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

export default ({
  activities,
  selectActivity,
  selectedActivity,
  cancelSelectedActivity,
  editMode
}) => (
  <Grid>
    <GridColumn width={10}>
      <ActivityList activities={activities} selectActivity={selectActivity} />
    </GridColumn>
    <GridColumn width={6}>
      {selectedActivity && (
        <ActivityDetails
          selectedActivity={selectedActivity}
          cancelSelectedActivity={cancelSelectedActivity}
        />
      )}
      {editMode &&
      <ActivityForm />}
    </GridColumn>
  </Grid>
);
