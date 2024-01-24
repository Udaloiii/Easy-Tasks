import { taskReducer } from '@/store/reducers/task-reducer'
import { todoReducer } from '@/store/reducers/todo-reducer'
import { combineReducers, legacy_createStore as createStore } from 'redux'

const rootReducer = combineReducers({
  task: taskReducer,
  todolist: todoReducer,
})

export const store = createStore(rootReducer)
export type AppMainType = ReturnType<typeof rootReducer>
