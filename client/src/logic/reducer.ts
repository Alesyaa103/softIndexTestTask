import { 
  GET_USERS,
  CREATE_USER,
  DELETE_USER
} from './types';
import { initialState } from './state';

export default (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        loading: false,
        users: payload
      }
    case CREATE_USER:
      return {
        ...state,
        users: [payload, ...state.users]
      }
    case DELETE_USER:
      const users = state.users.filter((user) => user._id !== payload._id);
      return {
        ...state,
        users
      }
    default:
      return state
  }
}