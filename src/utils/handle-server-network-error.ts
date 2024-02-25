import { appActions } from '@/store/reducers/app-reducer'
import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
  const err = e as AxiosError<{ error: string }> | Error

  // eslint-disable-next-line import/no-named-as-default-member
  if (axios.isAxiosError(err)) {
    const error = err.message ? err.message : 'Some error'

    dispatch(appActions.setAppError({ error }))
  } else {
    dispatch(appActions.setAppError({ error: `Native error ${err.message}` }))
  }
  dispatch(appActions.setAppStatus({ status: 'failed' }))
}
