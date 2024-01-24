import { MainResponseType, instance } from '@/api/main-instance-api'

export type ResponseGetTodosType = {
  addedDate: string
  id: string
  order: number
  title: string
}
export const todosApi = {
  addTodo(title: string) {
    return instance.post<MainResponseType<{ item: ResponseGetTodosType }>>('todo-lists', { title })
  },
  changeTodoTitle(todoId: string, title: string) {
    return instance.put<MainResponseType>(`todo-lists/${todoId}`, { title })
  },
  deleteTodo(todoId: string) {
    return instance.delete<MainResponseType>(`todo-lists/${todoId}`)
  },
  getTodo() {
    return instance.get<ResponseGetTodosType[]>('todo-lists')
  },
}
