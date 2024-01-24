import axios from 'axios'

export type MainResponseType<D = {}> = {
  data: D
  messages: string[]
  resultCode: number
}
export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
})
