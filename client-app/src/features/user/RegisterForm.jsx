import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import forms from '../../app/forms/forms';
import { observer, inject } from 'mobx-react';
import TextInput from '../../app/forms/inputs/TextInput';
import FormSubmitButton from '../../app/forms/controls/FormSubmitButton';
import ErrorMessage from '../../app/forms/errors/ErrorMessage';

const form = forms.registerForm;

@inject('userStore')
@observer
class RegisterForm extends Component {
  componentWillMount() {
    form.clear();
  }
  render() {
    const {
      userStore: { loading }
    } = this.props;
    return (
      <Form error>
        <TextInput field={form.$('displayName')} />
        <TextInput field={form.$('username')} />
        <TextInput field={form.$('email')} />
        <TextInput field={form.$('password')} type='password' />
        {form.error && (
          <ErrorMessage
            error={form.error}
          />
        )}
        <FormSubmitButton
          content='Register'
          form={form}
          color={'teal'}
          fluid={true}
          loading={loading}
          type='submit'
        />
      </Form>
    );
  }
}
export default RegisterForm;
