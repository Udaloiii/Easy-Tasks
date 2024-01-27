import { FC } from 'react'

import { TaskStatuses } from '@/api/tasks-api'
import { Checkbox } from '@/components/checkbox/Checkbox'
import { CustomButton } from '@/components/customButton/CustomButton'
import { EditableSpan } from '@/components/editableSpan/EditableSpan'
import { deleteTaskTC, updateTaskTC } from '@/store/reducers/task-reducer'
import { useAppDispatch } from '@/store/store'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

type TaskPropsType = {
  id: string
  isDone: boolean
  title: string
  todoId: string
}
export const Task: FC<TaskPropsType> = ({ id, isDone, title, todoId }: TaskPropsType) => {
  const dispatch = useAppDispatch()

  const updateTaskStatus = (status: TaskStatuses) => {
    dispatch(updateTaskTC(todoId, id, { status }))
  }

  const changeTaskTitle = (title: string) => dispatch(updateTaskTC(todoId, id, { title }))
  const removeTask = () => dispatch(deleteTaskTC(todoId, id))

  return (
    <Container>
      <Checkbox checked={isDone} onChange={updateTaskStatus} />
      <Text isDone={isDone}>
        <EditableSpan onClick={changeTaskTitle} text={title} />
      </Text>
      <CustomButton heightIcon={'30px'} iconId={'delete'} onClick={removeTask} widthIcon={'30px'} />
    </Container>
  )
}

const Container = styled.div`
  padding: 0 10px;
  width: 100%;
  display: flex;
  gap: 15px;
  align-items: center;

  button {
    margin-left: auto;
  }
`
const Text = styled.p<{ isDone: boolean }>`
  max-width: 100%;
  color: whitesmoke;
  font-size: 1.2rem;
  filter: ${props => (props.isDone ? 'blur(1px)' : '')};
  transform: ${props => (props.isDone ? 'scale(0.9)' : '')};
  transition: 0.5s;

  button {
    padding-top: 6px;
  }
`
