import { Card, Flex, Group, SimpleGrid, Text } from '@mantine/core';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { machineDropdownAtom } from '../../../API/API';

import { useRecoilValue } from 'recoil';
import { analogOutputAtom } from '../../../Store/store';
import NoDataAvailable from '../../noDataAvailable/NoDataAvailable';

const CardsAnalogOutput = ({ data }) =>
{

    return (
        <Card w={'215px'} h={'60px'} shadow="sm" p={0} radius={'6px'} style={{ backgroundColor: 'var(--color-white)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left' }}>

            <Text size={'1.1rem'} pl={'1rem'} weight={500} color='var(--color-bold-text)'>{data.name}</Text>

            <Group>
                <Text size={'0.9rem'} pl={'1rem'} fw={500} color={data.color} >{data.value}</Text>
                <Text size={'0.9rem'} pl={'0.2rem'} fw={500} color='var(--color-bold-text)' >{data.unit}</Text>
            </Group>


        </Card>
    )
}

const AnalogOutput = () =>
{

    const [cdata, setCData] = useState([])
    const dpvalue = useRecoilValue(machineDropdownAtom);
    const analogOutputValues = useRecoilValue(analogOutputAtom)


    useEffect(() =>
    {

        if (dpvalue !== "")
        {
            setCData(analogOutputValues)
        }
    }, [dpvalue, analogOutputValues]);

    return (
        <div style={{ height: '100%', width: 'auto', backgroundColor: 'var(--color-white)', borderRadius: '0.5rem', }} >

            <SimpleGrid cols={5} h={'100%'} p={'1rem'} >

                {
                    cdata.length > 0 ? cdata.map((card) => (
                        <CardsAnalogOutput key={card.id} data={card} />
                    )) : <NoDataAvailable />
                }

            </SimpleGrid>

        </div>
    )
}

export default AnalogOutput
