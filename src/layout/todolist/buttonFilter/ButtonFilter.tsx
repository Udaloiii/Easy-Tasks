import { FC, memo } from 'react'

import { FilterValuesType } from '@/store/reducers/todo-reducer'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

type ButtonFilterPropsType = {
  filter?: FilterValuesType
  onClick?: (value: FilterValuesType) => void
  title: FilterValuesType
}
export const ButtonFilter: FC<ButtonFilterPropsType> = memo(
  ({ filter, onClick, title }: ButtonFilterPropsType) => {
    return (
      <StyleButton active={filter === title} onClick={() => onClick?.(title)} title={title}>
        <span>{title}</span>
      </StyleButton>
    )
  }
)

const StyleButton = styled.button<{ active: boolean; title?: FilterValuesType }>`
  font-size: 17px;
  font-weight: bold;
  border: none;
  border-radius: 14px;
  //background: #000000;
  background: ${props => (props.active ? 'transparent' : '#000000')};
  padding: 0;

  & span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 40px;
    background: rgba(65, 105, 225, 0.5);
    box-sizing: border-box;
    border: ${props => (props.active ? '2px solid royalblue' : '2px solid #000000')};
    border-radius: 14px;
    //background: ${props => (props.active ? '#e8e8e8' : '#e8e8e8')};
    background: ${props => (props.active ? ' rgba(23, 23, 23, 0.5)' : '#e8e8e8')};
    color: ${props => (props.active ? 'royalblue' : '#000000')};
    transform: ${props => (props.active ? 'translateY(0)' : 'translateY(-0.3em)')};
    transition: transform 0.4s ease;
    letter-spacing: ${props => (props.title === 'all' ? '4px' : 'none')};
    text-transform: uppercase;
    font-size: 0.8rem;
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
