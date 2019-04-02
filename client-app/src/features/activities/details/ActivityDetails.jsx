import React from 'react';
import { Card, Image, ButtonGroup, Button } from 'semantic-ui-react';

export default ({
  selectedActivity: activity,
  cancelSelectedActivity,
  editSelectedActivity
}) => (
  <Card fluid>
    <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
    <Card.Content>
      <Card.Header>{activity.title}</Card.Header>
      <Card.Meta>
        <span className='date'>{activity.date}</span>
      </Card.Meta>
      <Card.Description>{activity.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <ButtonGroup widths={2}>
        <Button basic color='blue' onClick={() => editSelectedActivity(activity.id)}>
          Edit
        </Button>
        <Button basic color='grey' onClick={cancelSelectedActivity}>
          Cancel
        </Button>
      </ButtonGroup>
    </Card.Content>
  </Card>
);
