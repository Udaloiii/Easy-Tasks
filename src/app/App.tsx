import { Todolist } from '../ui/todolist/todolist.tsx'

import s from './app.module.scss'

export function App() {
  return (
    <div className={s.mainBlock}>
      <Todolist />
      <Todolist />
      <Todolist />
      <Todolist />
      <Todolist />
      <Todolist />
    </div>
  )
}
