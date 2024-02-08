export type AppStatusType = 'failed' | 'idle' | 'loading' | 'succeeded'
type AppStateType = {
  error: null | string
  info: null | string // для Snackbar
  isInitialized: boolean
  status: AppStatusType
}
const initialState: AppStateType = {
  error: null,
  info: null,
  isInitialized: false,
  status: 'loading',
}

type ActionType =
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAppInfoAC>
  | ReturnType<typeof setAppInitializedAC>
  | ReturnType<typeof setAppStatusAC>
export const appReducer = (state = initialState, action: ActionType): AppStateType => {
  switch (action.type) {
    case 'SET-APP-INITIALIZED':
      return { ...state, isInitialized: action.isInitialized }
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

export const setAppInitializedAC = (isInitialized: boolean) => {
  return { isInitialized, type: 'SET-APP-INITIALIZED' } as const
}

export const setAppStatusAC = (status: AppStatusType) => {
  return { status, type: 'SET-APP-STATUS' } as const
}

export const setAppInfoAC = (info: null | string) => {
  return { info, type: 'SET-APP-INFO' } as const
}
