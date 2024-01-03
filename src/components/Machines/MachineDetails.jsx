import { Box, Card, Grid, SimpleGrid, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import TableTechnicalDetails from './Technical_Details'
import client, { machineDropdownAtom } from '../../API/API'
import { useRecoilValue } from 'recoil'
import ManualDocs from './ManualsDocs'
import SimpleGridComponent from '../simplegrid/SimpleGridComponent'
import { BiDownload, BiSolidFileDoc } from 'react-icons/bi'
import ManualsandDocsCard from '../cards/ManualsandDocsCard'


const MachineDetails = ({ value }) =>
{

    const [machineDetails, setMachineDetails] = useState({});

    const dpvalue = useRecoilValue(machineDropdownAtom);

    useEffect(() =>
    {
        if (value !== "")
        {
            const generalDetails = () =>
            {

                client.get("/machine_details/", {
                    params: {
                        machine_id: value,
                        module: "Details"
                    },
                    headers: {
                        Authorization: window.localStorage.getItem("Authorization")
                    }
                }).then((resp) => (

                    setMachineDetails(resp.data.general_details)


                )).catch((error) => console.log("error", error))
            }
            generalDetails()
        }

    }, [value])
    return (




        <Card width={'100%'} height={'100%'} className='card'>




            {/* Details Card */}
            <Grid>

                <Grid.Col span={5} > <Card

                    shadow="sm"
                    padding="xl"
                    component="a"
                    className='subCard' style={{ height: '17rem' }}>
                    <Text size="md" className='subcardHeading' style={{ marginBottom: '0.5rem', maxHeight: '300px' }}>
                        Details
                    </Text>
                    <Grid>
                        <Grid.Col span={5}><Text color='var(--color-text)' weight={400} className='detailsCardcol1' >
                            ID
                        </Text></Grid.Col>
                        <Grid.Col span={5}><Text className='detailsCardcol2' color='var(--color-bold-text)' weight={500} >
                            {machineDetails.machine_id}
                        </Text></Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col span={5}><Text
                            className='detailsCardcol1' color='var(--color-text)' weight={400}  >
                            Name
                        </Text></Grid.Col>
                        <Grid.Col span={5}><Text className='detailsCardcol2' color='var(--color-bold-text)' weight={500} >
                            {machineDetails.machine_name}
                        </Text></Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col span={5}><Text color='var(--color-text)' weight={400} className='detailsCardcol1' >
                            Model
                        </Text></Grid.Col>
                        <Grid.Col span={5}><Text className='detailsCardcol2' color='var(--color-bold-text)' weight={500} >
                            {machineDetails.model_name}
                        </Text></Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col span={5}><Text color='var(--color-text)' weight={400} className='detailsCardcol1' >
                            Date Of Installation
                        </Text></Grid.Col>
                        <Grid.Col span={5}><Text className='detailsCardcol2' color='var(--color-bold-text)' weight={500}>
                            {machineDetails.date_of_installation}
                        </Text></Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col span={5}><Text color='var(--color-text)' weight={400} className='detailsCardcol1' >
                            Detail 1
                        </Text></Grid.Col>
                        <Grid.Col span={5}><Text className='detailsCardcol2' color='var(--color-bold-text)' weight={500}>
                            {machineDetails.line_name}
                        </Text></Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col span={5}><Text color='var(--color-text)' weight={400} className='detailsCardcol1' >
                            Location
                        </Text></Grid.Col>
                        <Grid.Col span={5}><Text className='detailsCardcol2' color='var(--color-bold-text)' weight={500}>
                            {machineDetails.machine_location}
                        </Text></Grid.Col>
                    </Grid>

                </Card></Grid.Col>

                {/* Manual & Docs card */}
                <Grid.Col span={7}><ManualsandDocsCard /></Grid.Col>

                {/* Technical Details card */}

                <Grid.Col span={12}> <Box
                    shadow="sm"
                    component="a"
                    // height:22.2rem
                    className='subCard' style={{ height: 'inherit', padding: '0rem', backgroundColor: 'transparent' }}>

                    <TableTechnicalDetails />

                </Box></Grid.Col>
            </Grid>
        </Card>



    )
}

export default MachineDetails
