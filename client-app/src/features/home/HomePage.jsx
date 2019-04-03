import React from 'react';
import { Container, Segment, Header, Image, Button } from 'semantic-ui-react';

export default ({history}) =>
    <Segment inverted textAlign='center' vertical className='masthead' >
        <Container text>
            <Header as='h1' inverted>
                <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
                Reactivities
            </Header>
            <Header as='h2' inverted content='Welcome to Reactivities' />
            <Header as='h3' inverted content='Click below to go to the activities' />
            <Button size='huge' inverted onClick={() => history.push('/activities')}>
                Take me to the activities!
            </Button>
        </Container>
    </Segment>