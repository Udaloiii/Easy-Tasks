export type AppStatusType = 'failed' | 'idle' | 'loading' | 'succeeded'
type AppStateType = {
  error: null | string
  info: null | string // для Snackbar
  isLoading: boolean
  status: AppStatusType
}
const initialState: AppStateType = {
  error: null,
  info: null,
  isLoading: false,
  status: 'loading',
}

type ActionType =
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAppInfoAC>
  | ReturnType<typeof setAppLoadingAC>
  | ReturnType<typeof setAppStatusAC>
export const appReducer = (state = initialState, action: ActionType): AppStateType => {
  switch (action.type) {
    case 'SET-APP-LOADING':
      return { ...state, isLoading: action.isLoading }
    case 'SET-APP-STATUS':
      return { ...state, status: action.status }

    case 'SET-APP-ERROR':
      return { ...state, error: action.error }

    case 'SET-APP-INFO':
      return { ...state, info: action.info }

    default:
      return state
  }
}

export const setAppErrorAC = (error: null | string) => {
  return { error, type: 'SET-APP-ERROR' } as const
}

export const setAppLoadingAC = (isLoading: boolean) => {
  return { isLoading, type: 'SET-APP-LOADING' } as const
}

export const setAppStatusAC = (status: AppStatusType) => {
  return { status, type: 'SET-APP-STATUS' } as const
}

export const setAppInfoAC = (info: null | string) => {
  return { info, type: 'SET-APP-INFO' } as const
}
