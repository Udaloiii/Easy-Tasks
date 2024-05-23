import { PayloadAction, UnknownAction, createSlice } from '@reduxjs/toolkit'

export type AppStatusType = 'failed' | 'idle' | 'loading' | 'succeeded'
type AppStateType = {
  error: null | string
  info: null | string // для Snackbar
  isInitialized: boolean
  status: AppStatusType
}

const slice = createSlice({
  extraReducers: builder => {
    builder
      .addMatcher(
        (action: UnknownAction) => {
          return action.type.endsWith('/pending')
        },
        state => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        (action: UnknownAction) => {
          return action.type.endsWith('/fulfilled')
        },
        state => {
          state.status = 'succeeded'
        }
      )
      .addMatcher(
        (action: UnknownAction) => {
          return action.type.endsWith('/rejected')
        },
        state => {
          state.status = 'failed'
        }
      )
  },
  initialState: {
    error: null,
    info: null,
    isInitialized: false,
    status: 'loading',
  } as AppStateType,
  name: 'app',
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error
    },
    setAppInfo: (state, action: PayloadAction<{ info: null | string }>) => {
      state.info = action.payload.info
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
