import { CREATE_USER, GET_USERS, DELETE_USERS } from './types';
import { IUser } from './state';
import { getAll, create, removeUsers } from './service';
import { store } from 'react-notifications-component';
import notification from 'helpers/notification';

export const getAllUsers = () => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    const res = await getAll(); 
    dispatch({type: GET_USERS, payload: res});
  } catch (error) {
    store.addNotification({
      ...notification,
      title: "Error",
      message: "Could not fetch users",
      type: "danger",
    })
  }
}

export const createUser = (user: Partial<IUser>) => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  try {
    const res = await create(user);
    dispatch({type: CREATE_USER, payload: res});
    store.addNotification({
      ...notification,
      title: "Success",
      message: "User was created",
      type: "success"
    })
  } catch (error) {
    if (error.status === 409) {
      store.addNotification({
        ...notification,
        title: "Error",
        message: "The phone number is already taken",
        type: "danger"
      })
    } else {
      store.addNotification({
        ...notification,
        title: "Error",
        message: "Could not create user",
        type: "danger"
      })
    }
  }
}

export const deleteUsers = (IDs: string[]) => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  try {
    const res = await removeUsers(IDs);
    dispatch({type: DELETE_USERS, payload: res});
    store.addNotification({
      ...notification,
      title: "Success",
      message: `${ IDs.length > 1 ? 'Users' : 'User' } was deleted`,
      type: "success"
    })
  } catch (error) {
    store.addNotification({
      ...notification,
      title: "Error",
      message: "User was not deleted",
      type: "danger",
    })
  }
}