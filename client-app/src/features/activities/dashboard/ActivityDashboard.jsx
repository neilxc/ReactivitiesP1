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
  editMode,
  cancelFormOpen,
  createActivity,
  editSelectedActivity,
  editActivity,
  handleActivityDelete
}) => (
  <Grid>
    <GridColumn width={10}>
      <ActivityList activities={activities} selectActivity={selectActivity} />
    </GridColumn>
    <GridColumn width={6}>
      {selectedActivity && !editMode && (
        <ActivityDetails
          selectedActivity={selectedActivity}
          cancelSelectedActivity={cancelSelectedActivity}
          editSelectedActivity={editSelectedActivity}
        />
      )}
      {editMode && (
        <ActivityForm
          cancelFormOpen={cancelFormOpen}
          createActivity={createActivity}
          editActivity={editActivity}
          activity={selectedActivity}
          handleActivityDelete={handleActivityDelete}
          key={selectedActivity ? selectedActivity.id : 0}
        />
      )}
    </GridColumn>
  </Grid>
);