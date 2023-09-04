import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
})

export const todolistApi = {
  getTodolists() {
    return instance.get('todo-lists')
  },
  createTodolist(title: string) {
    const body = {
      title: title,
    }

    return instance.post('todo-lists', body)
  },
  deleteTodolist(todolistId: string) {
    return instance.delete(`todo-lists/${todolistId}`)
  },
  updateTodolist(todolistId: string, newTitle: string) {
    const body = {
      title: newTitle,
    }

    return instance.put(`todo-lists/${todolistId}`, body)
  },
}

export const taskApi = {
  getTasks(todolistId: string) {
    return instance.get(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    const body = {
      title: title,
    }

    return instance.post(`todo-lists/${todolistId}/tasks`, body)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, newTitle: string) {
    const body = {
      title: newTitle,
    }

    return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, body)
  },
}
