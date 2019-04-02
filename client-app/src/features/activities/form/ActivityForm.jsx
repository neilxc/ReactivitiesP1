import React, { Component } from 'react';
import {
  Form,
  FormInput,
  FormTextArea,
  Button,
  Segment,
  FormSelect
} from 'semantic-ui-react';

const categories = [
  { key: 'drinks', text: 'Drinks', value: 'Drinks' },
  { key: 'culture', text: 'Culture', value: 'Culture' },
  { key: 'film', text: 'Film', value: 'Film' },
  { key: 'food', text: 'Food', value: 'Food' },
  { key: 'music', text: 'Music', value: 'Music' },
  { key: 'travel', text: 'Travel', value: 'Travel' }
];

class ActivityForm extends Component {
  state = this.getInitialState();

  getInitialState() {
    const { activity } = this.props;

    return activity
      ? activity
      : {
          title: '',
          description: '',
          category: '',
          date: '',
          city: '',
          venue: ''
        };
  }

  handleChange = name => ({ target: { value } }) =>
    this.setState({ [name]: value });

  handleSelectChange = (e, data) => {
    this.setState({
      category: data.value
    });
  };

  handleSubmit = () => {
    const { createActivity, editActivity, activity } = this.props;
    if (!activity) {
      createActivity({
        id: this.state.title,
        ...this.state
      });
    } else {
      editActivity({ ...this.state });
    }
  };

  render() {
    const { cancelFormOpen, activity, handleActivityDelete } = this.props;
    const { title, description, category, date, city, venue } = this.state;
    return (
      <Segment clearing>
        <Form autoComplete='off'>
          <FormInput
            name='title'
            label='Title'
            placeholder='Title'
            value={title}
            onChange={this.handleChange('title')}
          />
          <FormTextArea
            name='description'
            rows={2}
            label='Description'
            placeholder='Description'
            value={description}
            onChange={this.handleChange('description')}
          />
          <FormSelect
            name='category'
            label='Category'
            placeholder='Category'
            options={categories}
            value={category}
            onChange={(e, data) => this.handleSelectChange(e, data)}
          />
          <FormInput
            name='date'
            type='datetime-local'
            label='Date'
            placeholder='Date'
            value={date}
            onChange={this.handleChange('date')}
          />
          <FormInput
            name='city'
            label='City'
            placeholder='City'
            value={city}
            onChange={this.handleChange('city')}
          />
          <FormInput
            name='venue'
            label='Venue'
            placeholder='Venue'
            value={venue}
            onChange={this.handleChange('venue')}
          />
          {activity && (
            <Button
              type='button'
              color='red'
              floated='left'
              onClick={() => handleActivityDelete(activity.id)}
            >
              Delete
            </Button>
          )}
          <Button
            type='button'
            positive
            floated='right'
            onClick={this.handleSubmit}
          >
            {activity ? 'Edit' : 'Create'}
          </Button>

          <Button
            type='button'
            color='grey'
            floated='right'
            onClick={cancelFormOpen}
          >
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}
export default ActivityForm;
