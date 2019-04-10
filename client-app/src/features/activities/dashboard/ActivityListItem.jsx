import React from 'react';
import { observer } from 'mobx-react';
import {
  Item,
  Button,
  SegmentGroup,
  Segment,
  ItemGroup,
  ItemImage,
  ItemContent,
  ItemHeader,
  ItemDescription,
  Icon,
  Label
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ActivityListItemAttendees from './ActivityListItemAttendees';

export default observer(({ activity }) => (
  <SegmentGroup>
    <Segment>
      <ItemGroup>
        <Item>
          <ItemImage
            size='tiny'
            circular
            src={'/assets/user.png'}
            style={{ marginBottom: 3 }}
          />
          <ItemContent>
            <ItemHeader as={Link} to={`/activities/${activity.id}`}>
              {activity.title}
            </ItemHeader>
            <ItemDescription>
              Hosted by {activity.host && activity.host.displayName}
            </ItemDescription>
            {activity.isHost && (
              <ItemDescription>
                <Label basic color='orange'>
                  You are hosting this activity
                </Label>
              </ItemDescription>
            )}
            {activity.isGoing && !activity.isHost && (
              <ItemDescription>
                <Label basic color='green'>
                  You are going to this activity
                </Label>
              </ItemDescription>
            )}
          </ItemContent>
        </Item>
      </ItemGroup>
    </Segment>
    <Segment>
      <span>
        <Icon name='clock' /> {format(activity.date, 'h:mm a')}
        <Icon name='marker' /> {activity.venue}, {activity.city}
      </span>
    </Segment>
    <Segment secondary>
      <ActivityListItemAttendees attendees={activity.attendees} />
    </Segment>
    <Segment clearing>
      <span>{activity.description}</span>
      <Button
        as={Link}
        to={`/activities/${activity.id}`}
        color='teal'
        floated='right'
        content='View'
      />
    </Segment>
  </SegmentGroup>
));
