import { RequestTaskUpdateType, TaskResponseType, tasksApi } from '@/api/tasks-api'
import { appActions } from '@/store/reducers/app-reducer'
import { todoActions } from '@/store/reducers/todo-reducer'
import { AppMainType } from '@/store/store'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'

export type TasksType = { taskStatus: any } & TaskResponseType // потом заменить any на статус из app-reducer
export type TaskStateType = {
  [key: string]: TasksType[]
}

const slice = createSlice({
  extraReducers: builder => {
    builder
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
  },
  initialState: {} as TaskStateType,
  name: 'tasks',
  reducers: {
    addTask: (state, action: PayloadAction<{ task: TaskResponseType; todoId: string }>) => {
      state[action.payload.todoId].push({ ...action.payload.task, taskStatus: 'all' })
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

export const setTasksTC = (todoId: string) => (dispatch: Dispatch) => {
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
export const addTaskTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
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

export const updateTaskTC =
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

export const deleteTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
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
