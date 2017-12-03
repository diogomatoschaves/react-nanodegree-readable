/**
 * Created by diogomatoschaves on 29/11/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post.js'
import PostModal from './PostModal.js'
import { Grid, Header, Segment, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { changeSort } from '../actions/actions.js'


const ListPosts = (props) => {
    
  const { posts, valueSort, handleChangeSort, optionsSort } = props;

  return (
    <div>
     <Segment>
       <Grid columns={3} divided stackable>
         <Grid.Row>
          <Grid.Column width={3} verticalAlign='middle' textAlign='center'>
            <Header as='h3'>Category</Header>
          </Grid.Column>
          <Grid.Column width={9} verticalAlign='middle'>
            <Header as='h3'>Posts</Header>
          </Grid.Column>
           <Grid.Column width={4} textAlign='center'>
            <Dropdown
              text='Sort Posts'
              options={optionsSort}
              button
              compact
              size={'tiny'}
              onChange={handleChangeSort}
              value={valueSort}
            />
             <PostModal
               method={'Add'}
             />
          </Grid.Column>
         </Grid.Row>
       </Grid>
     </Segment>
    {posts instanceof Array && (
      posts.map((post) => (
      <Post
        key={post.id}
        post={post}
        getFormattedDate={this.getFormattedDate}
      />
    )))}
  </div>
  )
};

ListPosts.propTypes = {
    posts: PropTypes.array.isRequired
};

function mapStateToProps ({ valueSort }) {
  return {
    valueSort
  }
}

function mapDispatchToProps (dispatch) {
  return {
    handleChangeSort: (e, {value}) => dispatch(changeSort(e, {value}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
