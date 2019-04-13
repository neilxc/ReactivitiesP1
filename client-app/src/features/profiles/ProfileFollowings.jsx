import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import {
  TabPane,
  Header,
  CardGroup,
  Card,
  Image,
  CardContent,
  CardHeader
} from 'semantic-ui-react';
import TabHeader from './tabs/TabHeader';
import TabContent from './tabs/TabContent';

export default inject('profileStore')(
  observer(
    ({
      profileStore: { profile, activeTab, followings, loadingFollowings }
    }) => (
      <TabPane loading={loadingFollowings}>
        <TabHeader>
          <Header
            floated='left'
            icon='users'
            content={
              activeTab === 3
                ? `People following ${profile.displayName}`
                : `People ${profile.displayName} is following`
            }
          />
        </TabHeader>
        <TabContent>
          <CardGroup itemsPerRow={4}>
            {followings.map(profile => (
              <Card key={profile.username} as={Link} to={`/profiles/${profile.username}`}>
                <Image
                  src={profile.image || '/assets/user.png'}
                  size='medium'
                />
                <CardContent>
                  <CardHeader>
                    {profile.displayName}
                  </CardHeader>
                </CardContent>
              </Card>
            ))}
          </CardGroup>
        </TabContent>
      </TabPane>
    )
  )
);
