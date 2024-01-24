import { TaskResponseType } from '@/api/tasks-api'
import { setTodosAC } from '@/store/reducers/todo-reducer'

export type TasksType = { taskStatus: any } & TaskResponseType // потом заменить any на статус из app-reducer
export type TaskStateType = {
  [key: string]: TasksType[]
}
type ActionType =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof deleteTaskAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof setTodosAC>
  | ReturnType<typeof updateTaskStatusAC>
  | ReturnType<typeof updateTaskTitleAC>

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

    case 'UPDATE-TASK-TITLE':
      return {
        ...state,
        [action.todoId]: state[action.todoId].map(task =>
          task.id === action.taskId
            ? {
                ...task,
                title: action.newTitle,
              }
            : task
        ),
      }

    case 'UPDATE-TASK-STATUS':
      return {
        ...state,
        [action.todoId]: state[action.todoId].map(task =>
          task.id === action.taskId
            ? {
                ...task,
                completed: action.newStatus,
              }
            : task
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

export const updateTaskTitleAC = (todoId: string, taskId: string, newTitle: string) => {
  return { newTitle, taskId, todoId, type: 'UPDATE-TASK-TITLE' } as const
}

export const updateTaskStatusAC = (todoId: string, taskId: string, newStatus: boolean) => {
  return { newStatus, taskId, todoId, type: 'UPDATE-TASK-STATUS' } as const
}
