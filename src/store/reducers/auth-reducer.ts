import { RequestLogInType, authApi } from '@/api/auth-api'
import { appActions } from '@/store/reducers/app-reducer'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'

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

// Thunks
export const authMeTC = () => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: 'loading' }))
  authApi
    .authMe()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setUserName({ name: res.data.data.login }))
        dispatch(authActions.setIsLogin({ isLoggedIn: true }))
        dispatch(appActions.setAppInitialized({ isInitialized: true }))
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      } else {
        dispatch(appActions.setAppStatus({ status: 'failed' }))
        dispatch(appActions.setAppInitialized({ isInitialized: true }))
        dispatch(appActions.setAppError({ error: res.data.messages[0] }))
        dispatch(authActions.setIsLogin({ isLoggedIn: false }))
      }
    })
    .catch(err => {
      dispatch(appActions.setAppStatus({ status: 'failed' }))
      dispatch(appActions.setAppError({ error: err.message }))
    })
}
export const loginTC = (form: RequestLogInType) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: 'loading' }))
  authApi
    .logIn(form)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLogin({ isLoggedIn: true }))
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      } else {
        dispatch(appActions.setAppError({ error: res.data.messages[0] }))
        dispatch(authActions.setIsLogin({ isLoggedIn: false }))
        dispatch(appActions.setAppStatus({ status: 'failed' }))
      }
    })
    .catch(err => {
      dispatch(appActions.setAppStatus({ status: 'failed' }))
      dispatch(appActions.setAppError({ error: err.message }))
    })
}

export const logOutTC = () => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: 'loading' }))
  authApi
    .logOut()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLogin({ isLoggedIn: false }))
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      } else {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        dispatch(appActions.setAppError({ error: res.data.messages[0] }))
      }
    })
    .catch(err => {
      dispatch(appActions.setAppStatus({ status: 'failed' }))
      dispatch(appActions.setAppError({ error: err.message }))
    })
}
