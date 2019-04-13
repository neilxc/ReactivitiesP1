import React from 'react';
import { Tab } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import ProfilePhotos from './ProfilePhotos';
import ProfileAbout from './ProfileAbout';

const panes = [
  { menuItem: 'About', render: () => <ProfileAbout /> },
  { menuItem: 'Photos', render: () => <ProfilePhotos /> },
  { menuItem: 'Events', render: () => <Tab.Pane>Events Content</Tab.Pane> },
  { menuItem: 'Followers', render: () => <Tab.Pane>Followers Content</Tab.Pane> },
  { menuItem: 'Following', render: () => <Tab.Pane>Following Content</Tab.Pane> }
];

export default observer(() => (
  <Tab
    menu={{ fluid: true, vertical: true }}
    menuPosition='right'
    panes={panes}
  />
));
