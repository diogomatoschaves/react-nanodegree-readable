/**
 * Created by diogomatoschaves on 01/12/2017.
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { capitalize } from '../helpers/helpers.js'
import {
  UPDATE_POST,
  GET_POSTS,
  UPDATE_CATEGORY,
  GET_COMMENTS,
  GET_CATEGORIES,
  UPDATE_SORT
} from '../actions/actions.js';
import { combineReducers } from 'redux'


function posts(state = [], action) {

  switch (action.type) {
    case GET_POSTS:
      return action.items;
    case UPDATE_POST:
      
      let oldPost = state.filter((post) => post.id === action.post.id);

      if (oldPost.length > 0) {
        return state.map((post) => {
         if (post.id === action.post.id) {
           return action.post;
         } else {
           return post;
         }})
      } else {
        return state.push(action.post)
      }
    default:
      return state
  }
}

function comments(state = [], action) {
  
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
          [action.info.id]: action.items
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

/*const newComments = action.items.map((comment)=>{
        comment['avatar'] = avatars[Math.floor(Math.random() * 4)];
        return comment
      });*/


