import { ResultCode } from '@/api/main-instance-api'
import { ResponseGetTodosType, todosApi } from '@/api/todos-api'
import { appActions } from '@/store/reducers/app-reducer'
import { authActions } from '@/store/reducers/auth-reducer'
import { createAppAsyncThunk } from '@/utils/create-app-async-thunk'
import { handleServerAppError } from '@/utils/handle-server-app-error'
import { handleServerNetworkError } from '@/utils/handle-server-network-error'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type FilterValuesType = 'active' | 'all' | 'completed'
export type TodolistType = {
  filter: FilterValuesType
} & ResponseGetTodosType

const slice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(authActions.setIsLogin, () => {
        return []
      })
      .addCase(todoThunks.setTodo.fulfilled, (_state, action) => {
        return action.payload.todolists.map(todo => ({ ...todo, filter: 'all' }))
      })
      .addCase(todoThunks.addTodo.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todo, filter: 'all' })
      })
      .addCase(todoThunks.deleteTodo.fulfilled, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.todoId)

        if (index !== -1) {
          state.splice(index, 1)
        }
      })
      .addCase(todoThunks.updateTodoTitle.fulfilled, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.todoId)

        if (index !== -1) {
          state[index].title = action.payload.newTitle
        }
      })
  },
  initialState: [] as TodolistType[],
  name: 'todo',
  reducers: {
    // addTodo: (state, action: PayloadAction<{ todo: ResponseGetTodosType }>) => {
    //   state.unshift({ ...action.payload.todo, filter: 'all' })
    // },
    changeTodoFilter: (
      state,
      action: PayloadAction<{ newValue: FilterValuesType; todoId: string }>
    ) => {
      const index = state.findIndex(todo => todo.id === action.payload.todoId)

      if (index !== -1) {
        state[index].filter = action.payload.newValue
      }
    },
    // changeTodoTitle: (state, action: PayloadAction<{ newTitle: string; todoId: string }>) => {
    //   const index = state.findIndex(todo => todo.id === action.payload.todoId)
    //
    //   if (index !== -1) {
    //     state[index].title = action.payload.newTitle
    //   }
    // },
    // deleteTodo: (state, action: PayloadAction<{ todoId: string }>) => {
    //   const index = state.findIndex(todo => todo.id === action.payload.todoId)
    //
    //   if (index !== -1) {
    //     state.splice(index, 1)
    //   }
    // },
    // setTodos: (_state, action: PayloadAction<{ todolists: ResponseGetTodosType[] }>) => {
    //   return action.payload.todolists.map(todo => ({ ...todo, filter: 'all' }))
    // },
  },
})

export const todoReducer = slice.reducer
export const todoActions = slice.actions

// THUNKS
const setTodo = createAppAsyncThunk('todo/setTodo', async (_arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  dispatch(appActions.setAppStatus({ status: 'loading' }))
  const res = await todosApi.getTodo()

  try {
    dispatch(appActions.setAppStatus({ status: 'succeeded' }))
    // dispatch(todoActions.setTodos({ todolists: res.data }))

    return { todolists: res.data }
  } catch (err) {
    // dispatch(appActions.setAppStatus({ status: 'failed' }))
    // dispatch(appActions.setAppError({ error: err.message }))
    handleServerNetworkError(err, dispatch)

    return rejectWithValue(null)
  }
})
const addTodo = createAppAsyncThunk('todo/addTodo', async (title: string, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  dispatch(appActions.setAppStatus({ status: 'loading' }))
  const res = await todosApi.addTodo(title)

  try {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      dispatch(appActions.setAppInfo({ info: 'todo is added' }))

      // dispatch(todoActions.addTodo({ todo: res.data.data.item }))
      return { todo: res.data.data.item }
    } else {
      // dispatch(appActions.setAppError({ error: res.data.messages[0] }))
      // dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      handleServerAppError(res.data, dispatch)

      return rejectWithValue(null)
    }
  } catch (err) {
    // dispatch(appActions.setAppStatus({ status: 'failed' }))
    // dispatch(appActions.setAppError({ error: (err as Error).message }))
    handleServerNetworkError(err, dispatch)

    return rejectWithValue(null)
  }
})
const deleteTodo = createAppAsyncThunk('todo/deleteTodo', async (todoId: string, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  dispatch(appActions.setAppStatus({ status: 'loading' }))
  const res = await todosApi.deleteTodo(todoId)

  try {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      dispatch(appActions.setAppInfo({ info: 'todo is deleted' }))
      // dispatch(todoActions.deleteTodo({ todoId }))

      return { todoId }
    } else {
      handleServerAppError(res.data, dispatch)

      return rejectWithValue(null)
    }
  } catch (err) {
    // dispatch(appActions.setAppStatus({ status: 'failed' }))
    // dispatch(appActions.setAppError({ error: (err as Error).message }))
    handleServerNetworkError(err, dispatch)

    return rejectWithValue(null)
  }
})
const updateTodoTitle = createAppAsyncThunk(
  'todo/updateTodoTitle',
  async ({ newTitle, todoId }: { newTitle: string; todoId: string }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    dispatch(appActions.setAppStatus({ status: 'loading' }))
    const res = await todosApi.changeTodoTitle(todoId, newTitle)

    try {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        dispatch(appActions.setAppInfo({ info: 'title is updated' }))

        // dispatch(todoActions.changeTodoTitle({ newTitle, todoId }))
        return { newTitle, todoId }
      } else {
        handleServerAppError(res.data, dispatch)

        return rejectWithValue(null)
      }
    } catch (err) {
      // dispatch(appActions.setAppStatus({ status: 'failed' }))
      // dispatch(appActions.setAppError({ error: (err as Error).message }))
      handleServerNetworkError(err, dispatch)

      return rejectWithValue(null)
    }
  }
)

export const todoThunks = { addTodo, deleteTodo, setTodo, updateTodoTitle }
