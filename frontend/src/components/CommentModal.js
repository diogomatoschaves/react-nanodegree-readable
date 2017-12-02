/**
 * Created by diogomatoschaves on 30/11/2017.
 */

import React, { Component } from 'react';
import { Modal, TextArea, Form, Button, Header, Feed, Icon } from 'semantic-ui-react';
import { addComment, editComment } from '../actions/actions.js';
import { connect } from 'react-redux';

class CommentModal extends Component {
  
  state = {
    username: '',
    body: '',
    commentModalOpen: false
  };

  openCommentModal = (username, body) => {
    this.setState(() => ({commentModalOpen: true, username, body}))
  };

  closeCommentModal = () => {
    this.setState(() => ({commentModalOpen: false, username: '', text: ''}))
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

    this.setState({commentModalOpen: false, username: '', body: ''});

    if (method === 'Add') {
      this.props.addComment({ username, body, parentId }),
      showComments()
    } else if (method === 'Edit') {
      this.props.editComment({ commentId: comment.id, parentId, body })
    }
  };

  render() {

    const { comment, method } = this.props;

    const {  username, body, commentModalOpen } = this.state;

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
      editComment: (commentId, parentId, body) => dispatch(editComment(commentId, parentId, body))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentModal)

