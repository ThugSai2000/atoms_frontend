import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Grid, Loader, ScrollArea, Skeleton, Tabs, Text, } from '@mantine/core'
import '../components/Machines/CSS/machinesDetails.css'
import MachineKpi from '../components/Machines/MachineKpi'
import IOStatusMachines from '../components/Machines/IOStatusMachines'
import Controls from '../components/Machines/Controls'
import client from '../API/API'
import MachineDetails from '../components/Machines/MachineDetails.jsx'
import { useRecoilState, } from 'recoil';
import { machineDropdownAtom } from '../API/API.js';
import SelectDropdown from '../components/selectDropdown/SelectDropdown.jsx'
import ButtonComponent from '../components/button/ButtonComponent.jsx'



const MachinePage = () =>
{


    const [data, setData] = useState([])
    const [resData, setResData] = useState([])
    const [value, setValue] = useState(null);
    const [loader, setLoader] = useState(false)
    const [valuestate, setValueState] = useRecoilState(machineDropdownAtom);
    const [tabsdisplay, setTabsDisplay] = useState(false)


    useEffect(() =>
    {
        client.get('/machine_list/', {
            headers: {
                Authorization: window.localStorage.getItem("Authorization")
            }
        }).then(async (res) =>
        {

            const filteredData = res.data.machine_list.map(machine => ({
                label: machine.machine_id,
                value: machine.machine_id,
            }));

            setData(filteredData);
        }).catch((error) => (
            console.log("error", error)
        ));

    }, []);
    // "Manuals_and_Docs": [
    //     {
    //         "Document_name": "Electrical_Drawing",
    //         "Uploaded_by": "harsha",
    //         "Date": "27/07/2023",
    //         "Url": "https://datasheets.raspberrypi.com/rpi4/raspberry-pi-4-product-brief.pdf"
    //     }
    // ]
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
    //         console.log("io data : " + websocketdata)

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


    // }, [])

    const handleSetGlobalDPValue = () =>
    {

        setValueState(value)
        setTabsDisplay(true)
        setLoader(true)

    }

    // machine dropdown handle function
    const machineSelectedOption = (value) =>
    {
        setValue(value)
    }

    return (
        <Container fluid ml={10} mt={"0.3rem"} >


            {/* mt={40} */}
            <Card className='card'>
                <Card.Section ><Text size={24} fw={500} color='var(--color-bold-text)'>Machines</Text></Card.Section>
                <Card.Section style={{ padding: '1rem', paddingBottom: '1.5rem' }} className='card'>
                    <Grid span={6}>
                        <Grid.Col span={3}>
                            <SelectDropdown
                                label='Machine'
                                placeholder='Select Machine'
                                data={data}
                                selectedOption={value}
                                onChange={machineSelectedOption}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <ButtonComponent mt={25} variant="filled" disabled={value === null} onClick={handleSetGlobalDPValue}
                            >Search</ButtonComponent>
                        </Grid.Col>
                    </Grid>
                </Card.Section>
                <Card.Section>
                    <Tabs defaultValue="details" >
                        <Tabs.List>
                            <Tabs.Tab value="details">Details</Tabs.Tab>
                            <Tabs.Tab value="kpi">KPI</Tabs.Tab>
                            <Tabs.Tab value="iostatus">Status</Tabs.Tab>
                            <Tabs.Tab value="control">Control</Tabs.Tab>
                        </Tabs.List>

                        {/* Machines Details Tab */}

                        <ScrollArea h={500} scrollHideDelay={0} id='scrollarea'>
                            {tabsdisplay && <Card width={'100%'} height={'100%'} className='card'>
                                <Tabs.Panel value="details" pt="xs" >
                                    <MachineDetails value={value} />
                                </Tabs.Panel>
                                <Tabs.Panel value="kpi" pt="xs" >
                                    <MachineKpi />
                                </Tabs.Panel>
                                <Tabs.Panel value="iostatus" pt="xs" >
                                    <IOStatusMachines />
                                </Tabs.Panel>
                                <Tabs.Panel value="control" pt="xs" >
                                    <Controls />
                                </Tabs.Panel>
                            </Card>}
                        </ScrollArea>
                    </Tabs>
                </Card.Section>
            </Card >
        </Container>
    )
}

export default MachinePage


