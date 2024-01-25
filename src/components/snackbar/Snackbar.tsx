import { FC } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

type SnackbarPropsType = {
  sendSuccess?: boolean
  text?: string
}
export const Snackbar: FC<SnackbarPropsType> = ({ sendSuccess, text }: SnackbarPropsType) => {
  const variants = {
    exit: { opacity: 0, y: 100 },
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  }

  const transition = {
    duration: 0.3,
    y: { stiffness: 1000, velocity: -100 },
  }

  return (
    <AnimatePresence>
      {sendSuccess && (
        <SendInfo
          animate={sendSuccess ? 'visible' : 'exit'}
          exit={'exit'}
          initial={'hidden'}
          transition={transition}
          variants={variants}
        >
          {text}
        </SendInfo>
      )}
    </AnimatePresence>
  )
}

const SendInfo = styled(motion.div)`
  position: fixed;
  bottom: 80px;
  left: -50%;
  right: -50%;
  width: max-content;
  border: 1px solid royalblue;
  background-color: rgba(24, 24, 24, 0.9);
  color: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  padding: 20px;
  margin: 0 auto;
  user-select: none;
  z-index: 9;
  font-size: 1.5rem;
`
