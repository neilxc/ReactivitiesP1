import React, { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import ActivityListItem from './ActivityListItem';
import { format } from 'date-fns';

export default inject('activityStore')(
  observer(({ activityStore: { activitiesByDate: activities } }) => (
    <Fragment>
      {activities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color={'teal'}>
            {format(group, 'dddd Do MMMM')}
          </Header>
          {activities.map(activity => (
            <ActivityListItem key={activity.id} activity={activity} />
          ))}
        </Fragment>
      ))}
    </Fragment>
  ))
);
