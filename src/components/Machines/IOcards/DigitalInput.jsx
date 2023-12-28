import { Box, Card, Flex, SimpleGrid, Space, Text } from '@mantine/core';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import client, { digitaloutputglobal, machineDropdownAtom, globalapi, timestampglobal, } from '../../../API/API';
import { useRecoilState, useRecoilValue } from 'recoil';
import { analogInputAtom, analogOutputAtom, paramsAtomglobal } from '../../../Store/store';
import NoDataAvailable from '../../noDataAvailable/NoDataAvailable';
import DigitalDataCard from '../../cards/DigitalDataCard';


// const CardsDigitalInput = ({ data }) =>
// {

//     return (

//         <Card w={'215px'} h={'60px'} shadow="sm" p={0} radius={'6px'} style={{ backgroundColor: 'var(--color-white)', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
//             <Box w={'75%'} h={'100%'} shadow="sm" radius={'6px'} style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
//                 <Text size={'1rem'} p={'3px'} weight={500} align='center' color='var(--color-bold-text)'>{data.name}</Text>
//             </Box>

//             <Box w={'25%'} h={'100%'} shadow="sm" radius={'6px'} bg={data.color}>
//                 <Text size={'1rem'} mt={14} weight={400} color='var(--color-white)' align='center' >{data.value}</Text>
//             </Box>
//         </Card>



//     )
// }

const DigitalInput = () =>
{
    const [cdata, setCData] = useState([])

    const [globalresState, setGlobalresState] = useRecoilState(globalapi)

    const [db_timestamp, setDbtimestamp] = useRecoilState(timestampglobal)
    const [digitaloutput, setDigitaloutput] = useRecoilState(digitaloutputglobal)
    const [analogInput, setAnalogInput] = useRecoilState(analogInputAtom)
    const [analogOutput, setAnalogOutput] = useRecoilState(analogOutputAtom)
    const [params, setParams] = useRecoilState(paramsAtomglobal)

    const dpvalue = useRecoilValue(machineDropdownAtom);
    const [changedDpvalue, setChangedDpvalue] = useState(null);

    console.log("websocket data : " + JSON.stringify(cdata))
    // console.log("Restapi data : " + JSON.stringify(cdata))



    useEffect(() =>
    {

        const interval = setInterval(() =>
        {
            client.get('/machine_details/', {
                params: {
                    machine_id: dpvalue,
                    module: "iostatus"
                },
                headers: {
                    Authorization: window.localStorage.getItem("Authorization")
                },


            }).then(async (response) =>
            {

                var globalresponse = response.data
                setGlobalresState(globalresponse)
                //////////// db time stampt response collected

                const dbtime = JSON.stringify(response.data.iostatus.db_timestamp)
                const stringWithoutQuotes = dbtime.replace(/['"]/g, "");
                const stringWithSpace = stringWithoutQuotes.replace(/T/, " ");
                const stringWithoutDecimal = stringWithSpace.substring(0, 19);
                const stringWithNewDate = stringWithoutDecimal.replace(/2023-10-04/, "04-10-2023");
                setDbtimestamp(stringWithNewDate)

                // ////////////// digital input response collected
                var a = JSON.stringify(response.data.iostatus.digital_input)
                var b = JSON.parse(a)
                // console.log(b)
                // console.log("DI is running ")
                // setCData(b)

                ////////////// digital output response collected
                var c = JSON.stringify(response.data.iostatus.digital_output)
                var d = JSON.parse(c)
                setDigitaloutput(d)


                // ////////////// analog input response collected
                var e = JSON.stringify(response.data.iostatus.analog_input)
                var f = JSON.parse(e)
                setAnalogInput(f)
                // ////////////// analog output response collected
                var g = JSON.stringify(response.data.iostatus.analog_output)
                var h = JSON.parse(g)
                setAnalogOutput(h)

                // ///////// params response
                var i = JSON.stringify(response.data.iostatus.others)
                var j = JSON.parse(i)
                setParams(j)
            }).catch((error) =>
            {
                console.log(error);
            });
            // }
        }, 3000)
        return () => (
            clearInterval(interval)
        )




    }, [dpvalue, setAnalogInput, setAnalogOutput, setChangedDpvalue, setDbtimestamp, setDigitaloutput, setGlobalresState, setParams]);

    // useEffect(() =>
    // {
    //     let baseurl = `ws://65.0.154.172:8000/machine_mqtt_data/?machine_id=ABD2`
    //     const socket = new WebSocket(baseurl)

    //     socket.onopen = (event) =>
    //     {

    //         console.log("WebSocket connection established:", event)
    //     }

    //     socket.onmessage = (event) =>
    //     {
    //         const websocketdata = JSON.parse(event.data)
    //         // console.log("io data : " + websocketdata)
    //         setCData(websocketdata.digital_input)
    //         setAnalogInput(websocketdata.analog_input)
    //         setAnalogOutput(websocketdata.analog_output)
    //         //  setChangedDpvalue(websocketdata.) 
    //         setDbtimestamp(websocketdata.db_timestamp)
    //         setDigitaloutput(websocketdata.digital_output)
    //         //  setGlobalresState, 
    //         setParams()

    //     }

    //     socket.onclose = () =>
    //     {

    //         socket.onopen = (event) =>
    //         {
    //             console.log('WebSocket connection established again after closed :', event);

    //         }
    //     }
    //     return () =>
    //     {
    //         if (socket)
    //         {
    //             console.log('WebSocket connection closed: close event');
    //             socket.close()

    //         }
    //     }


    // }, [setAnalogInput, setAnalogOutput, setChangedDpvalue, setDbtimestamp, setDigitaloutput, setGlobalresState, setParams])


    return (
        <div style={{ height: '100%', width: 'auto', backgroundColor: 'var(--color-white)', borderRadius: '0.5rem' }} >

            <SimpleGrid cols={5} h={'100%'} p={'1rem'} >


                {
                    cdata.length > 0 ? cdata.map((card) => (

                        <DigitalDataCard key={card.name} data={card} />

                    )) : <NoDataAvailable />

                }

            </SimpleGrid>

        </div>
    )
}

export default DigitalInput
