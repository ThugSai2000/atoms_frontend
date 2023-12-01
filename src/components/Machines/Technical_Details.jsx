
import
{
  MantineReactTable,
  createRow,
  // createRow,
  useMantineReactTable,
} from 'mantine-react-table';
import { ActionIcon, Box, Button, Text } from '@mantine/core';

import { IconEdit, IconTrash } from '@tabler/icons-react';
import './CSS/machinesDetails.css'

const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
    enableEditing: false,
    size: 50,

  },
  {
    accessorKey: 'make',
    header: 'Make',
    size: 50,
    Cell: ({ cell }) => (
      <Box style={{ display: 'flex', flexDirection: 'column' }}>

        {cell.getValue()?.toLocaleString?.('en-US', {

        })}
        <label >code:DSR120R</label>
      </Box>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Date',
    size: 50,
  },
  {
    accessorKey: 'vendor',
    header: 'Vendor',
    size: 50,
    Cell: ({ cell }) => (
      <Box style={{ display: 'flex', flexDirection: 'column' }}>

        {cell.getValue()?.toLocaleString?.('en-US', {

        })}
        <label >Actions</label>
      </Box>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    editVariant: 'select',
    size: 50,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          backgroundColor:
            cell.getValue() < 50_000
              ? theme.colors.red[9]
              : cell.getValue() >= 50_000 &&
                cell.getValue() < 75_000
                ? theme.colors.yellow[9]
                : theme.colors.red[9],
          borderRadius: '4px',
          color: '#fff',
          maxWidth: '9ch',
          padding: '4px',
        })}
      >
        {cell.getValue()?.toLocaleString?.('en-US', {

          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
      </Box>
    ),
  },
]

var data = [
  {
    name: 'Product A',
    make: 'Company X',
    date: '2023-08-24',
    vendor: 'Vendor 1',
    status: 'Active',
  },
  {
    name: 'Product B',
    make: 'Company Y',
    date: '2023-08-25',
    vendor: 'Vendor 2',
    status: 'Inactive',
  },
  {
    name: 'Product C',
    make: 'Company Z',
    date: '2023-08-26',
    vendor: 'Vendor 3',
    status: 'Active',
  },
  {
    name: 'Product D',
    make: 'Company X',
    date: '2023-08-27',
    vendor: 'Vendor 1',
    status: 'Active',
  },
  {
    name: 'Product E',
    make: 'Company Y',
    date: '2023-08-28',
    vendor: 'Vendor 2',
    status: 'Inactive',
  },
  {
    name: 'Product F',
    make: 'Company Z',
    date: '2023-08-29',
    vendor: 'Vendor 3',
    status: 'Active',
  },
  {
    name: 'Product G',
    make: 'Company X',
    date: '2023-08-30',
    vendor: 'Vendor 1',
    status: 'Active',
  },
  {
    name: 'Product H',
    make: 'Company Y',
    date: '2023-08-31',
    vendor: 'Vendor 2',
    status: 'Inactive',
  },
  {
    name: 'Product I',
    make: 'Company Z',
    date: '2023-09-01',
    vendor: 'Vendor 3',
    status: 'Active',
  },
  {
    name: 'Product J',
    make: 'Company X',
    date: '2023-09-02',
    vendor: 'Vendor 1',
    status: 'Active',
  },
];

//console.log(data1);






const TableTechnicalDetails = () =>
{
  const table = useMantineReactTable({
    columns,
    data,
    initialState: { pagination: { pageSize: 3, pageIndex: 0 } },
    mantinePaginationProps: {
      showRowsPerPage: false,
    },
    paginationDisplayMode: 'pages',


    enableRowSelection: true,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box style={{
        display: 'flex',
        flexDirection: 'row',
        margin: '0',
        justifyContent: 'space-between',
        width: '100%'
      }}>
        <Text className='subcardHeading' style={{ paddingLeft: '1rem' }}>Technical Details</Text>
        <Button
          onClick={() =>
          {
            table.setCreatingRow(true);

            //simplest way to open the create row modal with no default values
            //or you can pass in a row object to set default values with the `createRow` helper function
            table.setCreatingRow(
              createRow(table, {
                //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
              }),
            );
          }}
        >
          New Report
        </Button>
      </Box>

    ),
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>

        <ActionIcon
          color="orange"
          onClick={() =>
          {
            //table.setEditingRow(row);
            alert("You Want to Edit")
          }}
        >
          <IconEdit />
        </ActionIcon>
        <ActionIcon
          color="red"
          onClick={() =>
          {

            alert("You Want to Delete")
          }}
        >
          <IconTrash />
        </ActionIcon>
      </Box>
    ),
  });
  const customRowProps = {
    sx: {
      height: '12px',
      color: 'red' // Set the height of the rows to 10px
    },
  };
  return (
    <div className='technicalDetailsContainer' style={{ backgroundColor: 'transparent' }}>

      <MantineReactTable table={table} mantineTableBodyRowProps={customRowProps} />


    </div>
  );
};


export default TableTechnicalDetails;

