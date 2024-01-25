import { FC } from 'react'

import { Icon } from '@/components/icon/Icon'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

type ButtonPropsType = {
  color?: string
  heightIcon?: string
  iconId: string
  onClick?: () => void
  title?: string
  viewBoxForIcon?: string
  widthIcon?: string
}
export const CustomButton: FC<ButtonPropsType> = ({
  color,
  heightIcon,
  iconId,
  onClick,
  viewBoxForIcon,
  widthIcon,
}: ButtonPropsType) => {
  return (
    <StyleButton color={color} onClick={onClick}>
      <Icon height={heightIcon} iconId={iconId} viewBox={viewBoxForIcon} width={widthIcon} />
    </StyleButton>
  )
}

const StyleButton = styled.button<{ color?: string }>`
  background-color: transparent;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.color || 'white'};
  cursor: pointer;
  transition: 0.3s;

  svg {
    transition: 0.3s;
  }

  &:hover {
    svg {
      transform: scale(1.1);
      transition: 0.2s;
    }
  }

  &:active {
    svg {
      transform: scale(0.9);
      transition: 0.2s;
      box-shadow: ${props => (props.color ? '' : '0 0 10px 5px royalblue')};
      border-radius: 50%;
    }
  }
`
