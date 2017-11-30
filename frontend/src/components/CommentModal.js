/**
 * Created by diogomatoschaves on 30/11/2017.
 */

import React from 'react'
import { Modal, TextArea, Form, Button, Header, Feed, Icon } from 'semantic-ui-react'

const CommentModal = (props) => {
  
  const { openCommentModal, closeCommentModal, commentModalOpen,
    updateText, updateUsername, addComment, username, text } = props;
   
  return (
    <Modal
      trigger={<Feed.Like as="a" style={{'textDecoration': 'underline'}} onClick={() => openCommentModal()}>+ comment</Feed.Like>}
      open={commentModalOpen}
      onClose={() => closeCommentModal()}
      size='small'
      closeIcon
    >
      <Header as="h3" content='Add Comment' />
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
            name="text"
            value={text}
            placeholder='Text'
            onChange={(e, {name, value}) => updateText(value)}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button primary onClick={() => addComment()} inverted>
          <Icon name='checkmark' /> Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  )
};

export default CommentModal

