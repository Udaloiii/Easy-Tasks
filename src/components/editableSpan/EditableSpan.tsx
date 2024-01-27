import { FC, useState } from 'react'

import { CustomButton } from '@/components/customButton/CustomButton'
import { CustomInput } from '@/components/customInput/CustomInput'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

type EditableSpanPropsType = {
  onClick?: (newText: string) => void
  text: string
}
export const EditableSpan: FC<EditableSpanPropsType> = ({
  onClick,
  text,
}: EditableSpanPropsType) => {
  const [changeable, setChangeable] = useState(false)
  const [newText, setNewText] = useState(text)

  const onChangeTitleHandler = (newText: string) => {
    if (newText.trim() !== '') {
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
          padding={'2px 4px'}
          value={newText}
        />
      ) : (
        <>
          {newText}
          <CustomButton
            heightIcon={'15px'}
            iconId={'change'}
            onClick={conditionHandler}
            widthIcon={'15px'}
          />
        </>
      )}
    </Wrap>
  )
}

const Wrap = styled.span`
  padding: 20px 0 20px;
  display: flex;
  gap: 5px;
  justify-content: center;

  input {
    width: 100%;
  }
  button {
    padding-top: 7px;
  }
`
