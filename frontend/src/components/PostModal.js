/**
 * Created by diogomatoschaves on 30/11/2017.
 */

import React, { Component } from 'react';
import { Modal, TextArea, Form, Button, Header, Icon, Message } from 'semantic-ui-react';
import { addPost, editPost } from '../actions/actions.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class PostModal extends Component {
  
  static propTypes = {
    post: PropTypes.object,
    method: PropTypes.string.isRequired
  };
  
  state = {
    postModalOpen: false,
    message: ''
  };

  openPostModal = (username, title, body, category) => {
    this.setState(() => ({postModalOpen: true, username, title, body, category, message: ''}))
  };

  closePostModal = () => {
    this.setState(() => ({postModalOpen: false, username: '', body: '', title: '', category: ''}))
  };

  submitPost = () => {

    const { username, body, title, category } = this.state;
    const { post, method, history } = this.props;

    if (method === 'Edit') {
      if (!body || !title) {
        const message = <Message negative>
          <Message.Header>The title and body are both required fields</Message.Header>
        </Message>;
        this.setState({ message })
      }
      else {
        this.props.editPost({postId: post.id, body, title});
        this.setState({postModalOpen: false, username: '', body: '', title: '', category: '', message: ''});
      }
    } else if (method === 'Add') {
      if (!body || !title || !username || !category) {
        const message = <Message negative>
          <Message.Header>All fields are required</Message.Header>
        </Message>;
        this.setState({ message })
      } else {
        this.props.addPost({username, body, title, category: category.toLowerCase()});
        this.setState({postModalOpen: false, username: '', body: '', title: '', category: '', message: ''});
        history.push('/')
      }
    }
  };

  render() {

    const { post, method } = this.props;

    const {  username, body, title, category, postModalOpen, message } = this.state;

    let trigger;

    (method === 'Add') ? (trigger = <Button color='grey' size="small" className="post-button"
                                            onClick={()=>this.openPostModal('', '', '', '')}>
      Add Post <div style={{'display': 'inline'}}><Icon name='add'/></div></Button>)
      : (trigger = <Button onClick={()=> this.openPostModal(post.author, post.title, post.body, post.category)}
                           size="tiny"
                           className="post-button">Edit</Button>);

    return (
      <Modal
        trigger={trigger}
        open={postModalOpen}
        onClose={() => this.closePostModal()}
        size='small'
        closeIcon
      >
        <Header as="h3" content={`${method} Post`} />
        <Modal.Content>
          {message && (
            message
          )}
          <Form>
            {method === 'Add' ? (
              <Form.Group widths='equal'>
                <Form.Input
                  id='form-input-control-username'
                  name='username'
                  value={username}
                  placeholder='Username'
                  onChange={(e, {name, value}) => this.setState({username: value})}
                />
                <Form.Input
                  id='form-input-control-category'
                  name='category'
                  value={category}
                  placeholder='Category'
                  onChange={(e, {name, value}) => this.setState({category: value})}
                />
                </Form.Group>
                ) : (
                <Form.Group widths='equal'>
                  <Form.Input
                    disabled
                    id='form-input-control-username'
                    name='username'
                    value={username}
                    placeholder='Username'
                    onChange={(e, {name, value}) => this.setState({username: value})}
                  />
                  <Form.Input
                    disabled
                    id='form-input-control-category'
                    name='category'
                    value={category}
                    placeholder='Category'
                    onChange={(e, {name, value}) => this.setState({category: value})}
                  />
                </Form.Group>
            )}
            <Form.Group widths='equal'>
              <Form.Input
                id='form-input-control-title'
                name='title'
                value={title}
                placeholder='Title'
                onChange={(e, {name, value}) => this.setState({title: value})}
              />
            </Form.Group>
            <Form.Field
              id='form-textarea-control-post'
              control={TextArea}
              name="post"
              value={body}
              placeholder='Text'
              onChange={(e, {name, value}) => this.setState({body: value})}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={() => this.submitPost()} inverted>
            <Icon name='checkmark' /> Confirm
          </Button>
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
      addPost: ({ username, body, title, category }) => dispatch(addPost({ username, body, title, category})),
      editPost: ({ postId, body, title }) => dispatch(editPost({ postId, body, title }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostModal)

