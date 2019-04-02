import React from 'react';
import { Menu, Button, Container } from 'semantic-ui-react';

const NavBar = ({createFormOpen}) => (
  <Menu fixed='top' inverted>
    <Container>
      <Menu.Item header>
        <img src='/assets/logo.png' alt='logo' style={{ marginRight: 20 }} />
        Reactivities
      </Menu.Item>
      <Menu.Item name='Activities' />
      <Menu.Item>
        <Button positive content='Create Activity' onClick={createFormOpen}/>
      </Menu.Item>
    </Container>
  </Menu>
);

export default NavBar;