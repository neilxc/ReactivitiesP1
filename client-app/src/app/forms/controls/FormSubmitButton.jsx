import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'semantic-ui-react';

export default observer(
  ({ form, children, onClick, content, loading, positive, floated }) => (
    <Button
      type='button'
      positive={positive}
      loading={form.submitting || loading}
      onClick={onClick || form.onSubmit}
      content={content}
      floated={floated}
      disabled={form.isPristine || form.submitting || form.hasError}
    >
      {children}
    </Button>
  )
);
