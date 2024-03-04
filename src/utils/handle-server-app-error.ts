import { MainResponseType } from '@/api/main-instance-api'
import { appActions } from '@/store/reducers/app-reducer'
import { Dispatch } from 'redux'

export const handleServerAppError = <D>(data: MainResponseType<D>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }))
  } else {
    dispatch(appActions.setAppError({ error: 'Some error' }))
  }
}
