/**
 * Created by diogomatoschaves on 29/11/2017.
 */

import React from 'react'
import { Grid, Comment, Divider, Icon, Button } from 'semantic-ui-react'
import { deleteComment, commentVote } from '../actions/actions.js'
import { connect } from 'react-redux'
import CommentModal from './CommentModal.js'
import PropTypes from 'prop-types';


const RenderComments = (props) => {

  const { getFormattedDate, deleteComment, post, commentVote } = props;
  let { comments } = props;

  comments = Object.keys(comments).reduce((commentsArr, currValue) => {
    commentsArr = commentsArr.concat(comments[currValue]);
    return commentsArr
  }, []);

  comments = comments.sort((a, b) => {
      return b.voteScore - a.voteScore
  });

  return (
    <div>
      {comments && (
        comments.map((comment) => (
          <div key={comment.id}>
            <Grid columns={2}>
              <Grid.Column width={10} style={{'paddingTop': '1px', 'paddingBottom': '1px'}}>
                  <Grid>
                    <Grid.Column width={2} className='avatar-column' textAlign={'center'} verticalAlign="middle">
                      <Comment.Group>
                      <Comment className='avatar-column'>
                        <Comment.Avatar
                          src={require(`../avatars/${comment.avatar}`)}
                        />
                      </Comment>
                        </Comment.Group>
                    </Grid.Column>
                    <Grid.Column width={14} >
                      <Comment.Group style={{'paddingTop': '1px', 'paddingBottom': '1px'}}>
                      <Comment >
                        <Comment.Content >
                          <Comment.Author as='a'>{comment.author}</Comment.Author>
                          <Comment.Metadata>
                            <div>{getFormattedDate(comment.timestamp)}</div>
                          </Comment.Metadata>
                          <Comment.Text>{comment.body}</Comment.Text>
                          <Comment.Actions>
                            <div style={{'display': 'inline', 'paddingRight': '8px'}}>{comment.voteScore} Votes </div>
                            <Comment.Action as='a' onClick={()=>
                            commentVote({ commentId: comment.id, parentId: post.id, option: 'upVote', voteScore: comment.voteScore })}>
                              <Icon name="like outline"/>
                            </Comment.Action>
                            <Comment.Action onClick={()=>
                            commentVote({ commentId: comment.id, parentId: post.id, option: 'downVote', voteScore: comment.voteScore })}>
                              <Icon name="dislike outline"/>
                            </Comment.Action>
                          </Comment.Actions>
                        </Comment.Content>
                      </Comment>
                      </Comment.Group>
                      </Grid.Column>
                  </Grid>
              </Grid.Column>
              <Grid.Column width={6} verticalAlign="middle" textAlign="center">
                <CommentModal
                  method={'Edit'}
                  parentId={post.id}
                  comment={comment}
                />
                <Button className="comment-button" onClick={()=>deleteComment(comment.id, post.id)} size="tiny">Delete</Button>
              </Grid.Column>
            </Grid>
            <Divider section style={{'paddingBottom': '1px'}}/>
          </div>
      )))}
    </div>
  )
};

RenderComments.propTypes = {
  getFormattedDate: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  commentVote: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapDispatchStateToProps = () => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
      deleteComment: (commentId, parentId) => dispatch(deleteComment(commentId, parentId)),
      commentVote: ({ commentId, parentId, option, voteScore }) => dispatch(commentVote({ commentId, parentId, option, voteScore }))
    };
};

export default connect(mapDispatchStateToProps, mapDispatchToProps)(RenderComments)
