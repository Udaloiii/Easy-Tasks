import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { CustomButton } from '@/components/customButton/CustomButton'
import { CustomInput } from '@/components/customInput/CustomInput'
import { Snackbar } from '@/components/snackbar/Snackbar'
import { FilterValuesType, addTodoAC } from '@/store/reducers/todo-reducer'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

export const AddItemForm: FC = () => {
  const [value, setValue] = useState('')
  const [success, setSuccess] = useState(false)
  const dispatch = useDispatch()
  const addTodoHandler = () => {
    if (value.trim() !== '') {
      const todo = {
        addedDate: 'now',
        filter: 'all' as FilterValuesType,
        id: 'asd-qwe-qw-asd-asd',
        order: 85,
        title: value,
      }

      dispatch(addTodoAC(value, todo))
      setValue('')
      setSuccess(true)
    }
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false)
      }, 4000)
    }
  }, [success])

  return (
    <Wrap>
      <CustomInput onChange={setValue} placeholder={'create you todolist'} value={value} />
      <CustomButton
        color={'royalblue'}
        heightIcon={'35px'}
        iconId={'add'}
        onClick={addTodoHandler}
        viewBoxForIcon={'0 0 20 20'}
        widthIcon={'35px'}
      />
      <Snackbar sendSuccess={success} text={'todo is added'} />
    </Wrap>
  )
}

const Wrap = styled.div`
  display: flex;
  gap: 20px;
`
