/**
 * Created by diogomatoschaves on 04/12/2017.
 */


import React, { Component } from 'react'
import { Grid, Feed, Icon, Header,
  Segment, Divider, Label, Button} from 'semantic-ui-react'
import { getItems, deletePost, postVote } from '../actions/actions.js'
import { capitalize } from '../helpers/helpers.js'
import { connect } from 'react-redux'
import PostModal from './PostModal.js'
import RenderComments from './RenderComments.js'
import CommentModal from './CommentModal.js'


class DetailPost extends Component {
  
  state = {
    commentsVisible: true
  };

  componentDidMount() {

    const { fetchComments, post } = this.props;

    let url = `http://localhost:3001/posts/${post.id}/comments`;

    fetchComments(url, {type: 'comments', id: post.id});
  }
  
  toggleComments = () => {

    const { commentsVisible } = this.state;

    this.setState(() => ({ commentsVisible: !commentsVisible }))
  };
  
  render() {
    
    const { post, deletePost, getFormattedDate, comments, postVote } = this.props;
    const { commentsVisible } = this.state;
    
    return (
      <Segment>
      <Grid stackable>
          <Grid.Row columns={2} divided>
          <Grid.Column width={3} verticalAlign={'middle'}>
            <Label color='blue' size={'large'}>{capitalize(post.category)}</Label>
          </Grid.Column>
          <Grid.Column width={13}>
            <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width={11}>
                <Feed size={'large'} style={{'paddingLeft': '5px'}}>
                  <Feed.Event key={post.id}>
                    <Feed.Content style={{'marginTop': '0'}}>
                      <Feed.Summary>
                        <div style={{'color': '#2185d0', 'display': 'inline'}}> {post.author} </div> posted
                        <Feed.Date>{getFormattedDate(post.timestamp)}</Feed.Date>
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
                              onClick={() => this.toggleComments()}>hide</Feed.Like>
                          </div>
                        ) : (
                          <Feed.Like
                            as="a"
                            style={{'textDecoration': 'underline'}}
                            onClick={() => this.toggleComments()}>show</Feed.Like>
                          )}
                        <CommentModal
                          method={'Add'}
                          parentId={post.id}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost)

 // (post.commentCount ?
// ) : (
//   <Feed.Like
//     style={{'textDecoration': 'underline', 'pointerEvents': 'none', 'cursor': 'default'}}
//   >show</Feed.Like>
// )





