import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import img from '@/assets/images/404.png'
import { CustomButton } from '@/components/customButton/CustomButton'
import { AnimatePresence, motion } from 'framer-motion'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

export const Page404: FC = () => {
  return (
    <AnimatePresence>
      <Container
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0, scale: 0.1, y: -700 }}
        transition={{
          delay: 0.1,
          duration: 1,
        }}
      >
        <NavLink to={'/'}>
          <WrapForBtn>
            <Text>go home</Text>
            <CustomButton
              color={'royalblue'}
              heightIcon={'60px'}
              iconId={'home'}
              widthIcon={'60px'}
            />
          </WrapForBtn>
        </NavLink>
      </Container>
    </AnimatePresence>
  )
}

const Container = styled(motion.div)`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url(${img}) 50% 50% / 70% no-repeat;

  @media screen and (max-width: 768px) {
    background: url(${img}) 50% 50% / 100% no-repeat;
  }
`
const WrapForBtn = styled.div`
  position: absolute;
  color: royalblue;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
`
const Text = styled.span`
  font-family: 'Bauhaus 93', sans-serif;
  text-shadow: 0 0 10px royalblue;
`
