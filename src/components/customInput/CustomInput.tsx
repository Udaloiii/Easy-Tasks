import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  KeyboardEvent,
  forwardRef,
  memo,
  useCallback,
  useState,
} from 'react'

import { CustomButton } from '@/components/customButton/CustomButton'
import { AnimatePresence, motion } from 'framer-motion'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

type CustomInputPropsType = {
  autofocus?: boolean
  error?: null | string
  // name?: string
  onBlurClick?: (text: string) => void
  onEnterPress?: (value: string) => void
  onchange?: (value: string) => void
  padding?: string
  setError?: (value: null | string) => void
  // type?: 'email' | 'password' | 'text'
} & ComponentPropsWithoutRef<'input'>

export const CustomInput = memo(
  forwardRef<HTMLInputElement, CustomInputPropsType>(
    (
      {
        autofocus,
        error,
        // name,
        onBlurClick,
        onEnterPress,
        onchange,
        padding,
        setError,
        type,
        value,
        ...rest
      },
      ref
    ) => {
      const [visible, setVisible] = useState(false)

      const onChangeVisibility = useCallback(() => setVisible(prevState => !prevState), [])
      const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError?.(null)
        onchange?.(e.currentTarget.value)
      }
      const onBlurHandler = () => onBlurClick?.(value as string)

      const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          onEnterPress?.(e.currentTarget.value)
          e.currentTarget.blur()
        }
      }

      const condition =
        type === 'password' &&
        (visible ? (
          <CustomButton
            heightIcon={'14px'}
            iconId={'visible'}
            onClick={onChangeVisibility}
            viewBoxForIcon={'0 0 14 14'}
            widthIcon={'14px'}
          />
        ) : (
          <CustomButton
            heightIcon={'14px'}
            iconId={'hidden'}
            onClick={onChangeVisibility}
            viewBoxForIcon={'0 0 14 14'}
            widthIcon={'14px'}
          />
        ))

      return (
        <Wrap>
          <StyleInput
            autoFocus={autofocus || false}
            // name={name}
            onBlur={onBlurHandler}
            onChange={onChangeHandler}
            onKeyUp={onPressEnter}
            padding={padding}
            ref={ref}
            type={type === 'password' && !visible ? 'password' : 'text'}
            value={value}
            {...rest}
          />
          <AnimatePresence>
            {error && (
              <StyleError
                animate={{ opacity: 1 }}
                errLength={error.length}
                exit={{ opacity: 0, transition: { duration: 0.9 } }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {error}
              </StyleError>
            )}
          </AnimatePresence>
          {condition}
        </Wrap>
      )
    }
  )
)
const Wrap = styled.div`
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 4px;
  transition: 0.7s;
  background-color: rgba(24, 24, 24, 0.9);
  display: flex;
  width: 100%;
  max-width: 550px;
  position: relative;

  &:focus-within {
    box-shadow: 0 2px 10px 0 #1a1a1a;
    transition: 0.7s;
    border: 1px solid royalblue;
    caret-color: white;
    background-color: rgba(0, 0, 0, 0.5);
  }

  button {
    padding: 0 5px;
  }
`
const StyleInput = styled.input<{ padding?: string }>`
  padding: ${props => props.padding || '12px 8px'};
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: whitesmoke;
  font-size: 1rem;
`

const StyleError = styled(motion.span)<{ errLength?: number }>`
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(139, 0, 0, 0.9);
  font-size: ${props => (props.errLength && props.errLength > 20 ? '0.8rem' : '1rem')};
  white-space: nowrap;
`
