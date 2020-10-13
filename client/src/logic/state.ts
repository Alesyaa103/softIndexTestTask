export interface IUser {
  _id: string,
  firstName: string,
  lastName: string,
  gender: boolean,
  age: number,
  phone: string
}

export interface RootState {
  loading: boolean,
  users: IUser[]
}

export const initialState: RootState = {
  loading: true,
  users: []
};