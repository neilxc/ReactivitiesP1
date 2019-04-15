import React from 'react';
import {Dimmer, Loader} from 'semantic-ui-react';

export default ({inverted, content, style}) => (
  <Dimmer active inverted={inverted} style={style}>
    <Loader content={content} />
  </Dimmer>
);
