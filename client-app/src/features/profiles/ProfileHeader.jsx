import React from 'react';
import { Item, Header, Segment, Button, ItemGroup } from 'semantic-ui-react';
import { observer } from 'mobx-react';

export default observer(({profile}) => (
  <Segment>
    <ItemGroup>
      <Item>
        <Item.Image avatar size='small' src={profile.image || '/assets/user.png'} />
        <Item.Content verticalAlign='middle'>
          <Header as='h1'>{profile.displayName}</Header>
          <Item.Extra>
            <Button basic content={'Follow'} color={'teal'} />
          </Item.Extra>
        </Item.Content>
      </Item>
    </ItemGroup>
  </Segment>
));
