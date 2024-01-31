import { useDispatch } from 'react-redux'

import { appReducer } from '@/store/reducers/app-reducer'
import { taskReducer } from '@/store/reducers/task-reducer'
import { todoReducer } from '@/store/reducers/todo-reducer'
import { configureStore } from '@reduxjs/toolkit'
import { AnyAction, combineReducers } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

const rootReducer = combineReducers({
  app: appReducer,
  task: taskReducer,
  todolist: todoReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
export type AppMainType = ReturnType<typeof store.getState>
type AppDispatchType = ThunkDispatch<AppMainType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()
