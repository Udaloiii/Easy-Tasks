import { FC, memo } from 'react'

import { Icon } from '@/components/icon/Icon'
import { motion } from 'framer-motion'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

type ButtonPropsType = {
  color?: string
  heightIcon?: string
  iconId: string
  onClick?: () => void
  title?: string
  type?: 'button' | 'reset' | 'submit'
  viewBoxForIcon?: string
  widthIcon?: string
}
export const CustomButton: FC<ButtonPropsType> = memo(
  ({
    color,
    heightIcon,
    iconId,
    onClick,
    title,
    type,
    viewBoxForIcon,
    widthIcon,
  }: ButtonPropsType) => {
    // console.log('BUTTON RENDER')

    return (
      <StyleButton
        animate={{ opacity: 1 }}
        color={color}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        initial={{ opacity: 0 }}
        onClick={onClick}
        transition={{ duration: 0.5 }}
        type={type || 'button'}
      >
        <Title>{title}</Title>
        <Icon height={heightIcon} iconId={iconId} viewBox={viewBoxForIcon} width={widthIcon} />
      </StyleButton>
    )
  }
)

const StyleButton = styled(motion.button)<{ color?: string }>`
  background-color: transparent;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.color || 'white'};
  cursor: pointer;
  transition: 0.3s;
  padding: 0;
  gap: 5px;
  svg {
    transition: 0.3s;
  }

  &:hover {
    transform: scale(1.1);
    transition: 0.2s ease-in-out;
  }

  &:active {
    transform: scale(1);
    transition: 0.2s ease-in-out;
    box-shadow: ${props => (props.color ? '' : '0 0 10px 2px royalblue')};
    border-radius: 20%;
  }
`
const Title = styled.span`
  align-self: center;
  font-family: 'Bahnschrift', sans-serif;
`
