import React from 'react';
import { observer } from 'mobx-react';
import { FormField, Label } from 'semantic-ui-react';
import { DateTimePicker } from 'react-widgets';

export default observer(({ field, date = false, time = false }) => (
  <FormField error={field.blurred && field.hasError}>
    <label>{field.label}</label>
    <DateTimePicker
      onChange={field.sync}
      placeholder={field.placeholder}
      value={field.value || null}
      date={date}
      time={time}
      onFocus={() => field.onFocus()}
      onBlur={() => field.onBlur()}
    />
    {field.error && (
      <Label pointing color='red'>
        {field.error}
      </Label>
    )}
  </FormField>
));
