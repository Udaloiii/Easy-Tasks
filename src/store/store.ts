import { useDispatch } from 'react-redux'

import { appReducer } from '@/store/reducers/app-reducer'
import { authReducer } from '@/store/reducers/auth-reducer'
import { taskReducer } from '@/store/reducers/task-reducer'
import { todoReducer } from '@/store/reducers/todo-reducer'
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  task: taskReducer,
  todolist: todoReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
export type AppMainType = ReturnType<typeof store.getState>
// type AppDispatchType = ThunkDispatch<AppMainType, any, AnyAction>
type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()

// @ts-ignore
window.store = store
