import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { AddItemForm } from '@/components/addItemForm/AddItemForm'
import { Loader } from '@/components/loader/Loader'
import { Todolist } from '@/layout/todolist/Todolist'
import { AppStatusType } from '@/store/reducers/app-reducer'
import { TodolistType, addTodoTC, setTodoTC } from '@/store/reducers/todo-reducer'
import { AppMainType, useAppDispatch } from '@/store/store'
import { AnimatePresence } from 'framer-motion'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

export function App() {
  const todos = useSelector<AppMainType, TodolistType[]>(state => state.todolist)
  const appStatus = useSelector<AppMainType, AppStatusType>(state => state.app.status)
  const dispatch = useAppDispatch()

  const addTodolist = (title: string) => dispatch(addTodoTC(title))

  useEffect(() => {
    dispatch(setTodoTC())
  }, [dispatch])

  return (
    <div>
      <FormWrap>
        <AddItemForm
          onClick={addTodolist}
          placeholder={'create you todolist'}
          textForSnackbar={'todo is added'}
        />
      </FormWrap>
      {<AnimatePresence>{appStatus === 'loading' && <Loader />}</AnimatePresence>}
      <TodoWrap>
        {todos.map(el => (
          <Todolist filter={el.filter} id={el.id} key={el.id} title={el.title} />
        ))}
      </TodoWrap>
    </div>
  )
}

const FormWrap = styled.div`
  padding: 30px 0 100px;

  input {
    min-width: 500px;
    font-size: 1rem;
  }
`
const TodoWrap = styled.div`
  margin: 0 auto;
  max-width: 1350px;
  display: flex;
  gap: 60px;
  flex-wrap: wrap;
  padding: 0 0 50px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`
