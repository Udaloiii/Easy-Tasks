import { ResultCode } from '@/api/main-instance-api'
import { RequestTaskUpdateType, TaskResponseType, tasksApi } from '@/api/tasks-api'
import { appActions } from '@/store/reducers/app-reducer'
import { authThunks } from '@/store/reducers/auth-reducer'
import { todoThunks } from '@/store/reducers/todo-reducer'
import { createAppAsyncThunk } from '@/utils/create-app-async-thunk'
import { handleServerAppError } from '@/utils/handle-server-app-error'
import { thunkTryCatch } from '@/utils/thunk-try-catch'
import { createSlice } from '@reduxjs/toolkit'

export type TasksType = { taskStatus: any } & TaskResponseType // потом заменить any на статус из app-reducer
export type TaskStateType = {
  [key: string]: TasksType[]
}

const slice = createSlice({
  extraReducers: builder => {
    builder
      // .addCase(authActions.setIsLogin, () => {
      //   return {}
      // })
      .addCase(authThunks.logOut.fulfilled, () => {
        return {}
      })
      .addCase(setTasks.fulfilled, (state, action) => {
        state[action.payload.todoId] = action.payload.tasks.map(task => ({
          ...task,
          taskStatus: 'idle',
        }))
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift({ ...action.payload.task, taskStatus: 'all' })
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state[action.payload.todoId].findIndex(
          task => task.id === action.payload.taskId
        )

        if (index !== -1) {
          state[action.payload.todoId][index] = {
            ...state[action.payload.todoId][index],
            ...action.payload.task,
          }
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const index = state[action.payload.todoId].findIndex(
          task => task.id === action.payload.taskId
        )

        if (index !== -1) {
          state[action.payload.todoId].splice(index, 1)
        }
      })
      .addCase(todoThunks.setTodo.fulfilled, (state, action) =>
        action.payload.todolists.forEach(todo => {
          state[todo.id] = []
        })
      )
      .addCase(todoThunks.addTodo.fulfilled, (state, action) => {
        state[action.payload.todo.id] = []
      })
      .addCase(todoThunks.deleteTodo.fulfilled, (state, action) => {
        delete state[action.payload.todoId]
      })
  },
  initialState: {} as TaskStateType,
  name: 'tasks',
  reducers: {},
})

export const taskReducer = slice.reducer
export const taskActions = slice.actions

// THUNKS
const setTasks = createAppAsyncThunk<{ tasks: TaskResponseType[]; todoId: string }, string>(
  'tasks/setTasks',
  async (todoId, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasksApi.getTasks(todoId)

      return { tasks: res.data.items, todoId }
    })
  }
)

export const addTask = createAppAsyncThunk<
  { task: TaskResponseType },
  { title: string; todoId: string }
>('tasks/addTask', async ({ title, todoId }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  return thunkTryCatch(thunkAPI, async () => {
    const res = await tasksApi.addTask(todoId, title)

    if (res.data.resultCode === ResultCode.Success) {
      const task = res.data.data.item

      return { task }
    } else {
      handleServerAppError(res.data, dispatch)

      return rejectWithValue(null)
    }
  })
})

const updateTask = createAppAsyncThunk<
  { task: RequestTaskUpdateType; taskId: string; todoId: string },
  { domainModel: RequestTaskUpdateType; taskId: string; todoId: string }
>('tasks/updateTask', async ({ domainModel, taskId, todoId }, thunkAPI) => {
  const { dispatch, getState, rejectWithValue } = thunkAPI
  const state = getState()
  const task = state.task[todoId].find(t => t.id === taskId)

  if (!task) {
    dispatch(appActions.setAppError({ error: 'tasks not found' }))

    return rejectWithValue(null)
  }

  const apiModel: RequestTaskUpdateType = {
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    status: task.status,
    title: task.title,
    ...domainModel,
  }

  return thunkTryCatch(thunkAPI, async () => {
    const res = await tasksApi.updateTask(todoId, taskId, apiModel)

    if (res.data.resultCode === ResultCode.Success) {
      dispatch(appActions.setAppInfo({ info: 'tasks is updated' }))

      return { task: domainModel, taskId: taskId, todoId: todoId }
    } else {
      handleServerAppError(res.data, dispatch)

      return rejectWithValue(null)
    }
  })
})

const deleteTask = createAppAsyncThunk<
  { taskId: string; todoId: string },
  { taskId: string; todoId: string }
>('tasks/deleteTask', async ({ taskId, todoId }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  return thunkTryCatch(thunkAPI, async () => {
    const res = await tasksApi.deleteTask(todoId, taskId)

    if (res.data.resultCode === ResultCode.Success) {
      dispatch(appActions.setAppInfo({ info: 'tasks is deleted' }))

      return { taskId, todoId }
    } else {
      handleServerAppError(res.data, dispatch)

      return rejectWithValue(null)
    }
  })
})

export const tasksThunks = { addTask, deleteTask, setTasks, updateTask }
