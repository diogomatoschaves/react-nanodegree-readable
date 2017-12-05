/**
 * Created by diogomatoschaves on 29/11/2017.
 */

import React, { Component } from 'react';
import { Grid, Feed, Header,
  Segment, Label } from 'semantic-ui-react'
import { getItems, deletePost, postVote } from '../actions/actions.js'
import { capitalize } from '../helpers/helpers.js'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'


class Post extends Component {
  
  render() {

    const { post, getFormattedDate } = this.props;
    
    return (
        <Segment>
          <Grid stackable>
            <Grid.Row columns={2} divided>
              <Grid.Column width={3} verticalAlign={'middle'}>
                <Label color='blue' size={'large'}>{capitalize(post.category)}</Label>
              </Grid.Column>
              <Grid.Column width={13} textAlign="left" verticalAlign="middle">
                <Feed as={Link} to={`/${post.category}/${post.id}`} size={'small'} style={{'paddingLeft': '5px'}}>
                    <Feed.Event key={post.id}>
                      <Feed.Content style={{'marginTop': '0'}}>
                        <Feed.Summary>
                          <div style={{'color': '#2185d0', 'display': 'inline'}}> {post.author} </div> posted
                          <Feed.Date>{getFormattedDate(post.timestamp)}</Feed.Date>
                        </Feed.Summary>
                        <Feed.Extra text>
                          <Header as='h4'>{post.title}</Header>
                        </Feed.Extra>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
              </Grid.Column>
            </Grid.Row>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))


/*
<Grid.Column style={{'padding': '3px'}} textAlign="center">
            <Icon onClick={()=>this.toggle()} name="angle down"/>
          </Grid.Column>
 */