import React, { Component } from 'react';
import MobxReactForm from 'mobx-react-form';
import MobxReactFormDevTools from 'mobx-react-form-devtools';
import activityFormSetup from '../../../app/forms/setup/activityFormSetup';
import {
  Form,
  Button,
  Segment,
  Grid,
  GridColumn,
  FormGroup
} from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import TextInput from '../../../app/forms/inputs/TextInput';
import TextAreaInput from '../../../app/forms/inputs/TextAreaInput';
import SelectInput from '../../../app/forms/inputs/SelectInput';
import DateInput from '../../../app/forms/inputs/DateInput';
import FormSubmitButton from '../../../app/forms/controls/FormSubmitButton';

const form = new MobxReactForm(
  { ...activityFormSetup.fields },
  { ...activityFormSetup.hooks }
);

MobxReactFormDevTools.register({ form });

@inject('activityStore')
@observer
class ActivityForm extends Component {
  componentDidMount() {
    const { match, activityStore } = this.props;
    if (Object.keys(match.params).length !== 0) {
      console.log('trying to load activity');
      activityStore.loadActivity(+match.params.id, true).then(activity => {
        activity.time = activity.date;
        form.init({ ...activity });
      });
    } else {
      form.clear();
    }
  }

  componentDidUpdate(oldProps) {
    const { location } = this.props;
    if (location.key !== oldProps.location.key) {
      form.clear();
    }
  }

  render() {
    const {
      activityStore: {
        deleteActivity,
        activity,
        loading,
        targetButton,
        submitting
      },
      history
    } = this.props;
    if (loading)
      return (
        <LoadingComponent inverted={true} content={'Loading activity...'} />
      );
    return (
      <Grid>
        <MobxReactFormDevTools.UI />
        <GridColumn width={10}>
          <Segment clearing>
            <Form autoComplete='off' error={!!form.error}>
              <TextInput field={form.$('title')} />
              <TextAreaInput field={form.$('description')} rows={2} />
              <SelectInput field={form.$('category')} />
              <FormGroup widths='equal'>
                <DateInput field={form.$('date')} date={true} />
                <DateInput field={form.$('time')} time={true} />
              </FormGroup>
              <TextInput field={form.$('city')} />
              <TextInput field={form.$('venue')} />
              {activity && (
                <Button
                  type='button'
                  name='delete'
                  color='red'
                  floated='left'
                  loading={targetButton === 'delete' && submitting}
                  onClick={e => deleteActivity(e, activity.id)}
                >
                  Delete
                </Button>
              )}
              <FormSubmitButton
                form={form}
                floated='right'
                loading={submitting}
                positive={true}
              >
                {form.has('id') ? 'Edit' : 'Create'}
              </FormSubmitButton>

              <Button
                type='button'
                color='grey'
                floated='right'
                onClick={
                  activity
                    ? () => history.push(`/activities/${activity.id}`)
                    : () => history.push(`/activities`)
                }
              >
                Cancel
              </Button>
            </Form>
          </Segment>
        </GridColumn>
      </Grid>
    );
  }
}
export default ActivityForm;
