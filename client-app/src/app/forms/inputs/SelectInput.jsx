import React from 'react';
import { observer } from 'mobx-react';
import { FormField, Label, Select } from 'semantic-ui-react';

export default observer(({ field, multiple }) => (
  <FormField error={field.blurred && field.hasError}>
    <label>{field.label}</label>
    <Select
      {...field.bind()}
      options={field.extra}
      onChange={(e, data) => field.sync(data.value)}
      multiple={multiple}
    />
    {field.error && (
      <Label pointing color='red'>
        {field.error}
      </Label>
    )}
  </FormField>
));
