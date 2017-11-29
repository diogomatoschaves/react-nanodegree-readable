/**
 * Created by diogomatoschaves on 29/11/2017.
 */

import React, { Component } from 'react';
import { Feed, Icon, Header, Segment, Divider } from 'semantic-ui-react'
import RenderComments from './RenderComments.js'


class Post extends Component {

  state = {
    commentsVisible: false
  };

  showComments = () => {
    this.setState(() => ({commentsVisible: true}))
  };

  hideComments = () => {
    // e.preventDefault();
    this.setState(() => ({commentsVisible: false}))
  };

  render() {

    const { post, comments, getFormattedDate } = this.props;
    const { commentsVisible } = this.state;
    
    return (
      <Segment>
        <Feed size={'large'} style={{'paddingLeft': '5px'}}>
          <Feed.Event key={post.id}>
            <Feed.Label style={{'display': 'flex','justifyContent': 'center', 'alignItems': 'top', 'paddingTop': '0'}}>
              <Header as='h3'>{post.category}</Header>
            </Feed.Label>

            <Feed.Content style={{'marginTop': '0', 'marginLeft': '100px'}}>
              <Feed.Summary>
                <Feed.User>{post.author}</Feed.User> posted
                <Feed.Date>{this.props.getFormattedDate(post.timestamp)}</Feed.Date>
              </Feed.Summary>
              <Feed.Extra text>
                <Header as='h4'>{post.title}</Header>
                {post.body}
              </Feed.Extra>
              <Feed.Meta>
                {post.voteScore} Upvote
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
                <Feed.Like>{post.commentCount} Comments</Feed.Like>
                {commentsVisible ? (
                  <div style={{'display': 'inline'}}>
                    <Feed.Like as="a" style={{'textDecoration': 'underline'}} onClick={() => this.hideComments()}>hide</Feed.Like>
                    <Divider section />
                    <RenderComments
                      comments={comments}
                      getFormattedDate={getFormattedDate}
                    />
                  </div>
                ) : (
                  <Feed.Like as="a" style={{'textDecoration': 'underline'}} onClick={() => this.showComments()}>show</Feed.Like>
                )}
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>
        </Feed>


      </Segment>
    )
  }
}

export default Post