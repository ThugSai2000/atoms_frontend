import React, { useEffect, useState } from 'react'
import { Accordion, Button, Card, Container, Grid, Loader, ScrollArea, Skeleton, Tabs, Text, Title, } from '@mantine/core'
import '../components/Machines/CSS/machinesDetails.css'
import MachineKpi from '../components/Machines/MachineKpi'
import Controls from '../components/Machines/Controls'
import client from '../API/API'
import MachineDetails from '../components/Machines/MachineDetails.jsx'
import { useRecoilState, } from 'recoil';
import { machineDropdownAtom } from '../API/API.js';
import SelectDropdown from '../components/selectDropdown/SelectDropdown.jsx'
import ButtonComponent from '../components/button/ButtonComponent.jsx'
import AccordianComponent from '../components/accordian/AccordianComponent.jsx'
import LoaderComponent from '../components/loader/LoaderComponent.jsx'





const MachinePage = () =>
{


    const [data, setData] = useState([])
    const [resData, setResData] = useState([])
    const [value, setValue] = useState(null);
    const [loader, setLoader] = useState(false)
    const [valuestate, setValueState] = useRecoilState(machineDropdownAtom);
    const [tabsdisplay, setTabsDisplay] = useState(false)
    const [statusData, setStatusData] = useState([])
    const [loading, setLoading] = useState(true)
    const [timeStamp, setTimestamp] = useState("")

    // console.log(newdata)

    // if (Object.entries(statusData).length > 0)
    // {
    //     setNewData(rest)
    //     // console.log("reduced " + JSON.stringify(rest))

    // }

    useEffect(() =>
    {
        client.get('/machine_list/',

            {
                withCredentials: true,
                // headers: {
                //     Authorization: window.localStorage.getItem("Authorization")
                // }
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


    useEffect(() =>
    {

        const interval = setInterval(() =>
        {
            client.get('/machine_details/', {
                withCredentials: true,
                params: {
                    machine_id: value,
                    module: "iostatus"
                },
                // headers: {
                //     Authorization: window.localStorage.getItem("Authorization")
                // },


            }).then(async (response) =>
            {

                var globalresponse = response.data.iostatus
                const dbtime = JSON.stringify(response.data.iostatus.db_timestamp)
                const stringWithoutQuotes = dbtime.replace(/['"]/g, "");
                const stringWithSpace = stringWithoutQuotes.replace(/T/, " ");
                const stringWithoutDecimal = stringWithSpace.substring(0, 19);
                const stringWithNewDate = stringWithoutDecimal.replace(/2023-10-04/, "04-10-2023");
                setTimestamp(stringWithNewDate)

                // console.log('Io status : ' + JSON.stringify(extractedData))
                const { machine_id, machine_name, db_timestamp, ...rest } = globalresponse
                setStatusData(rest)

            }).catch((error) =>
            {
                console.log(error);
            });
        }, 3000)

        return () => (
            clearInterval(interval)
        )




    }, [value]);

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
    //     let baseurl = `ws://65.0.154.172:8000/machine_mqtt_data/?machine_id=${value}`
    //     const socket = new WebSocket(baseurl)

    //     socket.onopen = (event) =>
    //     {

    //         console.log("WebSocket connection established:", event)
    //     }

    //     socket.onmessage = (event) =>
    //     {
    //         const websocketdata = JSON.parse(event.data)
    //         // console.log("io data : " + websocketdata)
    //         // console.log("data" + websocketdata.db_timestamp)
    //         const dbtime = JSON.stringify(websocketdata.db_timestamp)
    //         const stringWithoutQuotes = dbtime.replace(/['"]/g, "");
    //         const stringWithSpace = stringWithoutQuotes.replace(/T/, " ");
    //         const stringWithoutDecimal = stringWithSpace.substring(0, 19);
    //         const stringWithNewDate = stringWithoutDecimal.replace(/2023-10-04/, "04-10-2023");
    //         setTimestamp(stringWithNewDate)
    //         const { machine_id, machine_name, db_timestamp, ...rest } = websocketdata
    //         setStatusData(rest)
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


    // }, [value])

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
            <Card className='card' h={625}>
                <Card.Section ><Text size={24} fw={500} color='var(--color-bold-text)'>Machine</Text></Card.Section>
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

                        <ScrollArea h={500} scrollHideDelay={0} id='scrollarea' pb={70}>
                            {tabsdisplay &&

                                <Card width={'100%'} h={'100%'} className='card'>
                                    <Tabs.Panel value="details" pt="xs" >

                                        <MachineDetails value={value} />

                                    </Tabs.Panel>
                                    <Tabs.Panel value="kpi" pt="xs" >
                                        <MachineKpi />

                                    </Tabs.Panel>
                                    <Tabs.Panel value="iostatus" pt="xs" >
                                        {/* <IOStatusMachines /> */}

                                        {Object.entries(statusData).length > 0 ? <>
                                            <Title fw={500} fz={16} p={'1rem'} ml={'0rem'} color='var(--color-onclick)'>Last updated at: {timeStamp}</Title>

                                            <AccordianComponent data={statusData} /></> : <LoaderComponent />}

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


