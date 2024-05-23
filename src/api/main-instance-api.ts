import axios from 'axios'

export type MainResponseType<D = {}> = {
  data: D
  messages: string[]
  resultCode: number
}
export const ResultCode = {
  Captcha: 10,
  Error: 1,
  Success: 0,
} as const
export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    'API-KEY': 'bfb2a9e7-51b4-4737-9da8-c82e19cdd77e',
  },
  withCredentials: true,
})
