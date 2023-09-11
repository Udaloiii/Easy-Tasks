import Task from '../task/task.tsx'

import s from './todolist.module.scss'
export const Todolist = () => {
  return (
    <div className={s.mainBlock}>
      <div className={s.title}>
        <h3>Title</h3>
      </div>
      <Task />
      <Task />
      <Task />
      <div className={s.buttonsBlock}>
        <button className={s.button}>all</button>
        <button className={s.button}>active</button>
        <button className={s.button}>completed</button>
      </div>
    </div>
  )
}
