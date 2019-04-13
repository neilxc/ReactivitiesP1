import React from 'react';
import { inject, observer } from 'mobx-react';
import { TabPane, Header, Button } from 'semantic-ui-react';
import TabHeader from './tabs/TabHeader';
import TabContent from './tabs/TabContent';
import ProfileEditForm from './ProfileEditForm';

export default inject('profileStore')(
  observer(
    ({
      profileStore: {
        profile,
        isCurrentUser,
        editProfileMode,
        toggleEditProfileMode
      }
    }) => (
      <TabPane>
        <TabHeader>
          <Header
            floated='left'
            icon='user'
            content={`About ${profile.displayName}`}
          />
          {isCurrentUser && (
            <Button
              floated='right'
              basic
              content='Edit'
              onClick={toggleEditProfileMode}
            />
          )}
        </TabHeader>
        <TabContent>
          {editProfileMode ? <ProfileEditForm /> : <span>{profile.bio}</span>}
        </TabContent>
      </TabPane>
    )
  )
);
