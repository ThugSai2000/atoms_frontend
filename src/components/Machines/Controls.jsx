import React, { useEffect, useState, useMemo } from 'react'
import { Box, Card, Container, Flex, Switch, Text, Title } from '@mantine/core'

import client, { machineDropdownAtom, ldm, } from '../../API/API';
import { useRecoilValue } from 'recoil';
import NoDataAvailable from '../noDataAvailable/NoDataAvailable';


const ControlCard = ({ data }) =>
{
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    // const [isSwitchOn, setIsSwitchOn] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);
    const dpvalue = useRecoilValue(machineDropdownAtom);

    const col = data.color
    // console.log(col)
    useEffect(() =>
    {

        setIsSwitchOn(data.value === "On" ? true : false)

    }, [data])
    const handleSwitchChange = (event) =>
    {
        setIsSwitchOn(event.target.checked);

        client.put('/machine_control/', {
            machine_id: dpvalue,
            name: data.name,
            value: isSwitchOn ? 'Off' : 'On'
        }).then(async (response) =>
        {
            // if (response === "data has been sent")
            // {
            //     setIsSwitchOn('On')
            // }
            // setIsLoading(false);
            // console.log(response.data);
        }).catch((error) =>
        {
            // setIsLoading(false);
            console.log(error);
        });


    };



    return (



        <Card className='smallcard' w={'215px'} h={'60px'} shadow="sm" p={0} radius={'6px'} style={{ backgroundColor: 'var(--color-white)', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Box w={'65%'} h={'100%'} ml={10} shadow="sm" radius={'6px'} style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center', }} >
                <Text size={'1rem'} p={'3px'} weight={500} color='var(--color-bold-text)' >{data.name}</Text>
            </Box>

            <Box w={'35%'} h={'100%'} shadow="sm" radius={'6px'}  >

                <Switch checked={isSwitchOn} onChange={handleSwitchChange} mt={18} ml={5} size="md" color={col} onLabel="ON" offLabel="OFF" />
            </Box>
        </Card>
    )
}
const Controls = () =>
{
    const [cdata, setCData] = useState([])
    const [controltime, setControltime] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const dpvalue = useRecoilValue(machineDropdownAtom);
    // console.log('cdata ' + JSON.stringify(cdata))
    // const [loading, setLoading] = useState(false);

    // useEffect(() =>
    // {
    //     if (dpvalue !== " ")
    //     {
    //         const controlapi = setInterval(() =>
    //         {

    //             // setLoading(true)
    //             client.get('/machine_details/', {
    //                 params: {
    //                     machine_id: dpvalue,
    //                     module: 'control'
    //                 },
    //                 headers: {
    //                     Authorization: window.localStorage.getItem("Authorization")
    //                 },
    //             }).then(async (response) =>
    //             {
    //                 setIsLoading(false)
    //                 setCData(response.data.control.digital_output);
    //                 ///////////// conteol timestanp
    //                 const contime = JSON.stringify(response.data.control.db_timestamp)
    //                 const stringWithoutQuotes = contime.replace(/['"]/g, "");
    //                 const stringWithSpace = stringWithoutQuotes.replace(/T/, " ");
    //                 const stringWithoutDecimal = stringWithSpace.substring(0, 19);
    //                 const stringWithNewDate = stringWithoutDecimal.replace(/2023-10-04/, "04-10-2023");
    //                 setControltime(stringWithNewDate)


    //             });
    //         }, 3000)

    //         return () => (
    //             clearInterval(controlapi)
    //         )



    //     }
    // }, [dpvalue])




    return (
        <div>hii</div>
        // <div>
        //     <Title fw={500} fz={16} p={'1rem'} ml={'0rem'} color='var(--color-onclick)'>Last updated at: {controltime}</Title>
        //     <Container fluid bg='var(--color-white)' p={16}>
        //         <Title fw={500} fz={16} p={'0.5rem'} ml={'0rem'} color='var(--color-bold-text)'>Digital Output </Title>
        //         <Flex className='flex-container' justify="flex-start" columnGap={20} rowGap={'1rem'} wrap="wrap" h={'100%'} pt={'1rem'} pl={'2.5rem'} pr={0} pb={'1rem'}  >
        //             {cdata.length > 0 ? cdata.map((card) => (
        //                 <ControlCard key={card.name} data={card} />
        //             )) : <NoDataAvailable />
        //             }


        //         </Flex>
        //         {/* <ControlCard /> */}
        //     </Container>
        // </div>
    )
}


export default Controls
