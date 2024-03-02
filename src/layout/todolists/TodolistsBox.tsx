import { FC, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import userAvatar from '@/assets/user.jpg'
import { AddItemForm } from '@/components/addItemForm/AddItemForm'
import { CustomButton } from '@/components/customButton/CustomButton'
import { Loader } from '@/components/loader/Loader'
import { Tooltip } from '@/components/tooltip/Tooltip'
import { Todolist } from '@/layout/todolists/todolist/Todolist'
import { AppStatusType } from '@/store/reducers/app-reducer'
import { authThunks } from '@/store/reducers/auth-reducer'
import { TaskStateType } from '@/store/reducers/task-reducer'
import { TodolistType, todoThunks } from '@/store/reducers/todo-reducer'
import { AppMainType, useAppDispatch } from '@/store/store'
import { AnimatePresence } from 'framer-motion'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

export const TodolistsBox: FC = () => {
  const username = useSelector<AppMainType, string>(state => state.auth.userName)
  const appStatus = useSelector<AppMainType, AppStatusType>(state => state.app.status)
  const isLoggedIn = useSelector<AppMainType, boolean>(state => state.auth.isLogin)
  const todos = useSelector<AppMainType, TodolistType[]>(state => state.todolist)
  const tasks = useSelector<AppMainType, TaskStateType>(state => state.task)
  const dispatch = useAppDispatch()

  const addTodolist = useCallback(
    (title: string) => dispatch(todoThunks.addTodo(title)),
    [dispatch]
  )
  const logout = useCallback(() => dispatch(authThunks.logOut()), [dispatch])

  useEffect(() => {
    isLoggedIn && dispatch(todoThunks.setTodo())
    !username &&
      setTimeout(() => {
        dispatch(authThunks.authMe())
      }, 0)
  }, [dispatch, username, isLoggedIn])

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    username && (
      <>
        <WrapForUserInfo>
          <WrapUserInfo>
            <UserPhoto src={userAvatar} />
            <Tooltip text={'да, это ты :)'}>
              <UserName>{username}</UserName>
            </Tooltip>
          </WrapUserInfo>
          <CustomButton
            color={'royalblue'}
            heightIcon={'35px'}
            iconId={'logout'}
            onClick={logout}
            title={'logout'}
            widthIcon={'35px'}
          />
        </WrapForUserInfo>
        <FormWrap>
          <AddItemForm onClick={addTodolist} placeholder={'create you todolist'} />
        </FormWrap>
        {<AnimatePresence>{appStatus === 'loading' && <Loader />}</AnimatePresence>}
        <TodoWrap>
          <AnimatePresence>
            {todos.map(el => {
              const allTodolistTasks = tasks[el.id]

              return (
                <Todolist
                  filter={el.filter}
                  id={el.id}
                  key={el.id}
                  tasks={allTodolistTasks}
                  title={el.title}
                />
              )
            })}
          </AnimatePresence>
        </TodoWrap>
      </>
    )
  )
}
const WrapForUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 15px;
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

const UserPhoto = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`
const UserName = styled.span`
  color: whitesmoke;
  font-size: 1.3rem;
  text-transform: capitalize;
  align-self: flex-end;
  line-height: 1;
`
const WrapUserInfo = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 15px;
`
