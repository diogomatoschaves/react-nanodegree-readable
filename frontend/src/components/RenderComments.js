/**
 * Created by diogomatoschaves on 29/11/2017.
 */

import React from 'react'
import { Grid, Comment, Divider, Icon, Segment, Popup, Button } from 'semantic-ui-react'


const RenderComments = (props) => {

    const { comments, getFormattedDate, deletePost } = props;

    return (

        <div>
        {comments instanceof Array && (
          comments.map((comment) => (
            <div key={comment.id}>
              <Grid columns={2}>
                <Grid.Column width={13} style={{'paddingTop': '1px', 'paddingBottom': '1px'}}>
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
                <Grid.Column width={3} verticalAlign="middle" textAlign="right">
                  <div className="remove-button-comment-div">
                  <Popup
                    trigger={<Button className="remove-button" color='red' icon='remove' onClick={deletePost} size="tiny"/>}
                    content='Delete Comment'
                    position='bottom center'
                    inverted
                    size="mini"
                    />
                    </div>
                </Grid.Column>
              </Grid>
              <Divider section style={{'paddingBottom': '1px'}}/>
            </div>
        )))}

        </div>

    )
};

export default RenderComments

// style={{'display':'flex', 'alignItems':'left'}}
// <Comment.Avatar src='/assets/images/avatar/small/matt.jpg'/>
//             <Segment key={comment.id}>

