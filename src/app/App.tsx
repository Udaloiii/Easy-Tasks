import s from './app.module.scss'

import { ItemAddingForm } from '@/common'
import { Todolist } from '@/ui/todolist/todolist.tsx'

export function App() {
  return (
    <div className={s.mainBlock}>
      <ItemAddingForm />
      <Todolist />
      <Todolist />
      <Todolist />
      <Todolist />
      <Todolist />
    </div>
  )
}
