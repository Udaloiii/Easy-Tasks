import { FC } from 'react'

import { ButtonFilter } from '@/layout/todolists/buttonsFilterBox/buttonFilter/ButtonFilter'
import { FilterValuesType } from '@/store/reducers/todo-reducer'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

type ButtonsFilterBoxPropsType = {
  filter?: FilterValuesType
  onClick?: (value: FilterValuesType) => void
}
export const ButtonsFilterBox: FC<ButtonsFilterBoxPropsType> = ({
  filter,
  onClick,
}: ButtonsFilterBoxPropsType) => {
  const arrOfFilterValues: FilterValuesType[] = ['all', 'active', 'completed']

  return (
    <ButtonsWrap>
      {arrOfFilterValues.map((btn, index) => (
        <ButtonFilter filter={filter} key={index} onClick={onClick} title={btn} />
      ))}
    </ButtonsWrap>
  )
}

const ButtonsWrap = styled.div`
  padding: 20px 0 15px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`
