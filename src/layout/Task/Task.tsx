import { FC, memo, useCallback } from 'react'

import { TaskStatuses } from '@/api/tasks-api'
import { Checkbox } from '@/components/checkbox/Checkbox'
import { CustomButton } from '@/components/customButton/CustomButton'
import { EditableSpan } from '@/components/editableSpan/EditableSpan'
import { deleteTaskTC, updateTaskTC } from '@/store/reducers/task-reducer'
import { useAppDispatch } from '@/store/store'
import { motion } from 'framer-motion'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

type TaskPropsType = {
  id: string
  isDone: boolean
  title: string
  todoId: string
}
export const Task: FC<TaskPropsType> = memo(({ id, isDone, title, todoId }: TaskPropsType) => {
  const dispatch = useAppDispatch()

  const updateTaskStatus = useCallback(
    (status: TaskStatuses) => {
      dispatch(updateTaskTC(todoId, id, { status }))
    },
    [dispatch, id, todoId]
  )

  const changeTaskTitle = useCallback(
    (title: string) => dispatch(updateTaskTC(todoId, id, { title })),
    [dispatch, id, todoId]
  )
  const removeTask = useCallback(() => dispatch(deleteTaskTC(todoId, id)), [dispatch, id, todoId])

  return (
    <Container
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      layout
      transition={{
        delay: 0.1,
        duration: 0.3,
      }}
    >
      <Checkbox checked={isDone} onchange={updateTaskStatus} />
      <Text isDone={isDone}>
        <EditableSpan isDone={isDone} onClick={changeTaskTitle} text={title} />
      </Text>
      <CustomButton heightIcon={'25px'} iconId={'delete'} onClick={removeTask} widthIcon={'25px'} />
    </Container>
  )
})

const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;

  button {
    margin-left: auto;
  }
`
const Text = styled.p<{ isDone: boolean }>`
  font-family:
    Open Sans,
    sans-serif;
  max-width: 100%;
  color: ${props => (props.isDone ? 'grey' : 'whitesmoke')};
  font-size: 1.2rem;
  filter: ${props => (props.isDone ? 'blur(1px)' : '')};
  transform: ${props => (props.isDone ? 'scale(0.9)' : '')};
  transition: 0.5s;
  user-select: ${props => (props.isDone ? 'none' : '')};

  button {
    padding-top: 6px;
  }
`
