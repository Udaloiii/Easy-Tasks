import { RequestTaskUpdateType, TaskResponseType, tasksApi } from '@/api/tasks-api'
import { appActions } from '@/store/reducers/app-reducer'
import { authActions } from '@/store/reducers/auth-reducer'
import { todoActions } from '@/store/reducers/todo-reducer'
import { AppMainType } from '@/store/store'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'

export type TasksType = { taskStatus: any } & TaskResponseType // потом заменить any на статус из app-reducer
export type TaskStateType = {
  [key: string]: TasksType[]
}

const slice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(setTasks.fulfilled, (state, action) => {
        state[action.payload.todoId] = action.payload.tasks.map(task => ({
          ...task,
          taskStatus: 'idle',
        }))
      })
      .addCase(todoActions.setTodos, (state, action) =>
        action.payload.todolists.forEach(todo => {
          state[todo.id] = []
        })
      )
      .addCase(todoActions.addTodo, (state, action) => {
        state[action.payload.todo.id] = []
      })
      .addCase(todoActions.deleteTodo, (state, action) => {
        delete state[action.payload.todoId]
      })
      .addCase(authActions.setIsLogin, () => {
        return {}
      })
  },
  initialState: {} as TaskStateType,
  name: 'tasks',
  reducers: {
    addTask: (state, action: PayloadAction<{ task: TaskResponseType; todoId: string }>) => {
      state[action.payload.todoId].unshift({ ...action.payload.task, taskStatus: 'all' })
    },
    deleteTask: (state, action: PayloadAction<{ taskId: string; todoId: string }>) => {
      const index = state[action.payload.todoId].findIndex(
        task => task.id === action.payload.taskId
      )

      if (index !== -1) {
        state[action.payload.todoId].splice(index, 1)
      }
    },
    setTasks: (state, action: PayloadAction<{ tasks: TaskResponseType[]; todoId: string }>) => {
      state[action.payload.todoId] = action.payload.tasks.map(task => ({
        ...task,
        taskStatus: 'idle',
      }))
    },
    updateTask: (
      state,
      action: PayloadAction<{ task: RequestTaskUpdateType; taskId: string; todoId: string }>
    ) => {
      const index = state[action.payload.todoId].findIndex(
        task => task.id === action.payload.taskId
      )

      if (index !== -1) {
        state[action.payload.todoId][index] = {
          ...state[action.payload.todoId][index],
          ...action.payload.task,
        }
      }
    },
  },
})

export const taskReducer = slice.reducer
export const taskActions = slice.actions

// THUNKS
const setTasks = createAsyncThunk('tasks/setTasks', async (todoId: string, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  dispatch(appActions.setAppStatus({ status: 'loading' }))
  const res = await tasksApi.getTasks(todoId)

  try {
    dispatch(appActions.setAppStatus({ status: 'succeeded' }))

    return { tasks: res.data.items, todoId: todoId }
  } catch (err) {
    dispatch(appActions.setAppStatus({ status: 'failed' }))
    dispatch(appActions.setAppError({ error: (err as Error).message }))

    return rejectWithValue(null) // пока так
  }
})

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async ({ title, todoId }: { title: string; todoId: string }, thunkAPI) => {
    const { dispatch } = thunkAPI

    dispatch(appActions.setAppStatus({ status: 'loading' }))
    const res = await tasksApi.addTask(todoId, title)

    try {
      if (res.data.resultCode === 0) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        dispatch(taskActions.addTask({ task: res.data.data.item, todoId: todoId }))
        dispatch(appActions.setAppInfo({ info: 'task is added' }))
      } else {
        dispatch(appActions.setAppError({ error: res.data.messages[0] }))
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      }
    } catch (err) {
      dispatch(appActions.setAppStatus({ status: 'failed' }))
      dispatch(appActions.setAppError({ error: (err as Error).message }))
    }
  }
)

const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (
    {
      domainModel,
      taskId,
      todoId,
    }: { domainModel: RequestTaskUpdateType; taskId: string; todoId: string },
    thunkAPI
  ) => {
    const { dispatch, getState } = thunkAPI
    const state = getState() as AppMainType
    const task = state.task[todoId].find(t => t.id === taskId)

    if (!task) {
      console.warn('task not found in the state')

      return
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

    dispatch(appActions.setAppStatus({ status: 'loading' }))
    await tasksApi.updateTask(todoId, taskId, apiModel)

    try {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      dispatch(taskActions.updateTask({ task: domainModel, taskId: taskId, todoId: todoId }))
      dispatch(appActions.setAppInfo({ info: 'task is updated' }))
    } catch (err) {
      dispatch(appActions.setAppStatus({ status: 'failed' }))
      dispatch(appActions.setAppError({ error: (err as Error).message }))
    }
  }
)

const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async ({ taskId, todoId }: { taskId: string; todoId: string }, thunkAPI) => {
    const { dispatch } = thunkAPI

    dispatch(appActions.setAppStatus({ status: 'loading' }))
    await tasksApi.deleteTask(todoId, taskId)

    try {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      dispatch(taskActions.deleteTask({ taskId, todoId }))
      dispatch(appActions.setAppInfo({ info: 'task is deleted' }))
    } catch (err) {
      dispatch(appActions.setAppStatus({ status: 'failed' }))
      dispatch(appActions.setAppError({ error: (err as Error).message }))
    }
  }
)

export const tasksThunks = { addTask, deleteTask, setTasks, updateTask }

// -----------------------------------------------------
// -----------------------------------------------------
// -----------------------------------------------------
// -----------------------------------------------------
// -----------------------------------------------------
// -----------------------------------------------------
// -----------------------------------------------------
// -----------------------------------------------------
// это можно будет потом удалить
export const _setTasksTC = (todoId: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: 'loading' }))
  // dispatch(appActions.setAppError({ error: null }))
  tasksApi
    .getTasks(todoId)
    .then(res => {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      dispatch(taskActions.setTasks({ tasks: res.data.items, todoId: todoId }))
    })
    .catch(err => {
      dispatch(appActions.setAppStatus({ status: 'failed' }))
      dispatch(appActions.setAppError({ error: err.message }))
    })
}
export const _addTaskTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: 'loading' }))
  tasksApi
    .addTask(todoId, title)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        dispatch(taskActions.addTask({ task: res.data.data.item, todoId: todoId }))
        dispatch(appActions.setAppInfo({ info: 'task is added' }))
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

export const _updateTaskTC =
  (todolistId: string, taskId: string, domainModel: RequestTaskUpdateType) =>
  (dispatch: Dispatch, getState: () => AppMainType) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    const state = getState()
    const task = state.task[todolistId].find(t => t.id === taskId)

    if (!task) {
      console.warn('task not found in the state')

      return
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

    tasksApi
      .updateTask(todolistId, taskId, apiModel)
      .then(() => {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        dispatch(taskActions.updateTask({ task: domainModel, taskId: taskId, todoId: todolistId }))
        dispatch(appActions.setAppInfo({ info: 'task is updated' }))
      })
      .catch(err => {
        dispatch(appActions.setAppStatus({ status: 'failed' }))
        dispatch(appActions.setAppError({ error: err.message }))
      })
  }

export const _deleteTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: 'loading' }))
  tasksApi
    .deleteTask(todoId, taskId)
    .then(() => {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      dispatch(taskActions.deleteTask({ taskId, todoId }))
      dispatch(appActions.setAppInfo({ info: 'task is deleted' }))
    })
    .catch(err => {
      dispatch(appActions.setAppStatus({ status: 'failed' }))
      dispatch(appActions.setAppError({ error: err.message }))
    })
}
