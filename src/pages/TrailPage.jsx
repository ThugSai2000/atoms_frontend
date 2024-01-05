import { Card, Container, SimpleGrid, Text } from '@mantine/core'
import { DatePickerInput, DatesProvider } from '@mantine/dates';
import React, { useEffect, useState } from 'react'
import TrailsMachineData, { HandleToolBar } from '../components/Trails/TrailsMachineData';
import client from '../API/API';
import { trailsDataStore, trailsSelectDateStore } from '../Store/store';
import { useRecoilState } from 'recoil';
import { BiCalendarAlt } from 'react-icons/bi';
import SelectDropdown from '../components/selectDropdown/SelectDropdown';
import ButtonComponent from '../components/button/ButtonComponent';


const TrailPage = () =>
{
    const [selectedPlant, setSelectedPlant] = useState([]);
    const [trailsData, setTrailsData] = useRecoilState(trailsDataStore)
    const [dateValue, setDateValue] = useRecoilState(trailsSelectDateStore)
    const [trailTableVisible, setTrailTableVisible] = useState(false)
    const [selectedPlantOption, setSelectedPlantOption] = useState(null)
    const [selectedModelOption, setSelectedModelOption] = useState(null)
    const [selectedMachineOption, setSelectedMachineOption] = useState(null)
    // console.log("date values :" + new Date(dateValue).toLocaleDateString('en-US'))
    // const dateString = "Wed Nov 01 2023 00:00:00 GMT+0530 (India Standard Time)";

    // Create a new Date object from the given date string.
    const date = new Date(dateValue);

    // Get the year, month, and day of the date.
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Add 1 to get the month index starting from 1 instead of 0.
    const day = date.getDate();

    // Create a new string in the format "2023-11-01" using the year, month, and day values.
    const formattedDateString = `${year}-${month}-${day}`;

    // console.log("date values :" + formattedDateString); // Output: 2023-11-01

    // console.log("date values :" + dateValue)



    const plantArr = []

    selectedPlant.map((plantnames) => plantArr.push(plantnames.plant_name))
    const filteringFun = ((element, index, plantArr) =>
    {
        return plantArr.indexOf(element) === index && element !== "None";
    })
    const filterPlantArr = plantArr.filter(filteringFun)

    const dependencyDropdown1 = new Set()
    selectedPlant.forEach((plant) =>
    {
        if (plant.plant_name === selectedPlantOption)
        {
            dependencyDropdown1.add(plant)
        }
    })


    const modelArr = []
    dependencyDropdown1.forEach((model) =>
    {
        modelArr.push(model.model_name)
    })
    const dependencyDropdown2 = new Set()
    selectedPlant.map((model) =>
    {
        if (model.plant_name === selectedPlantOption && model.model_name === selectedModelOption)
        {
            dependencyDropdown2.add(model)
            // console.log("model " + JSON.stringify(model))
        }
    })

    const machinenameArr = []
    dependencyDropdown2.forEach((machinename) =>
    {
        machinenameArr.push(machinename.machine_id)
        // console.log("DFDSGF" + machinename.machine_name)
    })


    useEffect(() =>
    {

        client.get("/Trail_List/", {
            headers: {
                Authorization: window.localStorage.getItem("Authorization")
            }
        }).then((resp) =>
        {

            const a = JSON.stringify(resp.data.Trail_list)
            const data = JSON.parse(a)
            setSelectedPlant(data)

        }).catch((error) =>
            console.log("error", error))
    }, [])

    const handleTrailsData = () =>
    {
        client.get("/Trail_details/", {
            params: {
                machine_id: selectedMachineOption,
                date: formattedDateString
                // "2023-11-04"
            }, headers: {
                Authorization: window.localStorage.getItem("Authorization")
            }
        }).then((resp) =>
        {
            setTrailsData(resp.data.Trail_Details)
            setTrailTableVisible(true)
        }).catch((error) =>
            console.log("error", error))
    }

    const handleselectedPlant = (value) =>
    {
        setSelectedPlantOption(value)
    }
    const handleselectedModel = (value) =>
    {
        setSelectedModelOption(value)
    }
    const handleselectedMachine = (value) =>
    {
        setSelectedMachineOption(value)
    }


    // mt={40}
    return (
        <Container style={{ display: 'flex', flexDirection: 'column', }} fluid ml={24} mt={"0.3rem"} pl={0} pr={0}>
            <Card className='card' h={'38rem'} >
                <Card.Section mt={16}><Text color='var(--color-bold-text)' size={24} fw={500}>Trail</Text></Card.Section>
                <Card.Section style={{ padding: '1rem', paddingBottom: '1.5rem' }} className='card' >


                    <SimpleGrid
                        cols={5}
                        spacing={'2rem'}
                        id='trailsHeader'>

                        <SelectDropdown
                            label="Plant"
                            placeholder="Select"
                            data={filterPlantArr}
                            value={selectedPlantOption}
                            onChange={handleselectedPlant}
                        />
                        <SelectDropdown
                            label="Model"
                            placeholder="Select"
                            data={modelArr}
                            value={selectedModelOption}
                            onChange={handleselectedModel}
                        />
                        <SelectDropdown
                            label="Machine"
                            placeholder="Select"
                            data={machinenameArr}
                            value={selectedMachineOption}
                            onChange={handleselectedMachine}
                        />
                        {/* <DatesProvider> */}
                        <DatePickerInput
                            // defaultDate={new Date()}
                            icon={<BiCalendarAlt size='1.3rem' color='var(--color-icon)' />}
                            value={dateValue}
                            styles={{
                                calendar: {
                                    width: '220px',
                                },
                                day: {
                                    width: '30px'
                                }
                            }}
                            onChange={setDateValue}
                            valueFormat="YYYY-MM-DD"
                            label='Date'
                            highlightToday={true}
                        // rightSection={<BiCalendarAlt size='1.3rem' color='var(--color-icon)' />}

                        />
                        {/* </DatesProvider> */}

                        <ButtonComponent mt={25} color='var(--color-onclick)' onClick={handleTrailsData}>Search
                        </ButtonComponent>

                    </SimpleGrid>

                </Card.Section>

                {trailTableVisible && <Card.Section >
                    <HandleToolBar />

                    <Container fluid={true} >

                        {trailsData.length > 0 ? <TrailsMachineData /> : <div>No data Available</div>}
                        {/* <NewTrail /> */}
                    </Container>

                </Card.Section>
                }
            </Card>

        </Container>


    )
}

export default TrailPage
