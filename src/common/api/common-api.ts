import axios from 'axios'

import {
  ResponseType,
  TasksFromBack,
  TasksResponse,
  TodolistsFromBack,
} from '@/common/api/types-for-response-api.ts'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
})

export const todolistApi = {
  getTodolists() {
    return instance.get<TodolistsFromBack[]>('todo-lists')
  },
  createTodolist(title: string) {
    const body = {
      title: title,
    }

    return instance.post<ResponseType<{ item: TodolistsFromBack }>>('todo-lists', body)
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },
  updateTodolist(todolistId: string, newTitle: string) {
    const body = {
      title: newTitle,
    }

    return instance.put<ResponseType>(`todo-lists/${todolistId}`, body)
  },
}

export const taskApi = {
  getTasks(todolistId: string) {
    return instance.get<TasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    const body = {
      title: title,
    }

    return instance.post<ResponseType<{ item: TasksFromBack }>>(
      `todo-lists/${todolistId}/tasks`,
      body
    )
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, newTitle: string) {
    const body = {
      title: newTitle,
    }

    return instance.put<ResponseType<{ item: TasksFromBack }>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      body
    )
  },
}

export const authApi = {
  authMe() {
    return instance.get<
      ResponseType<{
        id: number
        email: string
        login: string
      }>
    >('auth/me')
  },
  login(email: string, password: string) {
    const body = {
      email: email,
      password: password,
    }

    return instance.post<
      ResponseType<{
        userId: number
      }>
    >('auth/login', body)
  },
  logOut() {
    return instance.delete<ResponseType>('auth/login')
  },
}
