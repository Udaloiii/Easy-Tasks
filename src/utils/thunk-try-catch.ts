import { MainResponseType } from '@/api/main-instance-api'
import { appActions } from '@/store/reducers/app-reducer'
import { AppDispatchType, AppMainType } from '@/store/store'
import { handleServerNetworkError } from '@/utils/handle-server-network-error'

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppMainType, unknown, AppDispatchType, MainResponseType | null>,
  logic: () => Promise<T>
): Promise<ReturnType<typeof thunkAPI.rejectWithValue> | T> => {
  const { dispatch, rejectWithValue } = thunkAPI

  dispatch(appActions.setAppStatus({ status: 'loading' }))
  try {
    return await logic()
  } catch (e) {
    handleServerNetworkError(e, dispatch)

    return rejectWithValue(null)
  } finally {
    dispatch(appActions.setAppStatus({ status: 'idle' }))
  }
}
