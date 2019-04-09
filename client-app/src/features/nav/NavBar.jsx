import React from 'react';
import {
  Menu,
  Button,
  Container,
  Image,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

const NavBar = ({
  createFormOpen,
  userStore: { user, isLoggedIn, logout }
}) => (
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

      {isLoggedIn && (
        <Menu.Item position='right'>
          <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
          <Dropdown pointing='top left' text={user.displayName}>
            <DropdownMenu>
              <DropdownItem
                as={Link}
                to={`/profile/${user.username}`}
                text='My Profile'
                icon='user'
              />
              <DropdownItem onClick={logout} text='Logout' icon='power' />
            </DropdownMenu>
          </Dropdown>
        </Menu.Item>
      )}
    </Container>
  </Menu>
);

export default inject('userStore')(observer(NavBar));
