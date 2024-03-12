import { FC, memo, useCallback, useState } from 'react'

import { CustomButton } from '@/components/customButton/CustomButton'
import { CustomInput } from '@/components/customInput/CustomInput'
import { AnimatePresence } from 'framer-motion'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

type EditableSpanPropsType = {
  isDone?: boolean
  onClick?: (newText: string) => void
  text: string
}
export const EditableSpan: FC<EditableSpanPropsType> = memo(
  ({ isDone, onClick, text }: EditableSpanPropsType) => {
    const [changeable, setChangeable] = useState(false)
    const [newText, setNewText] = useState(text)

    const onChangeTitleHandler = useCallback(
      (newText: string) => {
        if (newText.trim() !== '' && newText.trim() !== text) {
          onClick?.(newText.trim())
          setNewText(newText.trim())
          setChangeable(false)
        } else {
          setNewText(text)
          setChangeable(false)
        }
      },
      [onClick, text]
    )

    const conditionHandler = () => setChangeable(prevState => !prevState)

    return (
      <Wrap>
        {changeable ? (
          <CustomInput
            autofocus
            onBlurClick={onChangeTitleHandler}
            onchange={setNewText}
            padding={'2px 6px'}
            value={newText}
          />
        ) : (
          <>
            {newText}
            <AnimatePresence>
              {!isDone && (
                <CustomButton
                  heightIcon={'15px'}
                  iconId={'change'}
                  onClick={conditionHandler}
                  widthIcon={'15px'}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </Wrap>
    )
  }
)

const Wrap = styled.span`
  width: 100%;
  display: flex;
  gap: 5px;
  justify-content: center;

  button {
    align-self: center;
  }
`
