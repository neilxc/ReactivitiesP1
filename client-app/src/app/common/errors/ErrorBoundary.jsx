import React, { Component } from 'react';
import { Container, Segment, Header, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

@withRouter
class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    info: null
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error: error,
      info: info
    });
  }

  render() {
    const { history } = this.props;
    if (this.state.hasError) {
      return (
        <Container style={{ marginTop: '7em' }} textAlign='center'>
          <Segment>
            <Header as='h1' content='Oops, we have a problem' />
            <p>The error: {this.state.error.toString()}</p>
            <Button
              basic
              size='large'
              onClick={() => history.goBack()}
            >
              Click to go back
            </Button>
          </Segment>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
