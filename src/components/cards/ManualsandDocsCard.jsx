import { Box, Card, SimpleGrid, Text } from '@mantine/core'
import React from 'react'
import { BiDownload, BiSolidFileDoc } from 'react-icons/bi'

const ManualsandDocsCard = () =>
{
    return (
        <Card
            shadow="sm"
            padding="xl"
            component="a"
            className='subCard' style={{ height: '17rem' }}
        >
            <Text style={{ marginBottom: '0.5rem' }} className='subcardHeading'>
                Manuals & Docs
            </Text>
            <SimpleGrid cols={4}>
                <Box mt={23} ml={24} style={{ display: 'flex', flexDirection: 'column' }}>

                    <BiSolidFileDoc size={32} />
                </Box>

                <Box mt={16} style={{ display: 'flex', flexDirection: 'column' }}>

                    <Text size={14} w={500}>Electrical Drawing</Text>
                    <label style={{ fontSize: '12px' }} >Name</label>
                </Box>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>

                    <Text>Created</Text>
                    <label >2-3-3000</label>
                </Box>
                <Box style={{ textAlign: 'center', fontSize: '2rem' }}>

                    <BiDownload />

                </Box>
            </SimpleGrid>
        </Card>
    )
}

export default ManualsandDocsCard
