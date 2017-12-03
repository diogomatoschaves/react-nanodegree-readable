/**
 * Created by diogomatoschaves on 30/11/2017.
 */

import React, { Component } from 'react';
import { Modal, TextArea, Form, Button, Header, Feed, Icon, Message } from 'semantic-ui-react';
import { addComment, editComment } from '../actions/actions.js';
import { connect } from 'react-redux';

class CommentModal extends Component {
  
  state = {
    username: '',
    body: '',
    commentModalOpen: false,
    message: ''
  };

  openCommentModal = (username, body) => {
    this.setState(() => ({commentModalOpen: true, username, body, message: ''}))
  };

  closeCommentModal = () => {
    this.setState(() => ({commentModalOpen: false, username: '', body: '', message: ''}))
  };

  updateUsername = (username) => {
    this.setState({ username })
  };
  updateBody = (body) => {
    this.setState({ body })
  };

  submitComment = () => {

    const { username, body } = this.state;
    const { parentId, comment, method, showComments } = this.props;

    if (method === 'Edit') {
      if (!body) {
        const message = <Message negative>
          <Message.Header>The comment text is a required field</Message.Header>
        </Message>;
        this.setState({ message })
      }
      else {
        this.props.editComment({ commentId: comment.id, parentId, body });
        this.setState({commentModalOpen: false, username: '', body: '', message: ''});
      }
    } else if (method === 'Add') {
      if (!body || !username) {
        const message = <Message negative>
          <Message.Header>The username and comment text are both required fields</Message.Header>
        </Message>;
        this.setState({ message })
      } else {
        this.props.addComment({ username, body, parentId });
        showComments();
        this.setState({commentModalOpen: false, username: '', body: '', message: ''});
      }
    }
  };

  render() {

    const { comment, method } = this.props;

    const {  username, body, commentModalOpen, message } = this.state;

    let trigger;

    (method === 'Add') ? (trigger = <Feed.Like as="a" style={{'textDecoration': 'underline'}}
                                              onClick={() => this.openCommentModal('', '')}>+ comment</Feed.Like>)
      : (trigger = <Button className="comment-button" onClick={()=> this.openCommentModal(comment.author, comment.body)} size="tiny">Edit</Button>);

    return (
      <Modal
        trigger={trigger}
        open={commentModalOpen}
        onClose={() => this.closeCommentModal()}
        size='small'
        closeIcon
      >
        <Header as="h3" content={`${method} Comment`}/>
        <Modal.Content>
          {message && (
            message
          )}
          <Form>
            <Form.Group widths='equal'>
              {method === 'Add' ? (
              <Form.Input
                id='form-input-control-username'
                name='username'
                value={username}
                placeholder='Username'
                onChange={(e, {name, value}) => this.setState({ username: value})}
              /> ) : (
              <Form.Input
              id='form-input-control-username'
              name='username'
              value={username}
              placeholder='Username'
              onChange={(e, {name, value}) => this.setState({ username: value})}
              disabled
            />
              )}
            </Form.Group>
            <Form.Field
              id='form-textarea-control-comment'
              control={TextArea}
              name="body"
              value={body}
              placeholder='Text'
              onChange={(e, {name, value}) => this.setState({ body: value})}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={() => this.submitComment()} inverted>
            <Icon name='checkmark'/> Confirm </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
      addComment: ({ username, body, parentId }) => dispatch(addComment({ username, body, parentId })),
      editComment: ({ commentId, parentId, body }) => dispatch(editComment({ commentId, parentId, body }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentModal)

