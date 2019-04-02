import React from 'react';
import {Dimmer, Loader} from 'semantic-ui-react';

export default ({inverted, content}) => (
  <Dimmer active inverted={inverted}>
    <Loader content={content} />
  </Dimmer>
);
