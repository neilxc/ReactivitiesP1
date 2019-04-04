import React from 'react';
import { Header, Container, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const NotFound = () => (
  <Container style={{ marginTop: 40 }} textAlign='center'>
    <Segment>
      <Header as='h1' content='This page does not exist' />
      <Button basic as={Link} to={'/activities'} size='large'>
        Click here to go back to activities
      </Button>
    </Segment>
  </Container>
);
