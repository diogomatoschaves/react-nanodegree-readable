/**
 * Created by diogomatoschaves on 30/11/2017.
 */

import React from 'react'
import { Modal, TextArea, Form, Button, Header, Feed, Icon } from 'semantic-ui-react'

const CommentModal = (props) => {
  
  const { closeCommentModal, commentModalOpen, commentId, parentId, title,
    updateBody, updateUsername, submitComment, trigger } = props;
  
  let { username, body } = props;
   
  return (
    <Modal
      trigger={trigger}
      open={commentModalOpen}
      onClose={() => closeCommentModal()}
      size='small'
      closeIcon
    >
      <Header as="h3" content={title} />
      <Modal.Content>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input
              id='form-input-control-username'
              name='username'
              value={username}
              placeholder='Username'
              onChange={(e, {name, value}) => updateUsername(value)}
            />
          </Form.Group>
          <Form.Field
            id='form-textarea-control-comment'
            control={TextArea}
            name="body"
            value={body}
            placeholder='Text'
            onChange={(e, {name, value}) => updateBody(value)}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        {(commentId && parentId) ? (
          <Button primary onClick={() => submitComment({method: 'edit', commentId, parentId})} inverted>
          <Icon name='checkmark' /> Confirm </Button>
        ) : (
        <Button primary onClick={() => submitComment({method: 'add'})} inverted>
          <Icon name='checkmark' /> Confirm
        </Button>
        )}
      </Modal.Actions>
    </Modal>
  )
};

export default CommentModal

