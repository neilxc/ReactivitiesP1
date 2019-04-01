import React from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';

export default ({ activities, selectActivity }) => (
  <Segment>
    <Item.Group divided>
      {activities.map(activity => (
        <Item key={activity.id}>
          <Item.Content>
            <Item.Header as='a'>{activity.title}</Item.Header>
            <Item.Meta>{activity.date}</Item.Meta>
            <Item.Description>
              <div>{activity.description}</div>
              <div>
                {activity.city} - {activity.venue}
              </div>
            </Item.Description>
            <Item.Extra>
              <Button
                floated='right'
                content='View'
                color='blue'
                onClick={() => selectActivity(activity.id)}
              />
              <Label basic>{activity.category}</Label>
            </Item.Extra>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  </Segment>
);
