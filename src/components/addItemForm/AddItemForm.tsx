import { FC, useEffect, useState } from 'react'

import { CustomButton } from '@/components/customButton/CustomButton'
import { CustomInput } from '@/components/customInput/CustomInput'
import { Snackbar } from '@/components/snackbar/Snackbar'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

type AddItemFormPropsType = {
  onClick?: (title: string) => void
  padding?: string
  placeholder?: string
  textForSnackbar?: string
  width?: string
}
export const AddItemForm: FC<AddItemFormPropsType> = ({
  onClick,
  padding,
  placeholder,
  textForSnackbar,
  width,
}: AddItemFormPropsType) => {
  const [value, setValue] = useState('')
  const [success, setSuccess] = useState(false)
  const addItemHandler = () => {
    if (value.trim() !== '') {
      onClick?.(value)
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
    <Wrap width={width}>
      <CustomInput
        onChange={setValue}
        onEnterPress={addItemHandler}
        padding={padding}
        placeholder={placeholder}
        value={value}
      />
      <CustomButton
        color={'royalblue'}
        heightIcon={'35px'}
        iconId={'add'}
        onClick={addItemHandler}
        viewBoxForIcon={'0 0 20 20'}
        widthIcon={'35px'}
      />
      <Snackbar sendSuccess={success} text={textForSnackbar} />
    </Wrap>
  )
}

const Wrap = styled.div<{ width?: string }>`
  width: ${props => props.width || '100%'};
  display: flex;
  gap: 20px;
  justify-content: center;
`
