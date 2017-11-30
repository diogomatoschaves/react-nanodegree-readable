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

  getFormattedDate = (timeStamp) => {

    let difference = Date.now() - timeStamp;
    var daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24;

    var hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60;

    var minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60;

    var secondsDifference = Math.floor(difference/1000);

    let res;

    if (daysDifference >= 1) {
      (daysDifference === 1) ? res = `${daysDifference} day ago` : res = `${daysDifference} days ago`;
    } else if (hoursDifference >= 1) {
      (hoursDifference === 1) ? res = `${hoursDifference} hour ago` : res = `${hoursDifference} hours ago`;
    } else if (minutesDifference >= 1) {
      (minutesDifference === 1) ? res = `${minutesDifference} minute ago` : res = `${minutesDifference} minutes ago`;
    } else {
      (secondsDifference === 1) ? res = `${secondsDifference} second ago` : res = `${secondsDifference} seconds ago`;
    }

    return res

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
          comments={comments[post.id]}
        />
      )))}
    </div>
    )
  };
  
}

export default ListPosts

// style={{'display': 'flex','justifyContent': 'center', 'alignItems': 'center'}}
// <Segment>
//
//        </Segment>
// <Grid>
//          <Grid.Column width={4}>
//            <Header as='h4'>Category</Header>
//          </Grid.Column>
//          <Grid.Column width={10}>
//            <Header as='h4'>Post</Header>
//          </Grid.Column>
//        </Grid>
