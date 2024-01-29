import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'

import { CustomButton } from '@/components/customButton/CustomButton'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

type CustomInputPropsType = {
  autofocus?: boolean
  onBlurClick?: (text: string) => void
  onChange?: (value: string) => void
  onEnterPress?: (value: string) => void
  padding?: string
  placeholder?: string
  type?: 'checkbox' | 'email' | 'password' | 'text'
  value: string
}
export const CustomInput: FC<CustomInputPropsType> = ({
  autofocus,
  onBlurClick,
  onChange,
  onEnterPress,
  padding,
  placeholder,
  type,
  value,
}: CustomInputPropsType) => {
  const [visible, setVisible] = useState(false)

  const onChangeVisibility = () => setVisible(prevState => !prevState)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => onChange?.(e.currentTarget.value)
  const onBlurHandler = () => onBlurClick?.(value)

  const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnterPress?.(e.currentTarget.value)
      e.currentTarget.blur()
    }
  }

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
        autoFocus={autofocus || false}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
        onKeyDown={onPressEnter}
        padding={padding}
        placeholder={placeholder}
        type={type === 'password' && !visible ? 'password' : 'text'}
        value={value}
      />
      {condition}
    </Wrap>
  )
}
const Wrap = styled.div`
  border: 1px solid transparent;
  border-radius: 4px;
  transition: border-color 0.7s;
  background-color: #363636;
  display: flex;
  width: 100%;
  max-width: 550px;

  &:focus-within {
    box-shadow: 0 2px 10px 0 #1a1a1a;
    transition: border-color 0.7s;
    border: 1px solid royalblue;
    caret-color: white;
  }
`
const StyleInput = styled.input<{ padding?: string }>`
  padding: ${props => props.padding || '12px 8px'};
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: whitesmoke;
`
