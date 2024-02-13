import { FC, memo } from 'react'

import icon from '../../assets/icons/svgSprite.svg'

type IconPropsType = {
  height?: string
  iconId: string
  viewBox?: string
  width?: string
}
export const Icon: FC<IconPropsType> = memo(({ height, iconId, viewBox, width }: IconPropsType) => {
  return (
    <svg
      height={height || '24'}
      viewBox={viewBox || '0 0 24 24'}
      width={width || '24'}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <use xlinkHref={`${icon}#${iconId}`}></use>
    </svg>
  )
})
