/**
 * Created by diogomatoschaves on 01/12/2017.
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { capitalize } from '../helpers/helpers.js'
import {
  ADD_POST,
  UPDATE_POST,
  GET_POSTS,
  UPDATE_CATEGORY,
  GET_COMMENTS,
  GET_CATEGORIES,
  UPDATE_SORT,
  DELETE_POST,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  ADD_COMMENT
} from '../actions/actions.js';
import { combineReducers } from 'redux'


function posts(state = [], action) {

  switch (action.type) {
    case GET_POSTS:
      let newState = {};
      newState['byId'] = {};
      newState['allIds'] = [];
      action.items.forEach(post => {
        newState.byId[post.id] = post;
        newState.allIds.push(post.id)
      });
      return newState;
    case UPDATE_POST:

      let updatedPost = state.byId[action.post.postId];

      Object.keys(action.post).forEach(key => {
        updatedPost[key] = action.post[key]
      });
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.postId]: updatedPost 
        },
        allIds: [...state.allIds]
      };
    case ADD_POST:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            id: action.id,
            deleted: false,
            category: action.category,
            timestamp: action.timestamp,
            author: action.author,
            title: action.title,
            body: action.body,
            commentCount: 0,
            voteScore: 1
          }
        },
        allIds: [...state.allIds, action.id]
      };
    case DELETE_POST:
      return Object.keys(state.byId).reduce((posts, id) => {
        if (id === action.postId) {
          return posts
        } else {
          posts.byId[id] = state.byId[id];
          posts.allIds = [...posts.allIds, id];
          return posts
        }
      }, {byId: {}, allIds: []});
    default:
      return state
  }
}

function comments(state = {}, action) {
  
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        [action.info.id]: action.items.reduce((comments, currValue) => {
          comments[currValue.id] = currValue;
          return comments
        }, {})
      };
    case UPDATE_COMMENT:
      let updatedComment = state[action.comment.parentId][action.comment.commentId];
      Object.keys(action.comment).forEach(key => {
        if (key !== 'parentId') {
          updatedComment[key] = action.comment[key]
        }
      });
      return {
        ...state,
        [action.comment.parentId]: {
          ...state[action.comment.parentId],
          [action.comment.commentId]: updatedComment
        }
      };
    case DELETE_COMMENT:
      return {
        ...state,
        [action.comment.parentId]: Object.keys(state[action.comment.parentId]).reduce((comments, currComment) => {
          if (currComment !== action.comment.commentId) {
            comments[currComment] = state[action.comment.parentId][currComment]
          }
          return comments;
        }, {})
      };
    case ADD_COMMENT:
      return {
        ...state,
        [action.comment.parentId]: {
          ...state[action.comment.parentId],
          [action.comment.id]: {
            id: action.comment.id,
            deleted: false,
            parentDeleted: false,
            timestamp: action.comment.timestamp,
            author: action.comment.author,
            body: action.comment.body,
            voteScore: 0,
            parentId: action.comment.parentId,
            avatar: action.comment.avatar
          }
        }
      };
    default:
      return state
  }
}

function valueCategory (state=null, action) {

  const { value } = action;

  switch (action.type) {
    case UPDATE_CATEGORY:
      return value;
    default: return state
  }
}

function categoryOptions (state = [], action) {
  
  const { categories } = action;
  
  switch (action.type) {    
    case GET_CATEGORIES:
      
      return { 
        categories: categories.map(category => category.name),
        categoryOptions: categories.reduce((optionsArr, currOption) => {
          optionsArr.push({
            key: currOption.name.toLowerCase().replace(' ', ''), 
            text: <Link className="router-link" to={`/${currOption.name.toLowerCase().replace(' ', '')}`}>{capitalize(currOption.name)}</Link>,
            value: currOption.name.toLowerCase().replace(' ', '')});
          return optionsArr;
        }, state)
      };
    default:
      return state
  }
}

function valueSort (state = 1, action) {
  switch (action.type) {
    case UPDATE_SORT:
      return action.value;
    default:
      return state
  }
}

function optionsSort (state=[
  {key: 'voteScore', text: 'Vote Score', value: 1},
  {key: 'timestamp', text: 'Date', value: 2}], action) {

  return state
}

export default combineReducers({
  posts,
  comments,
  valueCategory,
  categoryOptions,
  valueSort,
  optionsSort
})

