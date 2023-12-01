
import
{
    flexRender,
    useMantineReactTable,
} from 'mantine-react-table';
import './CSS/machinesDetails.css'
import { Anchor, Box, Flex, Stack, Table } from '@mantine/core';
import { BiDownload, BiSolidFileDoc } from 'react-icons/bi'
import { useEffect, useState } from 'react';

import client from '../../API/API';





const ManualDocs = () =>
{
    const [manualstabledata, setManualsTableData] = useState({})

    const columns = [
        {
            accessorKey: 'pdf',
            header: '',
            Cell: ({ cell }) => (
                <Box style={{ display: 'flex', flexDirection: 'column', fontSize: '2rem' }}>

                    <BiSolidFileDoc />

                </Box>
            ),
        },
        {
            accessorKey: 'sheet',
            header: '',
            Cell: ({ cell }) => (
                <Box style={{ display: 'flex', flexDirection: 'column' }}>

                    {cell.getValue()?.toLocaleString?.('en-US', {

                    })}
                    <label >name</label>
                </Box>
            ),
        },
        {
            accessorKey: 'time',
            header: '',
            Cell: ({ cell }) => (
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <label >Created</label>
                    {cell.getValue()?.toLocaleString?.('en-US', {

                    })}

                </Box>
            ),
        },
        {
            accessorKey: 'download',
            header: '',
            Cell: ({ cell }) => (
                <Box style={{ textAlign: 'center', fontSize: '2rem' }}>

                    <BiDownload />

                </Box>
            ),
        },
        {
            accessorKey: 'view',
            header: '',
            Cell: ({ cell }) => (
                <Box style={{ textAlign: 'center' }}>

                    <Anchor href="https://www.youtube.com">View</Anchor>

                </Box>
            ),
        },
    ];

    const data = [{
        pdf: 'Product A',
        sheet: 'Company X',
        time: '2023-08-24',
        view: 'Active',
    },
    {
        pdf: 'Product B',
        sheet: 'Company Y',
        time: '2023-08-25',
        view: 'Inactive',
    },
    {
        pdf: 'Product C',
        sheet: 'Company Z',
        time: '2023-08-26',
        view: 'Active',
    },
    {
        pdf: 'Product D',
        sheet: 'Company X',
        time: '2023-08-27',
        view: 'Active',
    },
    {
        pdf: 'Product A',
        sheet: 'Company X',
        time: '2023-08-24',
        view: 'Active',
    },
    {
        pdf: 'Product B',
        sheet: 'Company Y',
        time: '2023-08-25',
        view: 'Inactive',
    },
    {
        pdf: 'Product C',
        sheet: 'Company Z',
        time: '2023-08-26',
        view: 'Active',
    },
    {
        pdf: 'Product D',
        sheet: 'Company X',
        time: '2023-08-27',
        view: 'Active',
    },]
    const getmanualdata = () =>
    {
        client.get('/machine_details/', {
            params: {
                machine_id: "ABD2",
                module: "Details"
            }
        }).then(async (response) =>
        {
            const a = JSON.stringify(response.data.Manuals_and_Docs);
            const b = JSON.parse(a)
            console.log(b)
            setManualsTableData(b)
        }).catch((error) =>
        {
            console.error("Error fetching machine data: ", error);
        })
    }
    useEffect(() =>
    {
        // getmanualdata()
    }, [])
    const table = useMantineReactTable({
        columns,
        data,


        initialState: {
            pagination: { pageSize: 3, pageIndex: 0 },

        },
        //customize the MRT components
        mantinePaginationProps: {

            showRowsPerPage: false,
        },
        paginationDisplayMode: 'pages',
        positionPagination: "flex-end"
    });


    return (
        <>
            <Stack >

                <Flex justify="space-between" align="center">


                </Flex>

                <Table
                    captionSide="top"
                    fontSize="md"
                    highlightOnHover
                    horizontalSpacing="xl"
                    striped
                    verticalSpacing="xs"

                >

                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.Header ??
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.Cell ?? cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {/* <MRT_ToolbarAlertBanner stackAlertBanner table={table} /> */}

            </Stack>
            {/* <MRT_TablePagination table={table} /> */}
        </>
    );
};

export default ManualDocs;