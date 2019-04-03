import React, { Component } from 'react';
import {
  Form,
  FormInput,
  FormTextArea,
  Button,
  Segment,
  FormSelect
} from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const categories = [
  { key: 'drinks', text: 'Drinks', value: 'Drinks' },
  { key: 'culture', text: 'Culture', value: 'Culture' },
  { key: 'film', text: 'Film', value: 'Film' },
  { key: 'food', text: 'Food', value: 'Food' },
  { key: 'music', text: 'Music', value: 'Music' },
  { key: 'travel', text: 'Travel', value: 'Travel' }
];

@inject('activityStore')
@observer
class ActivityForm extends Component {
  state = {};

  initializeState() {
    return {
      title: '',
      description: '',
      category: '',
      date: '',
      city: '',
      venue: ''
    }
  }

  componentWillMount() {
    this.setState(this.initializeState())
  }

  componentDidMount() {
    const { match, activityStore } = this.props;
    if (Object.keys(match.params).length !== 0) {
      activityStore.loadActivity(+match.params.id, true).then(activity => {
        this.setState({ ...activityStore.activity });
      });
    }
  }

  componentDidUpdate(oldProps) {
    const {location} = this.props;
    if (location.key !== oldProps.location.key) {
      this.setState(this.initializeState());
    }
  }

  handleChange = name => ({ target: { value } }) =>
    this.setState({ [name]: value });

  handleSelectChange = (e, data) => {
    this.setState({
      category: data.value
    });
  };

  handleSubmit = () => {
    const {
      activityStore: { createActivity, editActivity, activity }
    } = this.props;
    if (!activity) {
      createActivity({ ...this.state });
    } else {
      editActivity({ ...this.state });
    }
  };

  render() {
    const {
      activityStore: {
        cancelFormOpen,
        deleteActivity,
        activity,
        loading,
        targetButton
      }
    } = this.props;
    const { title, description, category, date, city, venue } = this.state;
    if (loading) return <LoadingComponent inverted={true} content={'Loading activity...'} />
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
              name='delete'
              color='red'
              floated='left'
              loading={targetButton === 'delete' && loading}
              onClick={e => deleteActivity(e, activity.id)}
            >
              Delete
            </Button>
          )}
          <Button
            type='button'
            positive
            floated='right'
            loading={!targetButton && loading}
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
