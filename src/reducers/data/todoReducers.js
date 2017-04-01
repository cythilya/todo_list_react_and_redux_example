import { handleActions } from 'redux-actions';
import { TodoState } from '../../constants/models';

import {
  CREATE_TODO,
  DELETE_TODO,
  CHANGE_TEXT,
  SHOW_ALL,
  SHOW_COMPLETED,
  EDIT_TODO
} from '../../constants/actionTypes';

 const todoReducers = handleActions({
  CREATE_TODO: (state) => {
    let todos = state.get('todos').push(state.get('todo'));
    return state.set('todos', todos);
  },
  DELETE_TODO: (state, { payload }) => {
    return state.set('todos', state.get('todos').splice(payload.index, 1))
  },
  CHANGE_TEXT: (state, { payload }) => {
    return state.setIn(['todos', payload.index, 'text'], payload.text);
  },
  COMPLETE_TODO: (state, { payload }) => {
    return state.setIn(['todos', payload.index, 'completed'], true);
  },
  SHOW_ALL: (state) => (
    state.set('filter', 'show_all')
  ),
  SHOW_COMPLETED: (state) => (
    state.set('filter', 'show_completed')
  ),
  EDIT_TODO: (state, { payload }) => {
    return state.setIn(['todos', payload.index, 'isEdit'], !payload.isEdit);
  }
}, TodoState);

export default todoReducers;
