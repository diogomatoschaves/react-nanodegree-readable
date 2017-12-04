/**
 * Created by diogomatoschaves on 29/11/2017.
 */

import React, { Component } from 'react';
import { Grid, Feed, Icon, Header,
  Segment, Divider, Label, Button} from 'semantic-ui-react'
import { getItems, deletePost, postVote } from '../actions/actions.js'
import { capitalize } from '../helpers/helpers.js'
import { connect } from 'react-redux'
import PostModal from './PostModal.js'
import RenderComments from './RenderComments.js'
import CommentModal from './CommentModal.js'


class Post extends Component {

  state = {
    commentsVisible: false,
    collapse: true
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
      this.setState(() => ({commentsVisible: true, collapse: false}))

    } else {
      let url = `http://localhost:3001/posts/${post.id}/comments`;

      fetchComments(url, {type: 'comments', id: post.id});
  
      this.setState(() => ({commentsVisible: true}))
    }
  };

  hideComments = () => {
    this.setState(() => ({commentsVisible: false}))
  };

  toggle = () => {
    this.setState({collapse: !this.state.collapse})
  };

  render() {

    const { post, deletePost, comments, postVote } = this.props;
    const { commentsVisible, collapse } = this.state;
    
    return (
      <Segment>
        {collapse ? (
          <Grid stackable>
            <Grid.Row columns={2} divided>
              <Grid.Column width={3} verticalAlign={'middle'}>
                <Label color='blue' size={'large'}>{capitalize(post.category)}</Label>
              </Grid.Column>
              <Grid.Column width={13} textAlign="left" verticalAlign="middle">
                <Header as="h4">{post.title}</Header>
              </Grid.Column>
            </Grid.Row>
            </Grid>
        ) : (
        <Grid stackable>
          <Grid.Row columns={2} divided>
          <Grid.Column width={3} verticalAlign={'middle'}>
            <Label color='blue' size={'large'}>{capitalize(post.category)}</Label>
          </Grid.Column>
          <Grid.Column width={13}>
            <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width={11}>
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
                        <Feed.Like onClick={()=>
                            postVote({ postId: post.id, option: 'upVote' })}>
                          <Icon name="like outline"/>
                        </Feed.Like>
                        <Feed.Like onClick={()=>
                            postVote({ postId: post.id, option: 'downVote' })}>
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
                            onClick={() => this.showComments()}>show</Feed.Like>
                          ) : (
                          <Feed.Like
                            style={{'textDecoration': 'underline', 'pointerEvents': 'none', 'cursor': 'default'}}
                          >show</Feed.Like>
                        ))}
                        <CommentModal
                          method={'Add'}
                          parentId={post.id}
                          showComments={this.showComments}
                        />
                      </Feed.Meta>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Grid.Column>
              <Grid.Column width={5} verticalAlign="middle" textAlign="center">
                <PostModal
                  method={'Edit'}
                  post={post}
                />
                <Button className="post-button" onClick={()=>deletePost({ postId: post.id })} size="tiny">Delete</Button>
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
            <Grid.Column width={16} textAlign='left' style={{'paddingLeft': '20px'}}>
              <RenderComments
                comments={comments[post.id]}
                post={post}
                getFormattedDate={this.getFormattedDate}
              />
            </Grid.Column>
          </Grid.Row>
          )}
        </Grid>
        )}
        <Grid>
          <Grid.Column style={{'padding': '3px'}} textAlign="center">
            <Icon onClick={()=>this.toggle()} name="angle down"/>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

const mapStateToProps = ({ comments }) => {
  return {
    comments
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
      fetchComments: (url, info) => dispatch(getItems(url, info)),
      deletePost: ({ postId }) => dispatch(deletePost({ postId })),
      postVote: ({ postId, option }) => dispatch(postVote({ postId, option }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post)