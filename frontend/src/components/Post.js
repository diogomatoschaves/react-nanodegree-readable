/**
 * Created by diogomatoschaves on 29/11/2017.
 */

import React, { Component } from 'react';
import { Grid, Feed, Icon, Header,
  Segment, Divider, Label, Button, Popup} from 'semantic-ui-react'
import RenderComments from './RenderComments.js'
import CommentModal from './CommentModal.js'


class Post extends Component {

  state = {
    commentsVisible: false,
    commentModalOpen: false,
    username: '',
    text: ''
  };

  showComments = () => {
    this.setState(() => ({commentsVisible: true}))
  };

  hideComments = () => {
    // e.preventDefault();
    this.setState(() => ({commentsVisible: false}))
  };

  openCommentModal = () => {
    this.setState(() => ({commentModalOpen: true}))
  };

  closeCommentModal = () => {
    this.setState(() => ({commentModalOpen: false, username: '', text: ''}))
  };

  addComment = () => {
    this.setState({commentModalOpen: false})
  };

  updateUsername = (username) => {
    this.setState({ username })
  };
  updateText = (text) => {
    this.setState({ text })
  };

  render() {

    const { post, comments, getFormattedDate, deletePost } = this.props;
    const { commentsVisible, commentModalOpen, username, text } = this.state;
    
    return (
      <Segment>
        <Grid stackable>
          <Grid.Row columns={2} divided>
          <Grid.Column width={3} verticalAlign={'middle'}>
            <Label color='blue' size={'large'}>{post.category}</Label>
          </Grid.Column>
          <Grid.Column width={13}>
            <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width={13}>
                <Feed size={'small'} style={{'paddingLeft': '5px'}}>
                  <Feed.Event key={post.id}>
                    <Feed.Content style={{'marginTop': '0'}}>
                      <Feed.Summary>
                        <Feed.User>{post.author}</Feed.User> posted
                        <Feed.Date>{this.props.getFormattedDate(post.timestamp)}</Feed.Date>
                      </Feed.Summary>
                      <Feed.Extra text>
                        <Header as='h4'>{post.title}</Header>
                        {post.body}
                      </Feed.Extra>
                      <Feed.Meta>
                        {post.voteScore} Votes
                        <Feed.Like/>
                        <Feed.Like>
                          <Icon name="like outline"/>
                        </Feed.Like>
                        <Feed.Like>
                          <Icon name="dislike outline"/>
                        </Feed.Like>
                      </Feed.Meta>
                      <br/>
                      <Feed.Meta>
                        <div style={{'display': 'inline'}}>{post.commentCount} Comments</div>
                        {commentsVisible ? (
                          <div style={{'display': 'inline'}}>
                            <Feed.Like as="a" style={{'textDecoration': 'underline'}} onClick={() => this.hideComments()}>hide</Feed.Like>
                          </div>
                        ) : (
                          <Feed.Like as="a" style={{'textDecoration': 'underline'}} onClick={() => this.showComments()}>show</Feed.Like>
                        )}
                        <CommentModal
                          openCommentModal={this.openCommentModal}
                          closeCommentModal={this.closeCommentModal}
                          commentModalOpen={commentModalOpen}
                          username={username}
                          text={text}
                          updateUsername={this.updateUsername}
                          updateText={this.updateText}
                          addComment={this.addComment}
                        />
                      </Feed.Meta>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Grid.Column>
              <Grid.Column width={3} verticalAlign="middle" textAlign="center" stretched>
                <div className="remove-button-div">
                  <Popup
                    trigger={<Button className="remove-button" color="red" icon='remove' onClick={deletePost} size="tiny"/>}
                    content='Delete Post'
                    position='bottom center'
                    inverted
                    size="mini"
                  />
                </div>
              </Grid.Column>
              </Grid.Row>
              </Grid>
          </Grid.Column>
          </Grid.Row>
          {commentsVisible && (
            <Divider section/>
          )}
          {commentsVisible && (
          <Grid.Row className="colored-row" style={{'paddingBottom': '0'}}>
            <Grid.Column width={3}>
            </Grid.Column>
            <Grid.Column width={13} textAlign='left' style={{'paddingLeft': '20px'}}>
              <RenderComments
                comments={comments}
                getFormattedDate={getFormattedDate}
              />

            </Grid.Column>
          </Grid.Row>
          )}
        </Grid>
      </Segment>
    )
  }
}

export default Post

// <Button><Icon name="remove"/></Button>

// {<Button color='grey' size='small' basic onClick={() => this.openCommentModal()}>+ Comment</Button>}