import React from 'react';
import { Menu, Button, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ createFormOpen }) => (
  <Menu fixed='top' inverted>
    <Container>
      <Menu.Item header as={NavLink} exact to='/'>
        <img src='/assets/logo.png' alt='logo' style={{ marginRight: 20 }} />
        Reactivities
      </Menu.Item>
      <Menu.Item name='Activities' as={NavLink} to='/activities' />
      <Menu.Item>
        <Button
          as={NavLink}
          to='/createActivity'
          positive
          content='Create Activity'
          onClick={createFormOpen}
        />
      </Menu.Item>
    </Container>
  </Menu>
);

export default NavBar;
