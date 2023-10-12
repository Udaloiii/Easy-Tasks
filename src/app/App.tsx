import s from './app.module.scss'

import { ItemAddingForm } from '@/common'
import { TodolistBox } from '@/ui/todolistBox/TodolistBox.tsx'

export function App() {
  return (
    <div className={s.mainBlock}>
      <ItemAddingForm />
      <TodolistBox />
    </div>
  )
}
