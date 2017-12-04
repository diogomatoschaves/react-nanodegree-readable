/**
 * Created by diogomatoschaves on 29/11/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from './Post.js'
import { Grid, Header, Segment, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchCategory, getItems, updateCategory } from '../actions/actions.js'


class ListPosts extends Component {
  
  // static propTypes = {
  //   posts: PropTypes.array.isRequired
  // };

  componentDidMount() {
    const { fetchCategory, updateCategory, fetchPosts, category } = this.props;

    if (category === 'allposts') {

      let url = `http://localhost:3001/posts`;

      fetchPosts(url, {type: 'posts'});
      updateCategory({}, {value: category})
    } else {
      fetchCategory({category});
      updateCategory({}, {value: category})
    }
  }
  
  componentDidUpdate(prevProps, prevState) {

    const { category } = this.props;

    (prevProps.category !== category) && (

      this.forceUpdate()
    )
  }
  
  render() {
    
    const { valueSort, optionsSort } = this.props;
    let { posts } = this.props;
    
    const sortProp = optionsSort.filter((option) => option.value === valueSort)[0].key;

    posts = posts.sort((a, b) => {
      return b[sortProp] - a[sortProp]
    });

    return (
      <div>
        {(posts instanceof Array) && (
          posts.map((post) => (
            <Post
              key={post.id}
              post={post}
            />
          )))}
      </div>
    )
  }
}

function mapStateToProps ({ valueSort, posts, optionsSort }) {
  return {
    valueSort,
    posts,
    optionsSort
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateCategory: (e, { value }) => dispatch(updateCategory(e, { value })),
    fetchCategory: ({ category }) => dispatch(fetchCategory({ category })),
    fetchPosts: (url, info) => dispatch(getItems(url, info))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts))
