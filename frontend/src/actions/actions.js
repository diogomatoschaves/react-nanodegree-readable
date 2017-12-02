/**
 * Created by diogomatoschaves on 01/12/2017.
 */
import { uuid } from '../helpers/helpers.js';

export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST;'
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const SORT_POSTS = 'SORT_POSTS';
export const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY';
export const GET_POSTS = 'GET_POSTS';
export const GET_COMMENTS = 'GET_COMMENTS';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const GET_CATEGORIES = 'GET_CATEGORIES';

/* ------------------------------
     Functions related to posts
   ------------------------------ */

// Pure functions

export function addPost ({ category, username, title, body }) {
  return {
    type: ADD_POST,
    category,
    username,
    title,
    body
  }
}

export function deletePost ({ postId }) {
  return {
    type: DELETE_POST,
    postId
  }
}

export function getPosts (items) {
  return {
    type: GET_POSTS,
    items
  }
}

export function updatePost(post) {
  return {
    type: UPDATE_POST,
    post
  }
}

// Asynchronous functions

export function getPost (id) {
  
  return (dispatch) => {
    
    const url = `http://localhost:3001/posts/${id}`;
    
    fetch(url, 
      {headers: {
        'Authorization': 'Diogo\'s readable project' ,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }})
      .then((res) => res.json()).then((post) => {
        dispatch(updatePost(post))
    })
  }
}

export function getItems (url, info) {
  return (dispatch) => {
    
    let headers = {headers: { 'Authorization': 'Diogo\'s readable project' }};

    fetch(url, headers)
    .then((res) => res.json()).then((items) => {
      
      if (info.type === 'posts') {
        dispatch(getPosts(items));
        // dispatch(getCategories(items));
        
      } else if (info.type === 'comments') {
        dispatch(getComments(items, info))
      }

    }).catch()
  }
}

/* ------------------------------
   Functions related to comments
   ------------------------------ */

// Pure functions

export function getComments (items, info) {
  return {
    type: GET_COMMENTS,
    items,
    info
  }
}

// Asynchronous functions

export function editComment (commentId, parentId, body) {
  return (dispatch) => {
    
    let url = `http://localhost:3001/comments/${commentId}`;
    
    const payload = {
      timestamp: new Date().getTime(),
      body
    };

    fetch(url, {
      headers: {
        'Authorization': 'Diogo\'s readable project' ,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify(payload)
      })
    .then((res) => {
      dispatch(getItems(`http://localhost:3001/posts/${parentId}/comments`, 
        {type: 'comments', id: parentId}));
      dispatch(getPost(parentId))
    })
    .catch((res) => (console.log(res)));
  }
}

export function deleteComment (commentId, parentId) {
  return (dispatch) => {
    
    const url = `http://localhost:3001/comments/${commentId}`;
    
    fetch(url, {
      headers: {
        'Authorization': 'Diogo\'s readable project' ,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    })
    .then((res) => {
      dispatch(getItems(`http://localhost:3001/posts/${parentId}/comments`, 
        {type: 'comments', id: parentId}));
      dispatch(getPost(parentId))
    })
    .catch((res) => (console.log(res)));
  }
}

export function addComment ({ username, body, parentId }) {
  return (dispatch) => {
    
    let url = 'http://localhost:3001/comments';
    
    const payload = {
      id: uuid(),
      timestamp: new Date().getTime(),
      body,
      author: username,
      parentId
    };

    fetch(url, {
      headers: {
        'Authorization': 'Diogo\'s readable project' ,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(payload)
      })
    .then((res) => {
      dispatch(getItems(`http://localhost:3001/posts/${parentId}/comments`, 
        {type: 'comments', id: parentId}));
      dispatch(getPost(parentId))
    })
    .catch((res) => (console.log(res)));
  }
}

/* ------------------------------
   Functions related to categories
   ------------------------------ */


export function getCategories (items) {
  return {
    type: GET_CATEGORIES,
    items
  }
}

export function updateCategory(e, { value }) {
  return {
    type: UPDATE_CATEGORY,
    value
  }
}



