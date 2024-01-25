import { ChangeEvent, FC, useState } from 'react'

import { CustomButton } from '@/components/customButton/CustomButton'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

type CustomInputPropsType = {
  onChange?: (value: string) => void
  placeholder?: string
  type?: 'checkbox' | 'email' | 'password' | 'text'
  value: string
}
export const CustomInput: FC<CustomInputPropsType> = ({
  onChange,
  placeholder,
  type,
  value,
}: CustomInputPropsType) => {
  const [visible, setVisible] = useState(false)

  const onChangeVisibility = () => setVisible(prevState => !prevState)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => onChange?.(e.currentTarget.value)

  const condition =
    type === 'password' &&
    (visible ? (
      <CustomButton
        heightIcon={'14px'}
        iconId={'visible'}
        onClick={onChangeVisibility}
        viewBoxForIcon={'0 0 14 14'}
        widthIcon={'14px'}
      />
    ) : (
      <CustomButton
        heightIcon={'14px'}
        iconId={'hidden'}
        onClick={onChangeVisibility}
        viewBoxForIcon={'0 0 14 14'}
        widthIcon={'14px'}
      />
    ))

  return (
    <Wrap>
      <StyleInput
        onChange={onChangeHandler}
        placeholder={placeholder}
        type={type === 'password' && !visible ? 'password' : 'text'}
        value={value}
      />
      {condition}
    </Wrap>
  )
}
const Wrap = styled.div`
  //max-width: 500px;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: border-color 0.7s;
  background-color: #363636;
  display: flex;

  &:focus-within {
    box-shadow: 0 2px 10px 0 #1a1a1a;
    transition: border-color 0.7s;
    border: 1px solid royalblue;
    caret-color: white;
  }
`
const StyleInput = styled.input`
  padding: 12px 8px;
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: whitesmoke;
`
