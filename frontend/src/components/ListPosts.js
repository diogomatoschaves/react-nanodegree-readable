/**
 * Created by diogomatoschaves on 29/11/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from './Post.js'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'
import { fetchCategory, getItems, updateCategory } from '../actions/actions.js'
import DetailPost from './DetailPost.js'
import NoMatch from './NoMatch.js'


class ListPosts extends Component {
  
  static propTypes = {
    posts: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    fetchCategory: PropTypes.func.isRequired,
    updateCategory: PropTypes.func.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    valueSort: PropTypes.number.isRequired,
    optionsSort: PropTypes.array.isRequired
  };

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

    const { category, location, fetchCategory, updateCategory, fetchPosts } = this.props;
    
    if ((prevProps.category !== category) || (prevProps.location !== location)) {

      // this.forceUpdate()

      if (category === 'allposts') {

        let url = `http://localhost:3001/posts`;

        fetchPosts(url, {type: 'posts'});
        updateCategory({}, {value: category})
      } else {
        fetchCategory({category});
        updateCategory({}, {value: category})
      }

    }
  }
  
  getFormattedDate = (timeStamp) => {

    let difference = Date.now() - timeStamp;
    const daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24;

    const hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60;

    const minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60;

    const secondsDifference = Math.floor(difference/1000);

    let formattedDate;

    if (daysDifference >= 1) {
      (daysDifference === 1) ? formattedDate = `${daysDifference} day ago` : formattedDate = `${daysDifference} days ago`;
    } else if (hoursDifference >= 1) {
      (hoursDifference === 1) ? formattedDate = `${hoursDifference} hour ago` : formattedDate = `${hoursDifference} hours ago`;
    } else if (minutesDifference >= 1) {
      (minutesDifference === 1) ? formattedDate = `${minutesDifference} minute ago` : formattedDate = `${minutesDifference} minutes ago`;
    } else {
      (secondsDifference === 1) ? formattedDate = `${secondsDifference} second ago` : formattedDate = `${secondsDifference} seconds ago`;
    }
    return formattedDate
  };
  
  render() {
    
    const { valueSort, optionsSort, category } = this.props;
    let { posts } = this.props;
    
    const postsIds = posts.map(post => post.id);
    
    const sortProp = optionsSort.filter((option) => option.value === valueSort)[0].key;

    posts = posts.sort((a, b) => {
      return b[sortProp] - a[sortProp]
    });

    return (
      <div>
        <Route exact path="/" render={() => (
          <div>
            {(posts instanceof Array) && (
              posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  getFormattedDate={this.getFormattedDate}
                />
            )))}
          </div>
         )}/>
        <Route exact path={`/${category}`} render={() => (
          <div>
            {(posts instanceof Array) && (
              posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  getFormattedDate={this.getFormattedDate}
                />
            )))}
          </div>
         )}/>
        <Route path={`/${category}/:id`} render={({ match, location }) => (
          <div>
            {postsIds && postsIds.includes(match.params.id) ? (
              <DetailPost
                post={posts.filter(post => post.id === match.params.id)[0]}
                location={location}
                getFormattedDate={this.getFormattedDate}
              />
            ) : ( 
              <NoMatch noMatchType="id"/>
            )}
          </div>
        )}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
