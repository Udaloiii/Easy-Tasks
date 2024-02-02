import { FC, useState } from 'react'

import { Checkbox } from '@/components/checkbox/Checkbox'
import { CustomButton } from '@/components/customButton/CustomButton'
import { CustomInput } from '@/components/customInput/CustomInput'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

export const Login: FC = () => {
  const [remember, setRemember] = useState(false)
  const setRememberHandler = () => setRemember(prevState => !prevState)

  return (
    <StyleLogin>
      <Wrap>
        <CustomInput placeholder={'email'} type={'email'} value={''} />
        <CustomInput placeholder={'password'} type={'password'} value={''} />
        <WrapCheckbox>
          <Checkbox checked={remember} id={'remember'} onChange={setRememberHandler} />
          <StyleRemember htmlFor={'remember'}>Remember me</StyleRemember>
        </WrapCheckbox>
        <CustomButton iconId={'login'} title={'login'} type={'submit'} />
        <Text>Don`t have an account? Use a free:</Text>
        <WrapCheckbox>
          <span>
            Email: <span>free@samuraijs.com</span>
          </span>
          <span>
            Password: <span>free</span>
          </span>
        </WrapCheckbox>
      </Wrap>
    </StyleLogin>
  )
}

const StyleLogin = styled.div`
  width: 100vw;
  height: 100vh;
  background: url('https://img.freepik.com/free-photo/moon-sky-night-background-asset-game-2d-futuristic-generative-ai_191095-2046.jpg?t=st=1706782256~exp=1706785856~hmac=528c18c08811ebb6a0465cc6ea0dc6ee2fdccb82e2dc2f92f123aad193253db4&w=2000')
    50% / cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    height: 30px;
  }
`
const Wrap = styled.form`
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  //border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 10px 0 inset rgba(91, 89, 89, 0.5);
  background-color: rgba(0, 0, 0, 0.8);
`
const WrapCheckbox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 15px;
  svg {
    width: 15px;
    height: 15px;
  }
  span {
    :nth-child(1) {
      color: rgba(128, 128, 128, 0.5);
      font-size: 0.8rem;
    }
  }
`
const StyleRemember = styled.label`
  padding-bottom: 1px;
  color: whitesmoke;
  user-select: none;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transition: 0.3s;
    transform: scale(1.05);
  }
  &:active {
    transition: 0.3s;
    transform: scale(1);
  }
`
const Text = styled.p`
  color: rgba(255, 255, 255, 0.4);
  padding: 0;
  margin: 0;
`
