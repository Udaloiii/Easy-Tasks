import { ReactNode, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

type TooltipProps = {
  children?: ReactNode
  text: string
}

export const Tooltip = ({ children, text }: TooltipProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const tooltipVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  const tooltipTransition = {
    duration: 0.2,
  }

  return (
    <TooltipContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      <AnimatePresence>
        {isHovered && (
          <TooltipText
            animate={'visible'}
            exit={{ opacity: 0, y: 10 }}
            initial={'hidden'}
            transition={tooltipTransition}
            variants={tooltipVariants}
          >
            {text}
          </TooltipText>
        )}
      </AnimatePresence>
    </TooltipContainer>
  )
}

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`

const TooltipText = styled(motion.div)`
  position: absolute;
  top: -10px;
  right: -110px;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.1);
  color: #fff;
  padding: 0.5rem;
  border-radius: 4px;
  opacity: 0;
  box-shadow: 0 0 3px 0 royalblue;
`
