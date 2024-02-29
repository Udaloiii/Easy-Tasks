import { FC, memo } from 'react'

import { Task } from '@/layout/tasks/task/Task'
import { TasksType } from '@/store/reducers/task-reducer'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

type TasksBoxPropsType = {
  tasks: TasksType[]
  todoId: string
}
export const TasksBox: FC<TasksBoxPropsType> = memo(({ tasks, todoId }: TasksBoxPropsType) => {
  return (
    <WrapForTasks>
      {tasks.map(task => (
        <Task
          id={task.id}
          isDone={task.status === 2}
          key={task.id}
          title={task.title}
          todoId={todoId}
        />
      ))}
    </WrapForTasks>
  )
})

const WrapForTasks = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
