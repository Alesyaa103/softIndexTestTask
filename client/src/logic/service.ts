import callApi from '../helpers/callApi';
import { IUser } from './state';

export const create = async (user: Partial<IUser>) => {
  const res = await callApi({
    endpoint: '/',
    method: 'POST',
    body: {
      ...user
    }
  })

  return (await res.json()) as IUser;
}

export const getAll = async () => {
  const res = await callApi({
    endpoint: '/',
    method: 'GET',
  })

  return (await res.json()) as IUser[];
}

export const remove = async (id: string) => {
  const res = await callApi({
    endpoint: `/${id}`,
    method: 'DELETE',
  })

  return (await res.json()) as IUser;
}
