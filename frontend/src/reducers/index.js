/**
 * Created by diogomatoschaves on 01/12/2017.
 */

import {
  ADD_POST,
  DELETE_POST,
  ADD_COMENT,
  DELETE_COMMENT,
  UPDATE_ITEMS
} from '../actions/actions.js';


export function items(state = [], action) {
  switch (action.type) {
    case UPDATE_ITEMS:
      switch (action.kind) {
        case 'posts':
          return {
            ...state,
            [action.kind]: action.items
          };
        case 'comments':
          return {
            ...state,
            [action.kind]: {
              ...state[action.kind],
              [action.items.]
            },
          };
      }
  }
}



