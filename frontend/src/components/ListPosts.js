/**
 * Created by diogomatoschaves on 29/11/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from './Post.js'
import { Grid, Header, Segment, Button, Icon, Modal, Form, TextArea } from 'semantic-ui-react'


class ListPosts extends Component {
  
  static propTypes = {
    posts: PropTypes.array.isRequired
  };

  state = {
    postModalOpen: false,
    username: '',
    post: '',
    title: '',
    category: ''
  };

  

  addPost = () => {

    this.setState(() => ({postModalOpen: false}));

    const { username, title, post, category } = this.state;

    this.setState({username: '', title: '', post: '', category: ''})

  };
  
  render () {
    
    const { posts, comments } = this.props;
    const { username, post, title, postModalOpen, category } = this.state;

    return (
      <div>
       <Segment>
         <Grid columns={3} divided stackable>
           <Grid.Row>
            <Grid.Column width={3} verticalAlign='middle' textAlign='center'>
              <Header as='h3'>Category</Header>
            </Grid.Column>
            <Grid.Column width={9} verticalAlign='middle'>
              <Header as='h3'>Posts</Header>
            </Grid.Column>
             <Grid.Column width={4} textAlign='right'>
               <Modal
                  trigger={<Button fluid color='grey' size="small" onClick={()=>this.setState({postModalOpen: true})}><Icon name='add'/>Add Post</Button>}
                  open={postModalOpen}
                  onClose={() => this.setState({postModalOpen: false})}
                  size='small'
                  closeIcon
                >
                  <Header as="h3" content='Add Post' />
                  <Modal.Content>
                    <Form>
                      <Form.Group widths='equal'>
                        <Form.Input
                          id='form-input-control-title'
                          name='title'
                          value={title}
                          placeholder='Title'
                          onChange={(e, {name, value}) => this.setState({title: value})}
                        />
                      </Form.Group>
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
                      <Form.Field
                        id='form-textarea-control-post'
                        control={TextArea}
                        name="post"
                        value={post}
                        placeholder='Text'
                        onChange={(e, {name, value}) => this.setState({post: value})}
                      />
                    </Form>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button primary onClick={() => this.addPost()} inverted>
                      <Icon name='checkmark' /> Confirm
                    </Button>
                  </Modal.Actions>
                </Modal>
            </Grid.Column>
           </Grid.Row>
         </Grid>
       </Segment>
      {posts instanceof Array && (
        posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          getFormattedDate={this.getFormattedDate}
        />
      )))}
    </div>
    )
  };
  
}

export default ListPosts
