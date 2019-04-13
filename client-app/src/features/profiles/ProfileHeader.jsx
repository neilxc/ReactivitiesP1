import React from 'react';
import { Item, Header, Segment, Button, ItemGroup } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';

export default inject('profileStore')(
  observer(
    ({ profileStore: {profile, isCurrentUser, follow, unfollow, loading }}) => (
      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image
              avatar
              size='small'
              src={profile.image || '/assets/user.png'}
            />
            <Item.Content verticalAlign='middle'>
              <Header as='h1'>{profile.displayName}</Header>
              {!isCurrentUser && (
                <Item.Extra>
                  <Button
                    basic
                    content={profile.following ? 'Unfollow' : 'Follow'}
                    color={'teal'}
                    loading={loading}
                    onClick={
                      profile.following
                        ? () => unfollow(profile.username)
                        : () => follow(profile.username)
                    }
                  />
                </Item.Extra>
              )}
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment>
    )
  )
);
