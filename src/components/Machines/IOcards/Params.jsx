import { Card, Flex, Group, Text } from '@mantine/core'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { paramsAtomglobal } from '../../../Store/store'
import { machineDropdownAtom } from '../../../API/API'
const CardsParams = ({ data }) =>
{


    // console.log(data + " what") dsgtjhkjhkjg


    return (
        <Card w={'215px'} h={'60px'} shadow="sm" p={0} radius={'6px'} style={{ backgroundColor: 'var(--color-white)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left' }}>

            <Text size={'1.1rem'} pl={'1rem'} weight={500} color='var(--color-bold-text)'>{data.name}</Text>

            <Group spacing={4}>
                <Text size={'0.9rem'} pl={'1rem'} fw={500} color={data.color} >{data.value}</Text>
                <Text size={'0.9rem'} fw={500} color='var(--color-bold-text)' >{data.unit}</Text>
            </Group>


        </Card>
    )
}
const Params = () =>
{
    const flexRef = useRef(null);
    const [cdata, setCData] = useState([])
    const dpvalue = useRecoilValue(machineDropdownAtom);
    const paramsAtomglobalValue = useRecoilValue(paramsAtomglobal)
    const flexWidth = flexRef.current?.offsetWidth;

    useEffect(() =>
    {
        if (dpvalue !== "")
        {
            setCData(paramsAtomglobalValue)
        }
    }, [dpvalue, paramsAtomglobalValue])

    const gap = useMemo(() =>
    {
        if (flexWidth === 1363)
        {
            return 16;
        }
        else
        {
            return '3rem'
        }

    }, [flexWidth]);

    return (
        <div style={{ height: '100%', width: 'auto', backgroundColor: 'var(--color-white)', borderRadius: '0.5rem', }} >

            <Flex id='flex' ref={flexRef} justify="flex-start" gap={gap} wrap="wrap" h={'100%'} pt={'2rem'} pl={'2.5rem'} pr={0} pb={'1rem'} >

                {
                    cdata.map((card) => (
                        <CardsParams key={card.name} data={card} />
                    ))
                }

            </Flex>

        </div>
    )
}

export default Params
