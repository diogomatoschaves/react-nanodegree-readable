/**
 * Created by diogomatoschaves on 01/12/2017.
 */

export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const ADD_COMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const SORT_POSTS = 'SORT_POSTS';
export const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY';
export const UPDATE_ITEMS = 'UPDATE_ITEMS';

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

export function addComment ({ parentId, title, body, username }) {
  return {
    type: ADD_COMENT,
    parentId,
    title,
    body,
    username
  }
}

export function deleteComment ({ commentId }) {
  return {
    type: DELETE_COMMENT,
    commentId
  }
}

export function updateItems ({ items }, kind) {
  return {
    type: UPDATE_ITEMS,
    items,
    kind
  }
}

export function getItems (url, kind) {
  return (dispatch) => {
    let headers = {headers: { 'Authorization': 'Diogo\'s readable project' }};

    fetch(url, headers)
    .then((res) => res.json()).then((items) => {

      dispatch(updateItems(items, kind))

    }).catch()
  }
}
