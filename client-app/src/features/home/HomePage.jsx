import React, { Fragment } from 'react';
import { Container, Segment, Header, Image, Button } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';

export default inject('userStore', 'modalStore')(
  observer(({ history, userStore: { isLoggedIn, user }, modalStore: {openModal} }) => (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/logo.png'
            alt='logo'
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>

        {isLoggedIn ? (
          <Fragment>
            <Header
              as='h2'
              inverted
              content={`Welcome back ${user.displayName}`}
            />
            <Header
              as='h3'
              inverted
              content='Click below to go to the activities'
            />
            <Button
              size='huge'
              inverted
              onClick={() => history.push('/activities')}
            >
              Go to activities!
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header
              as='h3'
              inverted
              content='Click below to go to login'
            />
            <Button size='huge' inverted onClick={() => openModal({
              component: <LoginForm />,
              header: 'Sign in!'
            })}>
              Login!
            </Button>
            <Button size='huge' inverted onClick={() => openModal({
              component: <RegisterForm />,
              header: 'Register!'
            })}>
              Register!
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  ))
);
