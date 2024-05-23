import { FC, memo, useCallback, useState } from 'react'

import { CustomButton } from '@/components/customButton/CustomButton'
import { CustomInput } from '@/components/customInput/CustomInput'
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

type AddItemFormPropsType = {
  onClick?: (title: string) => void
  padding?: string
  placeholder?: string
  width?: string
}
export const AddItemForm: FC<AddItemFormPropsType> = memo(
  ({ onClick, padding, placeholder, width }: AddItemFormPropsType) => {
    const [error, setError] = useState<null | string>(null)
    const [value, setValue] = useState('')
    const addItemHandler = useCallback(() => {
      error && setError(null)
      if (value.trim() !== '') {
        onClick?.(value)
        setValue('')
      } else {
        setError('Title is required')
        const clearId = setTimeout(() => setError(null), 5000)

        return () => clearInterval(clearId)
      }
    }, [error, onClick, value])

    return (
      <Wrap width={width}>
        <CustomInput
          error={error}
          onEnterPress={addItemHandler}
          onchange={setValue}
          padding={padding}
          placeholder={placeholder}
          setError={setError}
          value={value}
        />
        <CustomButton
          color={'royalblue'}
          heightIcon={'35px'}
          iconId={'add'}
          onClick={addItemHandler}
          viewBoxForIcon={'0 0 20 20'}
          widthIcon={'35px'}
        />
      </Wrap>
    )
  }
)

const Wrap = styled.div<{ width?: string }>`
  width: ${props => props.width || '100%'};
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
`
