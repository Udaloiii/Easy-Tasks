import { FC, useState } from 'react'

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
export const EditableSpan: FC<EditableSpanPropsType> = ({
  isDone,
  onClick,
  text,
}: EditableSpanPropsType) => {
  const [changeable, setChangeable] = useState(false)
  const [newText, setNewText] = useState(text)

  const onChangeTitleHandler = (newText: string) => {
    if (newText.trim() !== '' && newText.trim() !== text) {
      onClick?.(newText)
      setNewText(newText)
      setChangeable(false)
    } else {
      setNewText(text)
      setChangeable(false)
    }
  }

  const conditionHandler = () => setChangeable(prevState => !prevState)

  return (
    <Wrap>
      {changeable ? (
        <CustomInput
          autofocus
          onBlurClick={onChangeTitleHandler}
          onChange={setNewText}
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

const Wrap = styled.span`
  width: 100%;
  //padding: 20px 0 20px;
  display: flex;
  gap: 5px;
  justify-content: center;

  button {
    padding-top: 7px;
  }
`
