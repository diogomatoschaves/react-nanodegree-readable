/**
 * Created by diogomatoschaves on 29/11/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from './Post.js'
import { Grid, Feed, Header, Segment } from 'semantic-ui-react'


class ListPosts extends Component {
  
  static propTypes = {
    posts: PropTypes.array.isRequired
  };

  getFormattedDate = (timeStamp) => {

    let difference = Date.now() - timeStamp;
    var daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24;

    var hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60;

    var minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60;

    var secondsDifference = Math.floor(difference/1000);

    let res;

    if (daysDifference >= 1) {
      (daysDifference === 1) ? res = `${daysDifference} day ago` : res = `${daysDifference} days ago`;
    } else if (hoursDifference >= 1) {
      (hoursDifference === 1) ? res = `${hoursDifference} hour ago` : res = `${hoursDifference} hours ago`;
    } else if (minutesDifference >= 1) {
      (minutesDifference === 1) ? res = `${minutesDifference} minute ago` : res = `${minutesDifference} minutes ago`;
    } else {
      (secondsDifference === 1) ? res = `${secondsDifference} second ago` : res = `${secondsDifference} seconds ago`;
    }

    return res

  };
  
  render () {
    
    const { posts, comments } = this.props;

    return (
     <div>
       <Segment>
         <Grid>
           <Grid.Column textAlign='center'>
             <Feed size={'large'} style={{'paddingLeft': '5px'}}>
              <Feed.Event>
                <Feed.Label style={{'display': 'flex','justifyContent': 'center', 'alignItems': 'top', 'paddingTop': '0'}}>
                  <Header as='h4'>Category</Header>
                </Feed.Label>
                <Feed.Content style={{'marginTop': '0', 'textAlign': 'center'}}>
                  <Feed.Summary>
                    <Header as='h4'>Posts</Header>
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
             </Feed>
           </Grid.Column>
         </Grid>
       </Segment>
      {posts instanceof Array && (
        posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          getFormattedDate={this.getFormattedDate}
          comments={comments[post.id]}
        />
      )))}
     </div>
    )
  };
  
}

export default ListPosts

// style={{'display': 'flex','justifyContent': 'center', 'alignItems': 'center'}}
// <Segment>
//
//        </Segment>
// <Grid>
//          <Grid.Column width={4}>
//            <Header as='h4'>Category</Header>
//          </Grid.Column>
//          <Grid.Column width={10}>
//            <Header as='h4'>Post</Header>
//          </Grid.Column>
//        </Grid>
