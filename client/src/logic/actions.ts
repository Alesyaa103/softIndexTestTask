import { CREATE_USER, GET_USERS, DELETE_USERS } from './types';
import { IUser } from './state';
import { getAll, create, removeUsers } from './service';

export const getAllUsers = () => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    const res = await getAll(); 
    dispatch({type: GET_USERS, payload: res});
  } catch (error) {
  }
}

export const createUser = (user: Partial<IUser>) => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  try {
    const res = await create(user);
    dispatch({type: CREATE_USER, payload: res});
  } catch (error) {
  }
}

export const deleteUsers = (IDs: string[]) => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  try {
    const res = await removeUsers(IDs);
    dispatch({type: DELETE_USERS, payload: res});
  } catch (error) {
  }
}