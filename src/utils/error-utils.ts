import { MainResponseType } from '@/api/main-instance-api'
import { appActions } from '@/store/reducers/app-reducer'
import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

export const handleServerAppError = <D>(data: MainResponseType<D>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }))
  } else {
    dispatch(appActions.setAppError({ error: 'Some error' }))
  }
  dispatch(appActions.setAppStatus({ status: 'failed' }))
}

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
