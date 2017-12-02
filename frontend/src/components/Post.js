/**
 * Created by diogomatoschaves on 29/11/2017.
 */

import React, { Component } from 'react';
import { Grid, Feed, Icon, Header,
  Segment, Divider, Label, Button, Popup} from 'semantic-ui-react'
import { getItems, addComment, editComment } from '../actions/actions.js'
import { connect } from 'react-redux'
import RenderComments from './RenderComments.js'
import CommentModal from './CommentModal.js'


class Post extends Component {

  state = {
    commentsVisible: false,
    commentModalOpen: false,
    username: '',
    body: ''
  };
  
  getFormattedDate = (timeStamp) => {

    let difference = Date.now() - timeStamp;
    const daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24;

    const hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60;

    const minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60;

    const secondsDifference = Math.floor(difference/1000);

    let formattedDate;

    if (daysDifference >= 1) {
      (daysDifference === 1) ? formattedDate = `${daysDifference} day ago` : formattedDate = `${daysDifference} days ago`;
    } else if (hoursDifference >= 1) {
      (hoursDifference === 1) ? formattedDate = `${hoursDifference} hour ago` : formattedDate = `${hoursDifference} hours ago`;
    } else if (minutesDifference >= 1) {
      (minutesDifference === 1) ? formattedDate = `${minutesDifference} minute ago` : formattedDate = `${minutesDifference} minutes ago`;
    } else {
      (secondsDifference === 1) ? formattedDate = `${secondsDifference} second ago` : formattedDate = `${secondsDifference} seconds ago`;
    }
    return formattedDate
  };

  showComments = () => {

    const { fetchComments, post, comments } = this.props;

    if (comments && post.id in comments) {
      this.setState(() => ({commentsVisible: true}))

    } else {
      let url = `http://localhost:3001/posts/${post.id}/comments`;

      fetchComments(url, {type: 'comments', id: post.id});
  
      this.setState(() => ({commentsVisible: true}))
    }
  };

  hideComments = () => {
    this.setState(() => ({commentsVisible: false}))
  };

  openCommentModal = (username, body) => {
    this.setState(() => ({commentModalOpen: true, username, body}))
  };

  closeCommentModal = () => {
    this.setState(() => ({commentModalOpen: false, username: '', text: ''}))
  };

  submitComment = (info) => {

    const { username, body } = this.state;

    this.setState({commentModalOpen: false, username: '', body: ''});
    
    if (info.method === 'add') {
      this.props.addComment({username, body, parentId: this.props.post.id})
    } else if (info.method === 'edit') {
      this.props.editComment(info.commentId, info.parentId, body)
    }
  };

  updateUsername = (username) => {
    this.setState({ username })
  };
  updateBody = (body) => {
    this.setState({ body })
  };

  render() {

    const { post, deletePost, comments } = this.props;
    const { commentsVisible, commentModalOpen, username, body } = this.state;
    
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
                        <Feed.Date>{this.getFormattedDate(post.timestamp)}</Feed.Date>
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
                            <Feed.Like
                              as="a"
                              style={{'textDecoration': 'underline'}}
                              onClick={() => this.hideComments()}>hide</Feed.Like>
                          </div>
                        ) : (post.commentCount ? (
                          <Feed.Like
                            as="a"
                            style={{'textDecoration': 'underline'}}
                            onClick={() => this.showComments()}
                          >show</Feed.Like>
                          ) : (
                          <Feed.Like
                            style={{'textDecoration': 'underline', 'pointerEvents': 'none', 'cursor': 'default'}}
                          >show</Feed.Like>
                        ))}
                        <CommentModal
                          title={'Add Comment'}
                          closeCommentModal={this.closeCommentModal}
                          commentModalOpen={commentModalOpen}
                          username={username}
                          body={body}
                          updateUsername={this.updateUsername}
                          updateBody={this.updateBody}
                          submitComment={this.submitComment}
                          trigger={<Feed.Like as="a" style={{'textDecoration': 'underline'}} onClick={() => this.openCommentModal('', '')}>+ comment</Feed.Like>}
                        />
                      </Feed.Meta>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Grid.Column>
              <Grid.Column width={3} verticalAlign="middle" textAlign="center" stretched>
                <div className="remove-button-div">
                  <Popup
                    trigger={<Button className="remove-button" icon='remove' onClick={deletePost} size="tiny"/>}
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
          {commentsVisible && comments && post.id in comments && (
            <Divider section/>
          )}
          {commentsVisible && comments && post.id in comments && (
          <Grid.Row className="colored-row" style={{'paddingBottom': '0'}}>
            <Grid.Column width={3}>
            </Grid.Column>
            <Grid.Column width={13} textAlign='left' style={{'paddingLeft': '20px'}}>
              <RenderComments
                comments={comments[post.id]}
                post={post}
                getFormattedDate={this.getFormattedDate}
                openCommentModal={this.openCommentModal}
                closeCommentModal={this.closeCommentModal}
                commentModalOpen={commentModalOpen}
                username={username}
                body={body}
                updateUsername={this.updateUsername}
                updateBody={this.updateBody}
                submitComment={this.submitComment}
              />
            </Grid.Column>
          </Grid.Row>
          )}
        </Grid>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
      fetchComments: (url, info) => dispatch(getItems(url, info)),
      addComment: ({ username, body, parentId }) => dispatch(addComment({ username, body, parentId })),
      editComment: (commentId, parentId, body) => dispatch(editComment(commentId, parentId, body))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post)