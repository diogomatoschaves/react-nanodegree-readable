/**
 * Created by diogomatoschaves on 29/11/2017.
 */

import React from 'react';
import { Grid, Feed, Header, Icon, Button,
  Segment, Label } from 'semantic-ui-react'
import { deletePost, postVote } from '../actions/actions.js'
import { capitalize } from '../helpers/helpers.js'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import PostModal from './PostModal.js'


const Post = (props) => {

  const { post, getFormattedDate, postVote, deletePost } = props;

  return (
      <Segment>
        <Grid stackable>
          <Grid.Row columns={2} divided>
            <Grid.Column width={3} verticalAlign={'middle'}>
              <Label color='blue' size={'large'}>{capitalize(post.category)}</Label>
            </Grid.Column>
            <Grid.Column width={13} textAlign="left" verticalAlign="middle">
              <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column width={11}>
                    <Feed size={'small'} style={{'paddingLeft': '5px'}}>
                        <Feed.Event key={post.id}>
                          <Feed.Content style={{'marginTop': '0'}}>
                            <Feed.Summary as={Link} to={`/${post.category}/${post.id}`} >
                              <div style={{'color': '#2185d0', 'display': 'inline'}}> {post.author} </div> posted
                              <Feed.Date>{getFormattedDate(post.timestamp)}</Feed.Date>
                            </Feed.Summary>
                            <Feed.Extra style={{'display': 'block'}} as={Link} to={`/${post.category}/${post.id}`} text>
                              <Header as='h4'>{post.title}</Header>
                              {post.body}
                            </Feed.Extra>
                            <Feed.Meta >
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
                              <div style={{'display': 'block', 'alignItems': 'left'}}>{post.commentCount} Comments</div>
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
          </Grid>
      </Segment>
  )
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getFormattedDate: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  postVote: PropTypes.func.isRequired
};

const mapStateToProps = () => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
      deletePost: ({ postId }) => dispatch(deletePost({ postId })),
      postVote: ({ postId, option }) => dispatch(postVote({ postId, option }))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))


/*
<Grid.Column style={{'padding': '3px'}} textAlign="center">
            <Icon onClick={()=>this.toggle()} name="angle down"/>
          </Grid.Column>
 */