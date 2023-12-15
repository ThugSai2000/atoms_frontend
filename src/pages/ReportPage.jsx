import React, { useState } from 'react'
import { Box, Container, Flex, Grid, Group, Paper, Title } from '@mantine/core'
import SelectDropdown from '../components/selectDropdown/SelectDropdown'
import ButtonComponent from '../components/button/ButtonComponent'
import { DatePickerInput } from '@mantine/dates'
import SegmentControlComponent from '../components/segmentControl/SegmentControlComponent'
import { BiCalendarAlt, BiSolidFilePdf } from 'react-icons/bi'
import { RiFileExcel2Fill } from 'react-icons/ri'
import TableComponent from '../components/table/TableComponent'
import { segmentControlState } from '../Store/store'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import client from '../API/API'
import BarChart from '../components/charts/BarChart'
import jsPDF from 'jspdf'
import { usePDF } from 'react-to-pdf'
import { download, generateCsv, mkConfig } from 'export-to-csv'







const ReportPage = () =>
{
    const [reportList, setReportList] = useState([])
    const [tableDisplay, setTableDisplay] = useState(true);
    const [graphDisplay, setGraphDisplay] = useState(false);
    const [row, setRow] = useState([]);
    const val = useRecoilValue(segmentControlState);
    const [low, setLow] = useState([])
    const [high, setHigh] = useState([])
    const [time, setTime] = useState([])
    const [plantSelectedOption, setPlantSelectedOption] = useState(null)
    const [modelSelectedOption, setModelSelectedOption] = useState(null)
    const [machineSelectedOption, setMachineSelectedOption] = useState(null)
    const [reportSelectedOption, setReportSelectedOption] = useState(null)
    const [date, setDate] = useState([])
    const [csvdata, setCsv] = useState([])
    const { toPDF, targetRef } = usePDF({ filename: 'Trailgraph.pdf' });
    const convertedDates = []
    const [displayBody, setDisplayBody] = useState(false)

    useEffect(() =>
    {
        client.get('/Report_List/', {
            headers: {
                Authorization: window.localStorage.getItem('Authorization')
            }
        }).then((response) =>
        {
            const resp = response.data.report
            setReportList(resp)

        })
    }, [])

    const allDates = date.map((date) =>
    {
        const newDate = new Date(date)
        const year = newDate.getFullYear()
        const month = newDate.getMonth() + 1
        const day = newDate.getDate()
        convertedDates.push(`${year}-${month}-${day}`)
    })

    const onhandleChange = (value) =>
    {
        setPlantSelectedOption(value)
    }
    const onhandleChange1 = (value) =>
    {
        setModelSelectedOption(value)
    }
    const onhandleChange2 = (value) =>
    {

        setMachineSelectedOption(value)
    }
    const onhandleChange3 = (value) =>
    {
        setReportSelectedOption(value)
    }


    let plantArr = [];
    let modelArr = [];
    let machineArr = [];
    let reportTypeArr = [];


    const filterData = () =>
    {

        reportList.filter((plant) =>
        {
            if (plant.plant_name !== "None")
            {
                plantArr.push(plant.plant_name)
            }
            if (plant.model_name !== "None")
            {
                modelArr.push(plant.model_name)
            }
            if (plant.machine_id !== "None")
            {
                machineArr.push(plant.machine_id)
            }
            plant.report_type.map((rpt) =>
            {
                if (rpt !== "None")
                {
                    return reportTypeArr.push(rpt)
                }
            })
        })
    }
    console.log(reportList.status)
    if (reportList !== null || reportList.status)
    {
        filterData()

        // removing duplicates
        const filteringplant = ((element, index, plantArr) =>
        {
            return plantArr.indexOf(element) === index
        })

        plantArr = plantArr.filter(filteringplant)

        const filteringModel = ((element, index, modelArr) =>
        {
            return modelArr.indexOf(element) === index
        })

        modelArr = modelArr.filter(filteringModel)

        const filteringReportType = ((element, index, reportTypeArr) =>
        {
            return reportTypeArr.indexOf(element) === index
        })
        reportTypeArr = reportTypeArr.filter(filteringReportType)


    }

    const arr = []
    reportList.map((plant) =>
    {
        if (plantSelectedOption === plant.plant_name)
        {
            arr.push(plant.model_name)
        }
    })

    const arr1 = []
    reportList.map((plant) =>
    {
        if (modelSelectedOption === plant.model_name)
        {
            return arr1.push(plant.machine_id)
        }
    })

    const filterReportArr = []

    reportList.map((report) => (report.report_type.map((item) =>
    {

        if (machineSelectedOption === report.machine_id)
        {
            return filterReportArr.push(item)
        }
    })))


    useEffect(() =>
    {
        setTableDisplay(val === "table" ? true : false);
        setGraphDisplay(val !== "table" ? true : false);

    }, [val])

    const onClickReport = () =>
    {
        const request = {
            machine_id: machineSelectedOption,
            start_datetime: convertedDates[0],
            end_datetime: convertedDates[1] === "1970-0-1" ? convertedDates[0] : convertedDates[1],
            report_type: reportSelectedOption
        }


        client.post('/Reports/', request, {
            headers: {
                Authorization: window.localStorage.getItem('Authorization')
            }
        }).then((resp) =>
        {

            const r = resp.data
            setRow(r.data)
            const barGraphData = r.data.map((value) => value)
            const timeData = []
            const labelsbarGraphData = r.data.map((time) => timeData.push(time.timestamp.slice(11, 19)))
            setTime(timeData)

            const newData = barGraphData.map((item) =>
            {
                return { high: item.value[1], low: item.value[0] };
            });
            const newDatacsv = barGraphData.map((item) =>
            {
                return { high: item.value[1], low: item.value[0], };
            });
            console.log("expo:t to csv test : " + JSON.stringify(newData))
            setCsv(newDatacsv)

            const lowData = []
            Object.values(newData).filter((low) =>
            {
                return lowData.push(low.low)
            })

            setLow(lowData)
            const highData = []
            Object.values(newData).filter((high) =>
            {
                return highData.push(high.high)
            })

            setHigh(highData)
        }).catch((error) =>
            console.log(error))

        setDisplayBody(true)
        // return () => a()

    }


    //  export to pdf
    const exportPdf = () =>
    {
        const doc = new jsPDF("landscape")
        doc.setFontSize(20);
        // doc.text("Trails Data", 50, 15);

        doc.autoTable({
            html: '#reports-table',
            // styles: { fillColor: [100, 255, 255] },
            // columnStyles: {
            //     id: { fillColor: 255 }
            // },
            margin: { top: 60 },
            beforePageContent: function (data)
            {
                doc.text("Header", 40, 30);
            }

        })

        doc.save('TrailsData-pdf')
    }
    const csvConfig = mkConfig({
        fieldSeparator: ',',
        decimalSeparator: '.',
        useKeysAsHeaders: true,
    });
    const exporttocsv = () =>
    {
        const filename = `${csvConfig.report}.csv`;
        const csv = generateCsv(csvConfig)((row.map((time) =>
        {
            const timestamp = time.timestamp.slice(11, 19);
            const date = time.timestamp.slice(0, 9);
            const lval = time.value[0]
            const hval = time.value[1]
            return {
                Time: timestamp,
                Date: date,
                low: lval,
                high: hval



            }
        }))
        )
        download(csvConfig)(csv);
    }



    return (
        <Container fluid ml={10} mt={"0.3rem"} >
            {/* <ScrollArea h={952}> */}
            {/* Page title */}
            <Box mt={7}><Title color='var(--color-bold-text)' size={24} fw={500}>Report</Title></Box>

            {/* Select Dropdown options */}
            <Box mt={20} p={'1rem'} pt={0}>

                <Grid gutter={30} columns={18}>

                    <Grid.Col span={3}>

                        <SelectDropdown label='Plant' placeholder='Select' data={plantArr} selectedOption={plantSelectedOption} onChange={onhandleChange} />

                    </Grid.Col>

                    <Grid.Col span={3}>

                        <SelectDropdown label='Model' placeholder='Select' data={plantSelectedOption === null ? modelArr : arr} selectedOption={modelSelectedOption} onChange={onhandleChange1} />

                    </Grid.Col>


                    <Grid.Col span={3}>

                        <SelectDropdown label='Machine' placeholder='Select' data={modelSelectedOption === null ? machineArr : arr1} selectedOption={machineSelectedOption} onChange={onhandleChange2} />

                    </Grid.Col>
                    <Grid.Col span={3}>

                        <SelectDropdown label='Report Type' placeholder='Select' data={machineSelectedOption === null ? reportTypeArr : filterReportArr} selectedOption={reportSelectedOption} onChange={onhandleChange3} />

                    </Grid.Col>

                    <Grid.Col span={3}>
                        <DatePickerInput

                            icon={<BiCalendarAlt size='1.3rem' color='var(--color-icon)' />}
                            label='Date'
                            type='range'
                            labelSeparator=' to '
                            valueFormat='YYYY-MM-DD'
                            value={date}
                            onChange={(value) => setDate(value)}
                            w={250}
                        />
                    </Grid.Col>

                    <Grid.Col span={2} ml={50}>

                        <ButtonComponent mt={25} w={150} onClick={onClickReport} />

                    </Grid.Col>

                </Grid>

            </Box>

            {/* Reports Table & Graph */}
            {displayBody &&
                <Box mt={16} >
                    <Flex justify={'space-between'} pr={'1rem'} >
                        <Title size={18} color='var(--color-bold-text)' fw={500}>Machine Data</Title>

                        <Group sx={{ gap: '2rem' }} position='right'>
                            <SegmentControlComponent data={[{ label: 'Table', value: 'table' }, { label: 'Graph', value: 'graph' }]}

                            />
                            <BiSolidFilePdf color='var(--color-onclick)' transform='scale(2)' onClick={tableDisplay ? exportPdf : () => toPDF()} />
                            <RiFileExcel2Fill color='var(--color-onclick)' transform='scale(2)' onClick={exporttocsv} />
                        </Group>

                    </Flex>
                    <Paper mt={17} shadow='xs' >

                        {
                            tableDisplay &&
                            <div ref={targetRef}>
                                <TableComponent row={row} id='reports-table' />
                            </div>
                        }

                        {
                            graphDisplay &&
                            <div ref={targetRef}>
                                <BarChart low={low} high={high} time={time} />
                            </div>

                        }

                    </Paper>
                </Box>
            }
            {/* </ScrollArea> */}
        </Container>
    )
}

export default ReportPage
