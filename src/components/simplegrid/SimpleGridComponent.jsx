import { SimpleGrid } from '@mantine/core'
import React from 'react'

const SimpleGridComponent = (props) =>
{

    const { cols } = props
    return (
        <SimpleGrid cols={cols}></SimpleGrid>
    )
}

export default SimpleGridComponent
