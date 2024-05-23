import { ResultCode } from '@/api/main-instance-api'
import { ResponseGetTodosType, todosApi } from '@/api/todos-api'
import { appActions } from '@/store/reducers/app-reducer'
import { authThunks } from '@/store/reducers/auth-reducer'
import { createAppAsyncThunk } from '@/utils/create-app-async-thunk'
import { handleServerAppError } from '@/utils/handle-server-app-error'
import { thunkTryCatch } from '@/utils/thunk-try-catch'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type FilterValuesType = 'active' | 'all' | 'completed'
export type TodolistType = {
  filter: FilterValuesType
} & ResponseGetTodosType

const slice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(authThunks.logOut.fulfilled, () => {
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
    changeTodoFilter: (
      state,
      action: PayloadAction<{ newValue: FilterValuesType; todoId: string }>
    ) => {
      const index = state.findIndex(todo => todo.id === action.payload.todoId)

      if (index !== -1) {
        state[index].filter = action.payload.newValue
      }
    },
  },
})

export const todoReducer = slice.reducer
export const todoActions = slice.actions

// THUNKS
const setTodo = createAppAsyncThunk<{ todolists: ResponseGetTodosType[] }>(
  'todo/setTodo',
  async (_arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todosApi.getTodo()

      return { todolists: res.data }
    })
  }
)
const addTodo = createAppAsyncThunk('todo/addTodo', async (title: string, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  return thunkTryCatch(thunkAPI, async () => {
    const res = await todosApi.addTodo(title)

    if (res.data.resultCode === ResultCode.Success) {
      dispatch(appActions.setAppInfo({ info: 'todo is added' }))

      return { todo: res.data.data.item }
    } else {
      handleServerAppError(res.data, dispatch)

      return rejectWithValue(null)
    }
  })
})
const deleteTodo = createAppAsyncThunk('todo/deleteTodo', async (todoId: string, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  return thunkTryCatch(thunkAPI, async () => {
    const res = await todosApi.deleteTodo(todoId)

    if (res.data.resultCode === ResultCode.Success) {
      dispatch(appActions.setAppInfo({ info: 'todo is deleted' }))

      return { todoId }
    } else {
      handleServerAppError(res.data, dispatch)

      return rejectWithValue(null)
    }
  })
})
const updateTodoTitle = createAppAsyncThunk(
  'todo/updateTodoTitle',
  async ({ newTitle, todoId }: { newTitle: string; todoId: string }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
      const res = await todosApi.changeTodoTitle(todoId, newTitle)

      if (res.data.resultCode === ResultCode.Success) {
        dispatch(appActions.setAppInfo({ info: 'title is updated' }))

        return { newTitle, todoId }
      } else {
        handleServerAppError(res.data, dispatch)

        return rejectWithValue(null)
      }
    })
  }
)

export const todoThunks = { addTodo, deleteTodo, setTodo, updateTodoTitle }
