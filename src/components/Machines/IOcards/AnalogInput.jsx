import { Card, Flex, SimpleGrid, Text } from '@mantine/core';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { machineDropdownAtom } from '../../../API/API';

import { useRecoilValue } from 'recoil';
import { analogInputAtom } from '../../../Store/store';
import NoDataAvailable from '../../noDataAvailable/NoDataAvailable';

const CardsAnalogInput = ({ data }) =>
{

    return (
        <Card w={'215px'} h={'60px'} shadow="sm" p={0} radius={'6px'} style={{ backgroundColor: 'var(--color-white)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left' }}>

            <Text size={'1.1rem'} pl={'1rem'} weight={500} color='var(--color-bold-text)'>{data.name}</Text>


            <Text size={'0.9rem'} pl={'1rem'} fw={500} color='var(--color-text)' >{data.value}</Text>

        </Card>
    )
}
const AnalogInput = () =>
{
    const [cdata, setCData] = useState([])
    const dpvalue = useRecoilValue(machineDropdownAtom);
    const analogInputValues = useRecoilValue(analogInputAtom)


    useEffect(() =>
    {
        if (dpvalue !== "")
        {
            setCData(analogInputValues)
        }
    }, [dpvalue, analogInputValues]);

    return (
        <div style={{ height: '100%', width: 'auto', backgroundColor: 'var(--color-white)', borderRadius: '0.5rem', }} >

            <SimpleGrid cols={5} h={'100%'} p={'1rem'} >
                {
                    cdata ? cdata.map((card) => (
                        <CardsAnalogInput key={card.id} data={card} />
                    )) : <NoDataAvailable />
                }

            </SimpleGrid>
        </div>
    )
}

export default AnalogInput
