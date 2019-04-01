import React, { Component, Fragment } from 'react';
import { Header, List, ListItem } from 'semantic-ui-react';
import axios from 'axios';

class App extends Component {
  state = {
    values: []
  };

  componentDidMount() {
    axios
      .get('https://localhost:5001/api/values')
      .then(response => {
        this.setState({ values: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { values } = this.state;
    return (
      <Fragment>
        <Header as={'h1'} content={'Reactivities'} />
        <List>
          {values.map(value => (
            <ListItem key={value.id}>
              ID: {value.id}, Name: {value.name}
            </ListItem>
          ))}
        </List>
      </Fragment>
    );
  }
}

export default App;
