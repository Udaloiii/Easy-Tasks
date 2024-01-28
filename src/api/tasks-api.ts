import { MainResponseType, instance } from '@/api/main-instance-api'

// тип таски, получаемой из сервера
export type TaskResponseType = {
  addedDate: string
  completed: boolean
  deadline: string
  description: string
  id: string
  order: number
  priority: number
  startDate: string
  status: TaskStatuses
  title: string
  todoListId: string
}
type ResponseGetTaskType = {
  error: string
  items: TaskResponseType[]
  totalCount: number
}

// тип для отправки таски на сервер для обновления
export type RequestTaskUpdateType = {
  completed?: boolean
  deadline?: string
  description?: string
  priority?: number
  startDate?: string
  status?: TaskStatuses
  title?: string
}

export enum TaskStatuses {
  Completed = 2,
  Draft = 3,
  InProgress = 1,
  New = 0,
}
export const tasksApi = {
  addTask(todoId: string, title: string) {
    return instance.post<MainResponseType<{ item: TaskResponseType }>>(
      `todo-lists/${todoId}/tasks`,
      { title }
    )
  },
  deleteTask(todoId: string, taskId: string) {
    return instance.delete<MainResponseType>(`todo-lists/${todoId}/tasks/${taskId}`)
  },
  getTasks(todoId: string) {
    return instance.get<ResponseGetTaskType>(`todo-lists/${todoId}/tasks`)
  },
  updateTask(todoId: string, taskId: string, task: RequestTaskUpdateType) {
    return instance.put<MainResponseType<{ item: TaskResponseType }>>(
      `todo-lists/${todoId}/tasks/${taskId}`,
      task
    )
  },
}
