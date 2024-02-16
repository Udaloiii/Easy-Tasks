import { RequestLogInType, authApi } from '@/api/auth-api'
import { setAppErrorAC, setAppInitializedAC, setAppStatusAC } from '@/store/reducers/app-reducer'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'

// type AuthStateType = {
//   isLogin: boolean
//   userName: string
// }
// const initialState: AuthStateType = {
//   isLogin: false,
//   userName: '',
// }

// type ActionType = ReturnType<typeof setIsLoginAC> | ReturnType<typeof setUserNameAC>

const slice = createSlice({
  initialState: {
    isLogin: false,
    userName: '',
  },
  name: 'auth',
  reducers: {
    setIsLogin: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLogin = action.payload.isLoggedIn
    },
    setUserName: (state, action: PayloadAction<{ name: string }>) => {
      state.userName = action.payload.name
    },
  },
})

export const authReducer = slice.reducer
export const authActions = slice.actions // экспорт сразу 2 экшенов

// export const authReducer = (state = initialState, action: ActionType): AuthStateType => {
//   switch (action.type) {
//     case 'SET-IS-LOGIN':
//       return { ...state, isLogin: action.isLogin }
//
//     case 'SET-USER-NAME':
//       return { ...state, userName: action.name }
//     default:
//       return state
//   }
// }

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
        // dispatch(setIsLoginAC(true))
        dispatch(authActions.setIsLogin({ isLoggedIn: true }))
        dispatch(setAppInitializedAC(true))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        dispatch(setAppInitializedAC(true))
        dispatch(setAppErrorAC(res.data.messages[0]))
        // dispatch(setIsLoginAC(false))
        dispatch(authActions.setIsLogin({ isLoggedIn: false }))
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
        // dispatch(setIsLoginAC(true))
        dispatch(authActions.setIsLogin({ isLoggedIn: true }))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        dispatch(setAppErrorAC(res.data.messages[0]))
        // dispatch(setIsLoginAC(false))
        dispatch(authActions.setIsLogin({ isLoggedIn: false }))
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
