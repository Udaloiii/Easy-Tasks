import style from './todolistBox.module.scss'

import { Todolist } from '@/ui/todolist/todolist.tsx'

export const TodolistBox = () => {
  return (
    <div className={style.wrapper}>
      <Todolist />
      <Todolist />
      <Todolist />
      <Todolist />
      <Todolist />
    </div>
  )
}
