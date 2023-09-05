// type of todolist from the backend
export type TodolistsFromBack = {
  id: string
  addedDate: string
  order: number
  title: string
}

// main type of response
export type ResponseType<T = {}> = {
  data: T
  resultCode: number
  messages: []
  fieldsErrors: []
}

// type of task from the backend
export type TasksFromBack = {
  description: string
  title: string
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

// type for response from getTasks
export type TasksResponse = {
  items: TasksFromBack[]
  error: string | null
}
