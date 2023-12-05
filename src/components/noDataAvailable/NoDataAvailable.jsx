import { Text } from '@mantine/core'
import React from 'react'

const NoDataAvailable = () =>
{
    return (
        <div>
            <Text color='var(-color-text)' w={500} size={16}>No Data Available</Text>
        </div>
    )
}

export default NoDataAvailable
