import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import forms from '../../app/forms/forms';
import TextInput from '../../app/forms/inputs/TextInput';
import TextAreaInput from '../../app/forms/inputs/TextAreaInput';
import FormSubmitButton from '../../app/forms/controls/FormSubmitButton';
import { inject, observer } from 'mobx-react';

const form = forms.profileForm;

@inject('profileStore')
@observer
class ProfileEditForm extends Component {
  componentDidMount() {
    const {
      profileStore: { profile }
    } = this.props;
    form.init({displayName: profile.displayName, bio: profile.bio})
  }
  render() {
      const {profileStore: {toggleEditProfileMode, updatingProfile}} = this.props;
    return (
      <Form>
        <TextInput field={form.$('displayName')} />
        <TextAreaInput field={form.$('bio')} rows={4} />
        <FormSubmitButton
          form={form}
          content='Update Profile'
          floated='right'
          positive={true}
          loading={updatingProfile}
        />
        <Button floated='right' content='Cancel' onClick={toggleEditProfileMode}/>
      </Form>
    );
  }
}

export default ProfileEditForm;
