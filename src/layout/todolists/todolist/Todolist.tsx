import { FC, memo, useCallback, useEffect } from 'react'

import { TaskStatuses } from '@/api/tasks-api'
import { AddItemForm } from '@/components/addItemForm/AddItemForm'
import { CustomButton } from '@/components/customButton/CustomButton'
import { EditableSpan } from '@/components/editableSpan/EditableSpan'
import { TasksBox } from '@/layout/tasks/TasksBox'
import { ButtonsFilterBox } from '@/layout/todolists/buttonsFilterBox/ButtonsFilterBox'
import { TasksType, tasksThunks } from '@/store/reducers/task-reducer'
import { FilterValuesType, todoActions, todoThunks } from '@/store/reducers/todo-reducer'
import { useAppDispatch } from '@/store/store'
import { AnimatePresence, motion } from 'framer-motion'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

type TodolistPropsType = {
  filter: FilterValuesType
  id: string
  tasks: TasksType[]
  title: string
}

export const Todolist: FC<TodolistPropsType> = memo(
  ({ filter, id, tasks, title }: TodolistPropsType) => {
    const dispatch = useAppDispatch()
    let filteredTask = tasks

    if (filter === 'active') {
      filteredTask = tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
      filteredTask = tasks.filter(task => task.status === TaskStatuses.Completed)
    }
    // functions
    const addTask = useCallback(
      (title: string) => {
        dispatch(tasksThunks.addTask({ title: title, todoId: id }))
      },
      [dispatch, id]
    )

    const changeTodoTitle = useCallback(
      (title: string) => dispatch(todoThunks.updateTodoTitle({ newTitle: title, todoId: id })),
      [dispatch, id]
    )
    const removeTodo = useCallback(() => dispatch(todoThunks.deleteTodo(id)), [dispatch, id])

    const changeFilterTodo = useCallback(
      (value: FilterValuesType) => {
        dispatch(todoActions.changeTodoFilter({ newValue: value, todoId: id }))
      },
      [dispatch, id]
    )

    useEffect(() => {
      dispatch(tasksThunks.setTasks(id))
    }, [dispatch, id])

    return (
      <Container
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.1 }}
        initial={{
          opacity: 0,
          scale: 0.5,
        }}
        key={id}
        layout
        transition={{
          delay: 0.1,
          duration: 0.3,
        }}
      >
        <span></span>
        <WrapRemoveTodoBtn>
          <CustomButton
            color={'white'}
            heightIcon={'15px'}
            iconId={'remove-todo'}
            onClick={removeTodo}
            viewBoxForIcon={'0 0 1216 1312'}
            widthIcon={'15px'}
          />
        </WrapRemoveTodoBtn>
        <Title>
          <EditableSpan onClick={changeTodoTitle} text={title} />
        </Title>
        <span></span>
        <>
          <AddItemForm
            onClick={addTask}
            padding={'8px'}
            placeholder={'create you tasks'}
            width={'90%'}
          />
          <span></span>
          <AnimatePresence>
            <TasksBox tasks={filteredTask} todoId={id} />
          </AnimatePresence>
          <ButtonsFilterBox filter={filter} onClick={changeFilterTodo} />
        </>
      </Container>
    )
  }
)

const Container = styled(motion.div)`
  position: relative;
  width: 400px;
  min-height: 150px;
  height: max-content;
  border-radius: 10px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 0 15px;

  background-color: #212121;
  background-image: radial-gradient(rgba(255, 255, 255, 0.171) 2px, transparent 0);
  background-size: 30px 30px;
  background-position: -5px -5px;

  box-shadow: 0 1px 5px 0 grey;
`
const Title = styled.h2`
  color: whitesmoke;
  align-self: center;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 1);
`

const WrapRemoveTodoBtn = styled.div`
  position: absolute;
  right: -30px;
  top: -20px;

  &:hover {
    & button {
      transform: rotate(180deg) scale(2);

      svg {
        color: royalblue;
      }
    }
  }
  &:active {
    & button {
      transform: rotate(180deg) scale(1.5);

      svg {
        color: royalblue;
      }
    }
  }

  svg {
    color: rgba(128, 128, 128, 0.2);
  }
`
