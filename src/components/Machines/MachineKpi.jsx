import { Card, Paper, Text, } from '@mantine/core'

import './CSS/machinesDetails.css'

import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { machineDropdownAtom } from '../../API/API';



const MachineKpi = () =>
{
    const [socket, setSocket] = useState([])
    const [receivedData, setReceivedData] = useState([])
    const dpValue = useRecoilValue(machineDropdownAtom)
    console.log("Recived Data : " + JSON.stringify(receivedData.user_name))
    useEffect(() =>
    {

        if (dpValue !== "")
        {
            let baseurl = `ws://65.0.154.172:8000/kpi_web_socket/?machine_id=${dpValue}&username=${window.localStorage.getItem('username')}`
            const socket = new WebSocket(baseurl);

            socket.onopen = (event) =>
            {

                console.log('WebSocket connection established:', event);
                setSocket(socket);
            };

            socket.onmessage = (event) =>
            {


                const b = JSON.parse(event.data)
                // console.log(b)
                setReceivedData(b);


            };

            socket.onclose = () =>
            {
                socket.onopen = (event) =>
                {

                    console.log('WebSocket connection established again after closed :', event);
                    setSocket(socket);
                };
            };


            return () =>
            {
                if (socket)
                {
                    console.log('WebSocket connection closed: close event');

                    socket.close();
                }
            };
        }

    }, [dpValue]);

    return (
        <div>
            {/* {
                receivedData.user_name === window.localStorage.getItem('username') ? <div>{JSON.stringifyreceivedData}</div> : null
            } */}


        </div>
    )
}

export default MachineKpi

{/* <Card className='card' style={{ paddingBottom: '1rem' }} width={'100%'} height={'100%'}>
                    <Card className='subCard' w={'30%'} padding="lg" shadow="xs" radius="md">

                        {receivedData.data.map((card) =>
                        {
                            if (card.card === "Energy_Card")
                            {
                                return <Paper key={card.card}>
                                    <Text size={'1.3rem'} w={600}>{card.title}</Text>
                                    <div style={{ display: 'flex', padding: '1rem' }}>
                                        <div>
                                            {card.data.keys.map((key) => (
                                                <Text >{key}</Text>
                                            ))
                                            }
                                        </div>
                                        <div style={{ marginLeft: '2rem' }}>
                                            {card.data.values.map((value) => (
                                                <Text > {value}</Text>
                                            ))
                                            }
                                        </div>

                                    </div>
                                </Paper>
                            }
                        })}
                    </Card>

                </Card> */}