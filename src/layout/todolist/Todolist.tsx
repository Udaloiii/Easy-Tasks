import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { tasksApi } from '@/api/tasks-api'
import { Task } from '@/layout/Task/Task'
import { TaskStateType, setTasksAC } from '@/store/reducers/task-reducer'
import { AppMainType } from '@/store/store'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

type TodolistPropsType = {
  id: string
  title: string
}
export const Todolist: FC<TodolistPropsType> = ({ id, title }: TodolistPropsType) => {
  const allTasks = useSelector<AppMainType, TaskStateType>(state => state.task)
  const tasksForTodo = allTasks[id]
  const dispatch = useDispatch()

  useEffect(() => {
    tasksApi.getTasks(id).then(res => {
      dispatch(setTasksAC(id, res.data.items))
    })
  }, [dispatch, id])

  return (
    <Container>
      <Title>{title}</Title>
      {tasksForTodo?.map(task => <Task key={task.id} title={task.title} />)}
    </Container>
  )
}

const Container = styled.div`
  width: 350px;
  min-height: 150px;
  height: max-content;
  border-radius: 10px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  padding: 0 15px;

  background-color: #212121;
  background-image: radial-gradient(rgba(255, 255, 255, 0.171) 2px, transparent 0);
  background-size: 30px 30px;
  background-position: -5px -5px;

  box-shadow: 0 3px 10px 0 #dedede;
`
const Title = styled.h2`
  color: whitesmoke;
  align-self: center;
`
