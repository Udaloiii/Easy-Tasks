import { ResponseGetTodosType, todosApi } from '@/api/todos-api'
import { setAppErrorAC, setAppInfoAC, setAppStatusAC } from '@/store/reducers/app-reducer'
import { Dispatch } from 'redux'

export type FilterValuesType = 'active' | 'all' | 'completed'
export type TodolistType = {
  filter: FilterValuesType
} & ResponseGetTodosType
const initialState = [] as TodolistType[]

// ACTION TYPE
type ActionType =
  | ReturnType<typeof addTodoAC>
  | ReturnType<typeof changeTodoFilterAC>
  | ReturnType<typeof changeTodoTitleAC>
  | ReturnType<typeof deleteTodoAC>
  | ReturnType<typeof setTodosAC>
export const todoReducer = (state = initialState, action: ActionType): TodolistType[] => {
  switch (action.type) {
    case 'SET-TODOS': {
      return action.todolists.map(todo => ({ ...todo, filter: 'all' }))
    }

    case 'ADD-TODO': {
      return [{ ...action.todo, filter: 'all' }, ...state]
    }

    case 'DELETE-TODO': {
      return state.filter(el => el.id !== action.todoId)
    }

    case 'CHANGE-TODO-TITLE': {
      return state.map(el => (el.id === action.todoId ? { ...el, title: action.newTitle } : el))
    }

    case 'CHANGE-TODO-FILTER': {
      return state.map(el => (el.id === action.todoId ? { ...el, filter: action.newValue } : el))
    }

    default:
      return state
  }
}

// Action creators
export const setTodosAC = (todolists: ResponseGetTodosType[]) => {
  return { todolists, type: 'SET-TODOS' } as const
}
export const addTodoAC = (title: string, todo: ResponseGetTodosType) => {
  return { title, todo, type: 'ADD-TODO' } as const
}

export const deleteTodoAC = (todoId: string) => {
  return { todoId, type: 'DELETE-TODO' } as const
}

export const changeTodoTitleAC = (todoId: string, newTitle: string) => {
  return { newTitle, todoId, type: 'CHANGE-TODO-TITLE' } as const
}

export const changeTodoFilterAC = (todoId: string, newValue: FilterValuesType) => {
  return { newValue, todoId, type: 'CHANGE-TODO-FILTER' } as const
}

// THUNKS

export const setTodoTC = () => (dispatch: Dispatch) => {
  dispatch(setAppErrorAC(null))
  dispatch(setAppStatusAC('loading'))
  todosApi
    .getTodo()
    .then(res => {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(setTodosAC(res.data))
    })
    .catch(err => {
      dispatch(setAppStatusAC('failed'))
      dispatch(setAppErrorAC(err.message))
    })
}
export const addTodoTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(setAppErrorAC(null))
  todosApi
    .addTodo(title)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setAppStatusAC('succeeded'))
        dispatch(addTodoAC(title, res.data.data.item))
        dispatch(setAppInfoAC('todo is added'))
      } else {
        dispatch(setAppErrorAC(res.data.messages[0]))
        dispatch(setAppStatusAC('succeeded'))
      }
    })
    .catch(err => {
      dispatch(setAppStatusAC('failed'))
      dispatch(setAppErrorAC(err.message))
    })
}

export const deleteTodoTC = (todoId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(setAppErrorAC(null))
  todosApi
    .deleteTodo(todoId)
    .then(() => {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(deleteTodoAC(todoId))
      dispatch(setAppInfoAC('todo is deleted'))
    })
    .catch(err => {
      dispatch(setAppStatusAC('failed'))
      dispatch(setAppErrorAC(err.message))
    })
}

export const updateTodoTitleTC = (todoId: string, newTitle: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(setAppErrorAC(null))
  todosApi
    .changeTodoTitle(todoId, newTitle)
    .then(() => {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(changeTodoTitleAC(todoId, newTitle))
      dispatch(setAppInfoAC('title is updated'))
    })
    .catch(err => {
      dispatch(setAppStatusAC('failed'))
      dispatch(setAppErrorAC(err.message))
    })
}
