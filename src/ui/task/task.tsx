import s from './task.module.scss'

const Task = () => {
  return (
    <div className={s.mainBlock}>
      <input className={s.input} type="checkbox" />
      <span className={s.text}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque autem dicta, dolore
        dolorem eligendi eos error facere fugiat harum illum ipsum, nihil nobis nostrum obcaecati
        possimus reiciendis vitae voluptate.
      </span>
      <button className={s.button}>x</button>
    </div>
  )
}

export default Task
