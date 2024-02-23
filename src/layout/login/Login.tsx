import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { RequestLogInType } from '@/api/auth-api'
import background from '@/assets/images/background-login.webp'
import { Checkbox } from '@/components/checkbox/Checkbox'
import { CustomButton } from '@/components/customButton/CustomButton'
import { CustomInput } from '@/components/customInput/CustomInput'
import { authThunks } from '@/store/reducers/auth-reducer'
import { AppMainType, useAppDispatch } from '@/store/store'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'
export const Login: FC = () => {
  const isLoggedIn = useSelector<AppMainType, boolean>(state => state.auth.isLogin)
  const dispatch = useAppDispatch()
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<RequestLogInType>()

  const onSubmit = (data: RequestLogInType) => {
    dispatch(authThunks.logIn(data))
    reset()
  }
  const emailRegex =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return (
    <StyleLogin>
      <StyleForm onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          placeholder={'email'}
          type={'email'}
          {...register('email', {
            pattern: { message: 'Invalid email', value: emailRegex },
            required: 'Email is required',
          })}
          error={errors.email?.message}
        />
        <CustomInput
          placeholder={'password'}
          type={'password'}
          {...register('password', {
            minLength: { message: 'Password has to be at least 3 characters long', value: 3 },
            required: 'Password is required',
          })}
          error={errors.password?.message}
        />
        <WrapCheckbox>
          <Checkbox id={'remember'} {...register('rememberMe')} />
          <StyleRemember htmlFor={'remember'}>Remember me</StyleRemember>
        </WrapCheckbox>
        <CustomButton color={'royalblue'} iconId={'login'} title={'login'} type={'submit'} />
        <Text>Don`t have an account? Use a free:</Text>
        <WrapFreeAcc>
          <span>
            Email: <span>free@samuraijs.com</span>
          </span>
          <span>
            Password: <span>free</span>
          </span>
        </WrapFreeAcc>
      </StyleForm>
    </StyleLogin>
  )
}

const StyleLogin = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${background}) 50% / cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    height: 30px;
  }
`
const StyleForm = styled.form`
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 inset rgba(91, 89, 89, 0.5);
  background-color: rgba(0, 0, 0, 0.8);
`
const WrapCheckbox = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 15px;
  color: rgba(65, 105, 225, 0.5);

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

const WrapFreeAcc = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: rgba(65, 105, 225, 0.5);
  font-size: 0.8rem;

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
