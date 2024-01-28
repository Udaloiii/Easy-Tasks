import { FC } from 'react'

import { FilterValuesType } from '@/store/reducers/todo-reducer'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

type ButtonFilterPropsType = {
  filter?: FilterValuesType
  onClick?: (value: FilterValuesType) => void
  title: FilterValuesType
}
export const ButtonFilter: FC<ButtonFilterPropsType> = ({
  filter,
  onClick,
  title,
}: ButtonFilterPropsType) => {
  return (
    <StyleButton active={filter === title} onClick={() => onClick?.(title)}>
      <span>{title}</span>
    </StyleButton>
  )
}

const StyleButton = styled.button<{ active: boolean }>`
  font-size: 17px;
  font-weight: bold;
  border: none;
  border-radius: 14px;
  background: #000000;
  padding: 0;

  & span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 40px;
    box-sizing: border-box;
    border: ${props => (props.active ? 'none' : '2px solid #000000')};
    border-radius: 14px;
    background: ${props => (props.active ? 'royalblue' : '#e8e8e8')};
    color: ${props => (props.active ? 'whitesmoke' : '#000000')};
    transform: ${props => (props.active ? 'translateY(0)' : 'translateY(-0.3em)')};
    transition: transform 0.4s ease;
    box-shadow: ${props => (props.active ? '0 0 10px 1px grey' : '#000000')};
  }

  &:hover {
    & span {
      transform: ${props => (props.active ? 'translateY(0)' : 'translateY(-0.5em)')};
    }
  }

  &:active {
    & span {
      transform: translateY(0);
      transition: transform 0.2s ease;
    }
  }
`
