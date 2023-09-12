import s from './itemAddingForm.module.scss'
export const ItemAddingForm = () => {
  return (
    <div className={s.wrapper}>
      <input className={s.input} type="text" placeholder={'Enter the title'} />
      <button className={s.button}>ADD</button>
    </div>
  )
}
