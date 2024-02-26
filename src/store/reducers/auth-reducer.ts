import { RequestLogInType, authApi } from '@/api/auth-api'
import { ResultCode } from '@/api/main-instance-api'
import { appActions } from '@/store/reducers/app-reducer'
import { createAppAsyncThunk } from '@/utils/create-app-async-thunk'
import { handleServerAppError } from '@/utils/handle-server-app-error'
import { handleServerNetworkError } from '@/utils/handle-server-network-error'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  extraReducers: builder => {
    builder.addCase(authThunks.authMe.fulfilled, (state, action) => {
      state.isLogin = action.payload.isLoggedIn
    })
  },
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

const authMe = createAppAsyncThunk<{ isLoggedIn: boolean }>(
  'auth/authMe',
  async (_arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    dispatch(appActions.setAppStatus({ status: 'loading' }))
    const res = await authApi.authMe()

    try {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(authActions.setUserName({ name: res.data.data.login }))
        // dispatch(authActions.setIsLogin({ isLoggedIn: true }))
        dispatch(appActions.setAppInitialized({ isInitialized: true }))
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))

        return { isLoggedIn: true }
      } else {
        dispatch(appActions.setAppInitialized({ isInitialized: true }))
        dispatch(authActions.setIsLogin({ isLoggedIn: false }))

        handleServerAppError(res.data, dispatch)

        return rejectWithValue(null)
      }
    } catch (err) {
      handleServerNetworkError(err, dispatch)

      return rejectWithValue(null)
    }
  }
)
const logIn = createAsyncThunk('auth/login', async (form: RequestLogInType, thunkAPI) => {
  const { dispatch } = thunkAPI

  dispatch(appActions.setAppStatus({ status: 'loading' }))
  const res = await authApi.logIn(form)

  if (res.data.resultCode === ResultCode.Success) {
    dispatch(authActions.setIsLogin({ isLoggedIn: true }))
    dispatch(appActions.setAppStatus({ status: 'succeeded' }))
  } else {
    dispatch(appActions.setAppError({ error: res.data.messages[0] }))
    dispatch(authActions.setIsLogin({ isLoggedIn: false }))
    dispatch(appActions.setAppStatus({ status: 'failed' }))
  }
})
const logOut = createAsyncThunk('auth/logout', async (_arg, thunkAPI) => {
  const { dispatch } = thunkAPI

  dispatch(appActions.setAppStatus({ status: 'loading' }))
  const res = await authApi.logOut()

  try {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(authActions.setIsLogin({ isLoggedIn: false }))
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      dispatch(authActions.setUserName({ name: '' }))
    } else {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      dispatch(appActions.setAppError({ error: res.data.messages[0] }))
    }
  } catch (err) {
    dispatch(appActions.setAppStatus({ status: 'failed' }))
    dispatch(appActions.setAppError({ error: (err as Error).message })) // типизировал
  }
})

export const authThunks = { authMe, logIn, logOut }
