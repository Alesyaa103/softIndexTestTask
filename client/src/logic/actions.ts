import { CREATE_USER, GET_USERS, DELETE_USER } from './types';
import { IUser } from './state';
import { getAll, create, remove } from './service';

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

export const deleteUser = (id: string) => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  try {
    const res = await remove(id);
    dispatch({type: DELETE_USER, payload: res});
  } catch (error) {
  }
}