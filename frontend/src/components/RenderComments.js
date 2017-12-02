/**
 * Created by diogomatoschaves on 29/11/2017.
 */

import React from 'react'
import { Grid, Comment, Divider, Icon, Segment, Popup, Button } from 'semantic-ui-react'
import { deleteComment } from '../actions/actions.js'
import { connect } from 'react-redux'
import CommentModal from './CommentModal.js'


const RenderComments = (props) => {

  const { comments, getFormattedDate, deleteComment, post } = props;

  const avatars = ['elliot.jpg', 'jenny.jpg', 'joe.jpg', 'matt.jpg'];
  
  return (
    <div>
      {comments instanceof Array && (
        comments.map((comment) => (
          <div key={comment.id}>
            <Grid columns={2}>
              <Grid.Column width={10} style={{'paddingTop': '1px', 'paddingBottom': '1px'}}>
                  <Grid>
                    <Grid.Column width={2} className='avatar-column' textAlign={'center'} verticalAlign="middle">
                      <Comment.Group>
                      <Comment className='avatar-column'>
                        <Comment.Avatar
                          src={require(`../avatars/${avatars[Math.floor(Math.random() * 4)]}`)}
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
                            <Comment.Action><Icon name="like outline"/></Comment.Action>
                            <Comment.Action><Icon name="dislike outline"/></Comment.Action>
                            <Comment.Action>Reply</Comment.Action>
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

const mapDispatchStateToProps = () => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
      deleteComment: (commentId, parentId) => dispatch(deleteComment(commentId, parentId)),
    };
};

export default connect(mapDispatchStateToProps, mapDispatchToProps)(RenderComments)

// style={{'display':'flex', 'alignItems':'left'}}
// <Comment.Avatar src='/assets/images/avatar/small/matt.jpg'/>
//             <Segment key={comment.id}>

