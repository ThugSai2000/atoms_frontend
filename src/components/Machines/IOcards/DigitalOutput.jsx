import { Box, Card, Flex, SimpleGrid, Text } from '@mantine/core';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { digitaloutputglobal, machineDropdownAtom, } from '../../../API/API';

import { useRecoilValue } from 'recoil';


const CardsDigitalOutput = ({ data }) =>
{

    return (

        <Card w={'215px'} h={'60px'} shadow="sm" p={0} radius={'6px'} style={{ backgroundColor: 'var(--color-white)', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Box w={'75%'} h={'100%'} shadow="sm" radius={'6px'} style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                <Text size={'1rem'} p={'3px'} weight={500} color='var(--color-bold-text)'>{data.name}</Text>
            </Box>

            <Box w={'25%'} h={'100%'} shadow="sm" radius={'6px'} bg={data.color}  >
                <Text size={'1rem'} mt={14} weight={400} color='var(--color-white)' align='center'>{data.value}</Text>
            </Box>
        </Card>


    )



}


const DigitalOutput = () =>
{
    const [cdata, setCData] = useState([])
    const dpvalue = useRecoilValue(machineDropdownAtom);
    const digitaloutputvalue = useRecoilValue(digitaloutputglobal)

    useEffect(() =>
    {

        if (dpvalue !== "")
        {
            setCData(digitaloutputvalue)
        }

    }, [dpvalue, digitaloutputvalue]);

    return (

        <div style={{ height: '100%', backgroundColor: 'var(--color-white)', borderRadius: '0.5rem' }} >

            <SimpleGrid cols={5} h={'100%'} p={'1rem'} >

                {
                    cdata.map((card) => (
                        <CardsDigitalOutput key={card.name} data={card} />
                    ))
                }

            </SimpleGrid>

        </div>
    )
}

export default DigitalOutput
