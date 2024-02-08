import { FC, memo, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { AddItemForm } from '@/components/addItemForm/AddItemForm'
import { CustomButton } from '@/components/customButton/CustomButton'
import { Loader } from '@/components/loader/Loader'
import { Todolist } from '@/layout/todolist/Todolist'
import { AppStatusType } from '@/store/reducers/app-reducer'
import { logOutTC } from '@/store/reducers/auth-reducer'
import { TodolistType, addTodoTC, setTodoTC } from '@/store/reducers/todo-reducer'
import { AppMainType, useAppDispatch } from '@/store/store'
import { AnimatePresence } from 'framer-motion'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

export const TodolistsBox: FC = memo(() => {
  const appStatus = useSelector<AppMainType, AppStatusType>(state => state.app.status)
  const isLoggedIn = useSelector<AppMainType, boolean>(state => state.auth.isLogin)
  const todos = useSelector<AppMainType, TodolistType[]>(state => state.todolist)
  const dispatch = useAppDispatch()

  const addTodolist = useCallback((title: string) => dispatch(addTodoTC(title)), [dispatch])
  const logout = useCallback(() => dispatch(logOutTC()), [dispatch])

  useEffect(() => {
    isLoggedIn && dispatch(setTodoTC())
  }, [dispatch, isLoggedIn])

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      {isLoggedIn && (
        <WrapForBtn>
          <CustomButton
            color={'royalblue'}
            heightIcon={'35px'}
            iconId={'logout'}
            onClick={logout}
            title={'logout'}
            widthIcon={'35px'}
          />
        </WrapForBtn>
      )}
      <FormWrap>
        <AddItemForm onClick={addTodolist} placeholder={'create you todolist'} />
      </FormWrap>
      {<AnimatePresence>{appStatus === 'loading' && <Loader />}</AnimatePresence>}
      <TodoWrap>
        <AnimatePresence>
          {todos.map(el => (
            <Todolist filter={el.filter} id={el.id} key={el.id} title={el.title} />
          ))}
        </AnimatePresence>
      </TodoWrap>
    </>
  )
})
const WrapForBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px;
`
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
