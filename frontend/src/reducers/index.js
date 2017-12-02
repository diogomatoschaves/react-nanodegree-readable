/**
 * Created by diogomatoschaves on 01/12/2017.
 */

import {
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_POSTS,
  UPDATE_CATEGORY,
  GET_COMMENTS,
  GET_CATEGORIES
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

function valueCategory (state = 1, action) {

  const { value } = action;

  switch (action.type) {
    case UPDATE_CATEGORY:
      return value;
    default: return state
  }
}

export default combineReducers({
  posts,
  comments,
  valueCategory
})


// function categoryOptions (state = [], action) {
//  
//   const { items } = action;
//  
//   switch (action.type) {
//     case GET_CATEGORIES:
//       let options = [{ key: 1, text: 'All Posts', value: 1 }];
//      
//       return
//   }
// }

// case ADD_COMMENT:
//       return {
//         ...state['comments'],
//         [action.parentId]: state['comments'][action.parentId].push(co)
//       };


