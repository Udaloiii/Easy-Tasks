import { ChangeEvent } from 'react'

import { TaskStatuses } from '@/api/tasks-api'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

type CheckboxType = {
  checked: boolean
  onChange: (value: TaskStatuses) => void
}
export const Checkbox = ({ checked, onChange }: CheckboxType) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked

    onChange(checked ? TaskStatuses.Completed : TaskStatuses.New)
  }

  return (
    <Wrapper>
      <StyledInput checked={checked} onChange={onChangeHandler} type={'checkbox'} />
      <svg viewBox={'0 0 64 64'}>
        <path
          d={
            'M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16'
          }
          pathLength={'575.0541381835938'}
        ></path>
      </svg>
    </Wrapper>
  )
}

const Wrapper = styled.label`
  cursor: pointer;
  padding-top: 3px;

  svg {
    overflow: visible;
    width: 20px;
    height: 20px;

    path {
      fill: none;
      stroke: white;
      stroke-width: 6;
      stroke-linecap: round;
      stroke-linejoin: round;
      transition:
        stroke-dasharray 0.5s ease,
        stroke-dashoffset 0.5s ease;
      stroke-dasharray: 241 9999999;
      stroke-dashoffset: 0;
    }
  }

  input:checked + svg path {
    stroke-dasharray: 70.5096664428711 9999999;
    stroke-dashoffset: -262.2723388671875;
    stroke: royalblue;
  }
`

const StyledInput = styled.input`
  display: none;
`
