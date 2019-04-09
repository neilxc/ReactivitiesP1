import React from 'react';
import {
  Message,
  MessageHeader,
  MessageContent,
  MessageList,
  MessageItem
} from 'semantic-ui-react';

export default ({ error, text }) => (
  <Message error>
    <MessageHeader>{error.statusText}</MessageHeader>
    {text && <MessageContent content={text} />}
    {error.data && Object.keys(error.data.errors).length > 0 && (
      <MessageList>
          {console.log(error.data.errors)}
        {Object.entries(error.data.errors).map((err, i) => (
          <MessageItem key={i}>{err[0]} {err[1]}</MessageItem>
        ))}
      </MessageList>
    )}
  </Message>
);
