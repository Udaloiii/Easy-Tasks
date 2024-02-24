import { AppDispatchType, AppMainType } from '@/store/store'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatchType
  rejectValue: null
  state: AppMainType
}>()
