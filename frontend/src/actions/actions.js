/**
 * Created by diogomatoschaves on 01/12/2017.
 */
import { uuid } from '../helpers/helpers.js';

export const ADD_POST = 'ADD_POST';
export const UPDATE_SORT = 'UPDATE_SORT';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const GET_POSTS = 'GET_POSTS';
export const GET_COMMENTS = 'GET_COMMENTS';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const GET_CATEGORIES = 'GET_CATEGORIES';

/* ------------------------------
     Functions related to posts
   ------------------------------ */

// Pure functions

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

export function addPost ({ category, username, title, body }) {
  return (dispatch) => {
    
    let url = 'http://localhost:3001/posts';

    const payload = {
      id: uuid(),
      timestamp: new Date().getTime(),
      body,
      author: username,
      category,
      title
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
      dispatch(getItems(`http://localhost:3001/posts`, {type: 'posts'}))
    })
    .catch((res) => (console.log(res)));
  }
}

export function editPost ({ postId, title, body }) {
  return (dispatch) => {
    
    let url = `http://localhost:3001/posts/${postId}`;
    
    const payload = {
      body,
      title
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
      dispatch(getItems(`http://localhost:3001/posts`, {type: 'posts'}));
    })
    .catch((res) => (console.log(res)));
  }
}

export function deletePost ({ postId }) {
  return (dispatch) => {
    
    const url = `http://localhost:3001/posts/${postId}`;
    
    fetch(url, {
      headers: {
        'Authorization': 'Diogo\'s readable project' ,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    })
    .then((res) => {
      dispatch(getItems(`http://localhost:3001/posts`, {type: 'posts'}));
    })
    .catch((res) => (console.log(res)));
  }
}

export function postVote({ postId, option }) {
  return (dispatch) => {

    let url = `http://localhost:3001/posts/${postId}`;

    const payload = {
      option
    };

    fetch(url, {
      headers: {
        'Authorization': 'Diogo\'s readable project',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(payload)
    })
      .then((res) => {
        dispatch(getPost(postId));
      })
  }
}

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

export function editComment ({ commentId, parentId, body }) {
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

export function commentVote({ commentId, parentId, option }) {
  return (dispatch) => {

    let url = `http://localhost:3001/comments/${commentId}`;

    const payload = {
      option
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
      // dispatch(getPost(parentId))
    })
  }
}

/* ------------------------------
   Functions related to categories
   ------------------------------ */

export function getCategories (categories) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export function fetchCategories () {
  return (dispatch) => {
    
    const url = `http://localhost:3001/categories`;

    fetch(url,
      {headers: {
        'Authorization': 'Diogo\'s readable project' ,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }})
      .then((res) => res.json()).then((categories) => {

      dispatch(getCategories(categories.categories))
    })
  }
}

export function fetchCategory ({ value, categoryOptions }) {
  return (dispatch) => {

    let url;

    if (value !== 1) {
      const category = categoryOptions.filter((option) => (option.value === value))[0].text.toLowerCase();
      url = `http://localhost:3001/${category}/posts`;
    } else {
      url = `http://localhost:3001/posts`;
    }

    fetch(url,
      {headers: {
        'Authorization': 'Diogo\'s readable project' ,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }})
      .then((res) => res.json()).then((posts) => {
        dispatch(getPosts(posts));
    })
  }
}

export function updateCategoryPosts (e, { value }, categoryOptions) {
  return (dispatch) => {
    dispatch(updateCategory(e, { value }));
    dispatch(fetchCategory({ value, categoryOptions }))
  }
}

export function updateSort ({ value }) {
  return {
    type: UPDATE_SORT,
    value
  }
}

export function updateCategory(e, { value }) {
  return {
    type: UPDATE_CATEGORY,
    value
  }
}

export function changeSort (e, { value }) {
  return (dispatch) => {
    dispatch(updateSort({ value }));
  }
}



