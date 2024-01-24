import { ResponseGetTodosType } from '@/api/todos-api'

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
      return [action.todo, ...state]
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
export const addTodoAC = (title: string, todo: TodolistType) => {
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
