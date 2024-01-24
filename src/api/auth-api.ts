import { MainResponseType, instance } from '@/api/main-instance-api'

type RequestLogInType = {
  captcha?: boolean
  email: string
  password: string
  rememberMe?: boolean
}

type ResponseAuthMeType = {
  email: string
  id: number
  login: string
}
export const authApi = {
  authMe() {
    return instance.get<MainResponseType<ResponseAuthMeType>>('auth/me')
  },
  logIn(body: RequestLogInType) {
    return instance.post<MainResponseType<{ userId: number }>>('auth/login', body)
  },
  logOut() {
    return instance.delete<MainResponseType>('auth/login')
  },
}
