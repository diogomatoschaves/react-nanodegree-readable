/**
 * Created by diogomatoschaves on 29/11/2017.
 */

import React, { Component } from 'react'
import { Comment, Segment } from 'semantic-ui-react'


const RenderComments = (props) => {

    const { comments } = props;

    return (
      <Comment.Group>

        {comments instanceof Array && (
          comments.map((comment) => (
              <Comment style={{'paddingLeft': '20px'}}>
                <Comment.Content >
                  <Comment.Author as='a'>{comment.author}</Comment.Author>
                  <Comment.Metadata>
                    <div>Today at 5:42PM</div>
                  </Comment.Metadata>
                  <Comment.Text>How artistic!</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
        )))}
      </Comment.Group>
    )
};

export default RenderComments

// style={{'display':'flex', 'alignItems':'left'}}
// <Comment.Avatar src='/assets/images/avatar/small/matt.jpg'/>
