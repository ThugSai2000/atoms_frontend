
import React from 'react'
import { Button } from '@mantine/core'

const ButtonComponent = (props) =>
{
  const { mt, w, onClick } = props
  return (
    <div>
      <Button mt={mt} w={w} color='var(--color-onclick)' onClick={onClick}>
        Search
      </Button>
    </div>
  )
}

export default ButtonComponent
