import { RequestLogInType, authApi } from '@/api/auth-api'
import { setAppErrorAC, setAppInitializedAC, setAppStatusAC } from '@/store/reducers/app-reducer'
import { Dispatch } from 'redux'

type AuthStateType = {
  isLogin: boolean
  userName: string
}
const initialState: AuthStateType = {
  isLogin: false,
  userName: '',
}

type ActionType = ReturnType<typeof setIsLoginAC> | ReturnType<typeof setUserNameAC>
export const authReducer = (state = initialState, action: ActionType): AuthStateType => {
  switch (action.type) {
    case 'SET-IS-LOGIN':
      return { ...state, isLogin: action.isLogin }

    case 'SET-USER-NAME':
      return { ...state, userName: action.name }
    default:
      return state
  }
}

export const setIsLoginAC = (isLogin: boolean) => {
  return { isLogin, type: 'SET-IS-LOGIN' } as const
}
export const setUserNameAC = (name: string) => {
  return { name, type: 'SET-USER-NAME' } as const
}

// Thunks
export const authMeTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authApi
    .authMe()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setUserNameAC(res.data.data.login))
        dispatch(setIsLoginAC(true))
        dispatch(setAppInitializedAC(true))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        dispatch(setAppInitializedAC(true))
        dispatch(setAppErrorAC(res.data.messages[0]))
        dispatch(setIsLoginAC(false))
      }
    })
    .catch(err => {
      dispatch(setAppStatusAC('failed'))
      dispatch(setAppErrorAC(err.message))
    })
}
export const loginTC = (form: RequestLogInType) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authApi
    .logIn(form)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoginAC(true))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        dispatch(setAppErrorAC(res.data.messages[0]))
        dispatch(setIsLoginAC(false))
      }
    })
    .catch(err => {
      dispatch(setAppStatusAC('failed'))
      dispatch(setAppErrorAC(err.message))
    })
}

export const logOutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authApi
    .logOut()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoginAC(false))
        dispatch(setAppStatusAC('succeeded'))
        // dispatch(setUserNameAC(''))
        // dispatch(setTodosAC([]))
      } else {
        dispatch(setAppErrorAC(res.data.messages[0]))
      }
    })
    .catch(err => {
      dispatch(setAppStatusAC('failed'))
      dispatch(setAppErrorAC(err.message))
    })
}
