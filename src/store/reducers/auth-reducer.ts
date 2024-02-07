import { RequestLogInType, authApi } from '@/api/auth-api'
import { setAppErrorAC, setAppInitializedAC, setAppStatusAC } from '@/store/reducers/app-reducer'
import { Dispatch } from 'redux'

type AuthStateType = {
  isLogin: boolean
}
const initialState: AuthStateType = {
  isLogin: false,
}

type ActionType = ReturnType<typeof setIsLoginAC>
export const authReducer = (state = initialState, action: ActionType): AuthStateType => {
  switch (action.type) {
    case 'SET-IS-LOGIN':
      return { ...state, isLogin: action.isLogin }

    default:
      return state
  }
}

export const setIsLoginAC = (isLogin: boolean) => {
  return { isLogin, type: 'SET-IS-LOGIN' } as const
}

export const setAppInfoAC = (info: null | string) => {
  return { info, type: 'SET-APP-INFO' } as const
}

// Thunks
export const authMeTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authApi
    .authMe()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoginAC(true))
        dispatch(setAppInitializedAC(true))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        dispatch(setAppErrorAC(res.data.messages[0]))
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
        dispatch(setAppInitializedAC(false))
      } else {
        dispatch(setAppErrorAC(res.data.messages[0]))
      }
    })
    .catch(err => {
      dispatch(setAppStatusAC('failed'))
      dispatch(setAppErrorAC(err.message))
    })
}
