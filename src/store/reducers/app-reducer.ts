import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type AppStatusType = 'failed' | 'idle' | 'loading' | 'succeeded'
type AppStateType = {
  error: null | string
  info: null | string // для Snackbar
  isInitialized: boolean
  status: AppStatusType
}

const slice = createSlice({
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
    setAppStatus: (state, action: PayloadAction<{ status: AppStatusType }>) => {
      state.status = action.payload.status
    },
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
