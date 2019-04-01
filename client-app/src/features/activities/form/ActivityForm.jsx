import React from 'react';
import {
  Form,
  FormInput,
  FormTextArea,
  Button,
  Segment
} from 'semantic-ui-react';

export default props => (
  <Segment clearing>
    <Form>
      <FormInput label='Title' placeholder='Title' />
      <FormTextArea rows={2} label='Description' placeholder='Description' />
      <FormInput label='Category' placeholder='Category' />
      <FormInput label='Date' placeholder='Date' />
      <FormInput label='City' placeholder='City' />
      <FormInput label='Venue' placeholder='Venue' />
      <Button positive floated='right'>Submit</Button>
    </Form>
  </Segment>
);
