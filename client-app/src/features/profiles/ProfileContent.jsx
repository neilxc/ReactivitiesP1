import React from 'react';
import { Tab } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';
import ProfilePhotos from './ProfilePhotos';
import ProfileAbout from './ProfileAbout';
import ProfileFollowings from './ProfileFollowings';
import ProfileEvents from './ProfileEvents';

const panes = [
  { menuItem: 'About', render: () => <ProfileAbout /> },
  { menuItem: 'Photos', render: () => <ProfilePhotos /> },
  { menuItem: 'Events', render: () => <ProfileEvents /> },
  { menuItem: 'Followers', render: () => <ProfileFollowings /> },
  { menuItem: 'Following', render: () => <ProfileFollowings />}
];

export default inject('profileStore')(observer(({profileStore: {setActiveTab}}) => (
  <Tab
    menu={{ fluid: true, vertical: true }}
    menuPosition='right'
    panes={panes}
    onTabChange={(e, data) => setActiveTab(e, data)}
  />
)));
