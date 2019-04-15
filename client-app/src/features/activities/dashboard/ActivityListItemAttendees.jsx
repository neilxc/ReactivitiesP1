import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { List, ListItem, Image } from 'semantic-ui-react';

const styles = {
  borderColor: 'orange',
  borderWidth: 2
};

export default observer(({ attendees }) => (
  <List horizontal>
    {attendees.map(attendee => (
      <ListItem
        key={attendee.username}
        as={Link}
        to={`/profiles/${attendee.username}`}
      >
        <Image
          size='mini'
          circular
          src={attendee.image || '/assets/user.png'}
          bordered
          style={attendee.following ? styles : null}
        />
      </ListItem>
    ))}
  </List>
));
