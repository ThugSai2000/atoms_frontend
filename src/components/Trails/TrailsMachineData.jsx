import React from 'react'

import { Box, Group, ScrollArea, Table, Title } from '@mantine/core';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
import { RiFileExcel2Fill, } from 'react-icons/ri'
import { BiSolidFilePdf } from 'react-icons/bi';
import { useRecoilValue } from 'recoil';
import { trailsDataStore, trailsSelectDateStore } from '../../Store/store';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './CSS/trails.css'

const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});
export const HandleToolBar = () =>
{

    const trailsDataValue = useRecoilValue(trailsDataStore)
    const reqDate = useRecoilValue(trailsSelectDateStore)

    const date = new Date(reqDate);

    // Get the year, month, and day of the date.
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Add 1 to get the month index starting from 1 instead of 0.
    const day = date.getDate();

    // Create a new string in the format "2023-11-01" using the year, month, and day values.
    const formattedDateString = `${year}-${month}-${day}`;

    const handleExportData = () =>
    {
        const timeConvereted = []

        const trails = () =>
        {
            const a = trailsDataValue.map((key) => (key.timestamp))
            console.log(a)
            a.forEach((time) =>
            {
                const c = time.substring(11, 19)
                // console.log("ccccc  " + c)
                timeConvereted.push({ timeValue: c })
            })

        }
        trails()
        const firstObjectOfData = trailsDataValue[0]
        var filterSensorNames = []

        if (firstObjectOfData !== undefined)
        {
            const b = JSON.stringify(firstObjectOfData.data)
            const a = JSON.parse(b)
            // console.log("a  " + JSON.stringify(a))
            const z = (a).map((names) =>
            (

                filterSensorNames.push(names.name)
            ))


            // console.log("B C  " + JSON.stringify(filterSensorNames))
        }
        const csv = generateCsv(csvConfig)(
            (trailsDataValue.map((values) =>
            {
                const date = formattedDateString
                const names = [filterSensorNames.map((name) => name)]
                const timestamp = values.timestamp.slice(11, 19);
                const dataValues = values.data.map((qdata) => qdata.value);

                return {
                    Date: date,
                    Time: timestamp,
                    [names]: dataValues,

                };
            })),
        )

        download(csvConfig)(csv);
    };


    /////////***export to pdf */
    const exportPdf = () =>
    {
        const doc = new jsPDF("landscape")

        doc.autoTable({
            html: '#trails-table',
            margin: { top: 10 },
            beforePageContent: function (data)
            {


                doc.setFontSize(20).text("Trail Data", 120, 15)
                doc.setFontSize(10)
                doc.text(`Plant : ${formattedDateString}`, 10, 25);
                doc.text(`Model : ${formattedDateString}`, 10, 30);
                doc.text(`Machine : ${formattedDateString}`, 10, 35);
                doc.text(`Date : ${formattedDateString}`, 10, 40)

            }

        })

        doc.save('TrailsData-pdf')
    }
    return (
        <div id='toolBar'> <Box
            sx={{
                display: 'flex',
                gap: '16px',
                padding: '8px',
                paddingLeft: '0px',
                flexWrap: 'wrap',
                marginBottom: '0.5rem',
                justifyContent: 'space-between'

            }}
        >
            <Title color='var(--color-bold-text)' size={'1.2rem'} weight={500}>Machine Data</Title>
            <Group w={'6rem'} sx={{ gap: '2rem' }}>
                <BiSolidFilePdf color='var(--color-onclick)' transform='scale(2)' onClick={exportPdf} />
                <RiFileExcel2Fill color='var(--color-onclick)' transform='scale(2)' onClick={handleExportData} />
            </Group>



        </Box></div>
    )
}

const TrailsMachineData = () =>
{
    const trailsDataValue = useRecoilValue(trailsDataStore)

    console.log("trails Data Value " + JSON.stringify(trailsDataValue))
    const firstObjectOfData = trailsDataValue[0]
    var filterSensorNames = []

    if (firstObjectOfData !== undefined)
    {
        const b = JSON.stringify(firstObjectOfData.data)
        const a = JSON.parse(b)
        console.log("a  " + JSON.stringify(a))
        const z = (a).map((names) =>
        (

            filterSensorNames.push(names.name)
        ))
    }



    const timeConvereted = []

    const trails = () =>
    {
        const a = trailsDataValue.map((key) => (key.timestamp))
        console.log(a)
        a.forEach((time) =>
        {
            const c = time.substring(11, 19)
            // console.log("ccccc  " + c)
            timeConvereted.push(c)
        })

    }
    trails()


    // console.log(Object.keys(trailsDataValue[0].map((key) => key.name)))
    return (
        <div >
            {/* {JSON.stringify(trailsDataValue)} */}
            <ScrollArea offsetScrollbars h={400} >

                <Table verticalSpacing="md" horizontalSpacing='xl' striped shadow='sm' id='trails-table'>
                    <thead style={{
                        position: "sticky",
                        top: 0,
                        width: 'auto', background: 'white', zIndex: 3
                    }}>
                        <tr><th style={{ position: 'sticky', left: '0.1px', background: 'white', color: 'var(--color-text)', textAlign: 'left', zIndex: 6 }}> Date </th><th style={{ position: 'sticky', left: '4.8rem', background: 'white', color: 'var(--color-text)', textAlign: 'left', zIndex: 6 }}> TIME </th>{
                            filterSensorNames.map((key) => (<th>{key}</th>))
                        }</tr>


                        {/* <TableHead /> */}
                        {/* <tr >
                            {trailsDataValue.map((key) =>
                            (
                                <td key={key.timestamp}><Text >{key.timestamp}</Text></td>
                            )
                            )}
                        </tr> */}

                    </thead>


                    <tbody >

                        {

                            trailsDataValue.map((key, index) => (

                                <tr key={index} >
                                    <td style={{ position: 'sticky', left: '0.1px', background: 'inherit', zIndex: 2 }}>{key.timestamp.slice(0, 10)}</td>
                                    <td style={{ position: 'sticky', left: '4.8rem', background: 'inherit', zIndex: 2 }}>{key.timestamp.slice(11, 19)}</td>
                                    {key.data.map((key2, index) => (
                                        <td key={index}>{key2.value}</td>
                                    ))}</tr>)

                            )
                        }

                    </tbody>
                </Table>
            </ScrollArea>
        </div>
    )
}

export default TrailsMachineData
