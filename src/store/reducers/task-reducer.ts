import { RequestTaskUpdateType, TaskResponseType, tasksApi } from '@/api/tasks-api'
import { addTodoAC, setTodosAC } from '@/store/reducers/todo-reducer'
import { AppMainType } from '@/store/store'
import { Dispatch } from 'redux'

export type TasksType = { taskStatus: any } & TaskResponseType // потом заменить any на статус из app-reducer
export type TaskStateType = {
  [key: string]: TasksType[]
}
type ActionType =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof addTodoAC>
  | ReturnType<typeof deleteTaskAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof setTodosAC>
  | ReturnType<typeof updateTaskAC>

const initialState = {} as TaskStateType

export const taskReducer = (state = initialState, action: ActionType): TaskStateType => {
  switch (action.type) {
    case 'SET-TODOS': {
      const copyState = { ...state }

      action.todolists.forEach(todo => {
        copyState[todo.id] = []
      })

      return copyState
    }

    case 'ADD-TODO': {
      return { ...state, [action.todo.id]: [] }
    }

    case 'ADD-TASK': {
      const newTask: TasksType = { ...action.task, taskStatus: 'all' }

      return { ...state, [action.todoId]: [newTask, ...state[action.todoId]] }
    }

    case 'SET-TASKS':
      return {
        ...state,
        [action.todoId]: action.tasks.map(task => ({ ...task, taskStatus: 'idle' })),
      }

    case 'DELETE-TASK':
      return {
        ...state,
        [action.todoId]: state[action.todoId].filter(task => task.id !== action.taskId),
      }

    case 'UPDATE-TASK':
      return {
        ...state,
        [action.todoId]: state[action.todoId].map(t =>
          t.id === action.taskId ? { ...t, ...action.task } : t
        ),
      }

    default:
      return state
  }
}

// Action creators

export const setTasksAC = (todoId: string, tasks: TaskResponseType[]) => {
  return { tasks, todoId, type: 'SET-TASKS' } as const
}

export const addTaskAC = (todoId: string, task: TaskResponseType) => {
  return { task, todoId, type: 'ADD-TASK' } as const
}

export const deleteTaskAC = (todoId: string, taskId: string) => {
  return { taskId, todoId, type: 'DELETE-TASK' } as const
}

export const updateTaskAC = (todoId: string, taskId: string, task: RequestTaskUpdateType) => {
  return { task, taskId, todoId, type: 'UPDATE-TASK' } as const
}

// THUNKS

export const setTasksTC = (todoId: string) => (dispatch: Dispatch) => {
  tasksApi
    .getTasks(todoId)
    .then(res => {
      dispatch(setTasksAC(todoId, res.data.items))
    })
    .catch(err => console.warn(err))
}
export const addTaskTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
  tasksApi
    .addTask(todoId, title)
    .then(res => {
      dispatch(addTaskAC(todoId, res.data.data.item))
    })
    .catch(err => console.warn(err))
}

export const updateTaskTC =
  (todolistId: string, taskId: string, domainModel: RequestTaskUpdateType) =>
  (dispatch: Dispatch, getState: () => AppMainType) => {
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
        dispatch(updateTaskAC(todolistId, taskId, domainModel))
      })
      .catch(err => {
        console.warn(err)
      })
  }

export const deleteTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
  tasksApi
    .deleteTask(todoId, taskId)
    .then(() => {
      dispatch(deleteTaskAC(todoId, taskId))
    })
    .catch(err => {
      console.warn(err)
    })
}
