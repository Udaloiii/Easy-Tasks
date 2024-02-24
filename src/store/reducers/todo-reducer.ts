import { ResponseGetTodosType, todosApi } from '@/api/todos-api'
import { appActions } from '@/store/reducers/app-reducer'
import { authActions } from '@/store/reducers/auth-reducer'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'

export type FilterValuesType = 'active' | 'all' | 'completed'
export type TodolistType = {
  filter: FilterValuesType
} & ResponseGetTodosType

const slice = createSlice({
  extraReducers: builder => {
    builder.addCase(authActions.setIsLogin, () => {
      return []
    })
  },
  initialState: [] as TodolistType[],
  name: 'todo',
  reducers: {
    addTodo: (state, action: PayloadAction<{ todo: ResponseGetTodosType }>) => {
      state.unshift({ ...action.payload.todo, filter: 'all' })
    },
    changeTodoFilter: (
      state,
      action: PayloadAction<{ newValue: FilterValuesType; todoId: string }>
    ) => {
      const index = state.findIndex(todo => todo.id === action.payload.todoId)

      if (index !== -1) {
        state[index].filter = action.payload.newValue
      }
    },
    changeTodoTitle: (state, action: PayloadAction<{ newTitle: string; todoId: string }>) => {
      const index = state.findIndex(todo => todo.id === action.payload.todoId)

      if (index !== -1) {
        state[index].title = action.payload.newTitle
      }
    },
    deleteTodo: (state, action: PayloadAction<{ todoId: string }>) => {
      const index = state.findIndex(todo => todo.id === action.payload.todoId)

      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    setTodos: (_state, action: PayloadAction<{ todolists: ResponseGetTodosType[] }>) => {
      return action.payload.todolists.map(todo => ({ ...todo, filter: 'all' }))
    },
  },
})

export const todoReducer = slice.reducer
export const todoActions = slice.actions

// THUNKS
const setTodo = createAsyncThunk('todo/setTodo', async (_arg, thunkAPI) => {
  const { dispatch } = thunkAPI

  dispatch(appActions.setAppStatus({ status: 'loading' }))
  const res = await todosApi.getTodo()

  try {
    dispatch(appActions.setAppStatus({ status: 'succeeded' }))
    dispatch(todoActions.setTodos({ todolists: res.data }))
  } catch (err) {
    dispatch(appActions.setAppStatus({ status: 'failed' }))
    dispatch(appActions.setAppError({ error: (err as Error).message }))
  }
})
const addTodo = createAsyncThunk('todo/addTodo', async (title: string, thunkAPI) => {
  const { dispatch } = thunkAPI

  dispatch(appActions.setAppStatus({ status: 'loading' }))
  const res = await todosApi.addTodo(title)

  try {
    if (res.data.resultCode === 0) {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      dispatch(todoActions.addTodo({ todo: res.data.data.item }))
      dispatch(appActions.setAppInfo({ info: 'todo is added' }))
    } else {
      dispatch(appActions.setAppError({ error: res.data.messages[0] }))
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
    }
  } catch (err) {
    dispatch(appActions.setAppStatus({ status: 'failed' }))
    dispatch(appActions.setAppError({ error: (err as Error).message }))
  }
})
const deleteTodo = createAsyncThunk('todo/deleteTodo', async (todoId: string, thunkAPI) => {
  const { dispatch } = thunkAPI

  dispatch(appActions.setAppStatus({ status: 'loading' }))
  await todosApi.deleteTodo(todoId)

  try {
    dispatch(appActions.setAppStatus({ status: 'succeeded' }))
    dispatch(todoActions.deleteTodo({ todoId }))
    dispatch(appActions.setAppInfo({ info: 'todo is deleted' }))
  } catch (err) {
    dispatch(appActions.setAppStatus({ status: 'failed' }))
    dispatch(appActions.setAppError({ error: (err as Error).message }))
  }
})
const updateTodoTitle = createAsyncThunk(
  'todo/updateTodoTitle',
  async ({ newTitle, todoId }: { newTitle: string; todoId: string }, thunkAPI) => {
    const { dispatch } = thunkAPI

    dispatch(appActions.setAppStatus({ status: 'loading' }))
    await todosApi.changeTodoTitle(todoId, newTitle)

    try {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      dispatch(todoActions.changeTodoTitle({ newTitle, todoId }))
      dispatch(appActions.setAppInfo({ info: 'title is updated' }))
    } catch (err) {
      dispatch(appActions.setAppStatus({ status: 'failed' }))
      dispatch(appActions.setAppError({ error: (err as Error).message }))
    }
  }
)

export const todoThunks = { addTodo, deleteTodo, setTodo, updateTodoTitle }

// -----------------------------------------------------
// -----------------------------------------------------
// -----------------------------------------------------
// -----------------------------------------------------
// -----------------------------------------------------
// -----------------------------------------------------
// -----------------------------------------------------
// -----------------------------------------------------
// это можно будет потом удалить
export const _setTodoTC = () => (dispatch: Dispatch) => {
  // dispatch(appActions.setAppError({ error: null }))
  dispatch(appActions.setAppStatus({ status: 'loading' }))
  todosApi
    .getTodo()
    .then(res => {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      dispatch(todoActions.setTodos({ todolists: res.data }))
    })
    .catch(err => {
      dispatch(appActions.setAppStatus({ status: 'failed' }))
      dispatch(appActions.setAppError({ error: err.message }))
    })
}
export const _addTodoTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: 'loading' }))
  // dispatch(appActions.setAppError({ error: null }))
  todosApi
    .addTodo(title)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        dispatch(todoActions.addTodo({ todo: res.data.data.item }))
        dispatch(appActions.setAppInfo({ info: 'todo is added' }))
      } else {
        dispatch(appActions.setAppError({ error: res.data.messages[0] }))
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      }
    })
    .catch(err => {
      dispatch(appActions.setAppStatus({ status: 'failed' }))
      dispatch(appActions.setAppError({ error: err.message }))
    })
}

export const _deleteTodoTC = (todoId: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: 'loading' }))
  // dispatch(appActions.setAppError({ error: null }))
  todosApi
    .deleteTodo(todoId)
    .then(() => {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      dispatch(todoActions.deleteTodo({ todoId }))
      dispatch(appActions.setAppInfo({ info: 'todo is deleted' }))
    })
    .catch(err => {
      dispatch(appActions.setAppStatus({ status: 'failed' }))
      dispatch(appActions.setAppError({ error: err.message }))
    })
}

export const _updateTodoTitleTC = (todoId: string, newTitle: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: 'loading' }))
  // dispatch(appActions.setAppError({ error: null }))
  todosApi
    .changeTodoTitle(todoId, newTitle)
    .then(() => {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      dispatch(todoActions.changeTodoTitle({ newTitle, todoId }))
      dispatch(appActions.setAppInfo({ info: 'title is updated' }))
    })
    .catch(err => {
      dispatch(appActions.setAppStatus({ status: 'failed' }))
      dispatch(appActions.setAppError({ error: err.message }))
    })
}
