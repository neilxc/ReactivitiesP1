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
  Icon
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default observer(({ activity }) => (
  <SegmentGroup>
    <Segment>
      <ItemGroup>
        <Item>
          <ItemImage size='tiny' circular src={'/assets/user.png'} />
          <ItemContent>
            <ItemHeader as={Link} to={`/activities/${activity.id}`}>
              {activity.title}
            </ItemHeader>
            <ItemDescription>Hosted by Bob</ItemDescription>
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
    <Segment secondary>Attendees go here</Segment>
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
