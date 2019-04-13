import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Comment, Form, Header, Segment } from 'semantic-ui-react';
import TextAreaInput from '../../../app/forms/inputs/TextAreaInput';
import forms from '../../../app/forms/forms';
import { observer } from 'mobx-react';
import FormSubmitButton from '../../../app/forms/controls/FormSubmitButton';

const form = forms.commentForm;

const ActivityDetailsChat = ({activity}) => (
  <Fragment>
    <Segment
      textAlign='center'
      attached='top'
      inverted
      color='teal'
      style={{ border: 'none' }}
    >
      <Header>Chat about this event</Header>
    </Segment>
    <Segment attached clearing>
      <Comment.Group>
        {activity.comments &&
          activity.comments.map(comment => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.image || '/assets/user.png'} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{comment.createdAt}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.body}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}

        <Form style={{marginTop: 5}}>
            <TextAreaInput field={form.$('body')} rows={2} />
          <FormSubmitButton
            content='Add Reply'
            form={form}
            positive={true}
            floated='right'
            icon='edit'
          />
        </Form>
      </Comment.Group>
    </Segment>
  </Fragment>
);

export default observer(ActivityDetailsChat);
