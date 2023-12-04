import { Card, Flex, Group, SimpleGrid, Text } from '@mantine/core'
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

    const [cdata, setCData] = useState([])
    const dpvalue = useRecoilValue(machineDropdownAtom);
    const paramsAtomglobalValue = useRecoilValue(paramsAtomglobal)

    useEffect(() =>
    {
        if (dpvalue !== "")
        {
            setCData(paramsAtomglobalValue)
        }
    }, [dpvalue, paramsAtomglobalValue])


    return (
        <div style={{ height: '100%', width: 'auto', backgroundColor: 'var(--color-white)', borderRadius: '0.5rem', }} >

            <SimpleGrid cols={5} h={'100%'} p={'1rem'} >

                {
                    cdata.map((card) => (
                        <CardsParams key={card.name} data={card} />
                    ))
                }

            </SimpleGrid>

        </div>
    )
}

export default Params
