import { RequestLogInType, authApi } from '@/api/auth-api'
import { ResultCode } from '@/api/main-instance-api'
import { appActions } from '@/store/reducers/app-reducer'
import { createAppAsyncThunk } from '@/utils/create-app-async-thunk'
import { handleServerAppError } from '@/utils/handle-server-app-error'
import { thunkTryCatch } from '@/utils/thunk-try-catch'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(authThunks.authMe.fulfilled, (state, action) => {
        state.isLogin = action.payload.isLoggedIn
      })
      .addCase(authThunks.logIn.fulfilled, (state, action) => {
        state.isLogin = action.payload.isLoggedIn
      })
      .addCase(authThunks.logOut.fulfilled, (state, action) => {
        state.isLogin = action.payload.isLoggedIn
      })
  },
  initialState: {
    isLogin: false,
    userName: '',
  },
  name: 'auth',
  reducers: {
    // setIsLogin: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
    //   state.isLogin = action.payload.isLoggedIn
    // },
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

    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.authMe() // если вне блока try, то не обрабатывается ошибка и крутилка бесконечно

      if (res.data.resultCode === ResultCode.Success) {
        dispatch(authActions.setUserName({ name: res.data.data.login }))

        return { isLoggedIn: true }
      } else {
        handleServerAppError(res.data, dispatch)

        return rejectWithValue(null)
      }
    }).finally(() => {
      dispatch(appActions.setAppInitialized({ isInitialized: true })) // пересмотреть
    })
  }
)
const logIn = createAppAsyncThunk<{ isLoggedIn: true }, RequestLogInType>(
  'auth/login',
  async (form, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.logIn(form) // если вне блока try, то не обрабатывается ошибка и крутилка бесконечно

      if (res.data.resultCode === ResultCode.Success) {
        return { isLoggedIn: true }
      } else {
        handleServerAppError(res.data, dispatch)

        return rejectWithValue(null)
      }
    })
  }
)
const logOut = createAppAsyncThunk<{ isLoggedIn: boolean }>(
  'auth/logout',
  async (_arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.logOut() // если вне блока try, то не обрабатывается ошибка и крутилка бесконечно

      if (res.data.resultCode === ResultCode.Success) {
        dispatch(authActions.setUserName({ name: '' }))

        return { isLoggedIn: false }
      } else {
        handleServerAppError(res.data, dispatch)

        return rejectWithValue(null)
      }
    })
  }
)

export const authThunks = { authMe, logIn, logOut }
