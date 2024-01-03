import React from 'react'
import { Container, Table } from '@mantine/core'

const TableComponent = (props) =>
{
    const { row, id } = props
    // console.log("rows : " + JSON.stringify(row))

    return (
        <Container fluid >
            <Table verticalSpacing="md" horizontalSpacing='xl' striped shadow='sm' highlightOnHover id={id}>

                <thead style={{
                    position: "sticky",
                    top: 0,
                    width: 'auto', background: 'white', zIndex: 3
                }}>
                    <tr>
                        <th style={{ width: '100px' }}>Date</th>
                        <th style={{ width: '100px' }}>Time</th>
                        <th style={{ width: '100px' }}>Low</th>
                        <th style={{ width: 'auto' }}>High</th>
                    </tr>
                </thead>


                <tbody>
                    {/* <tr>
                        <td>Body</td>
                    </tr> */}
                    {
                        row.map((key) => (<tr><td>{key.timestamp.slice(0, 10)}</td><td>{key.timestamp.slice(11, 19)}</td>{key.value.map((index) => (<td>{index}</td>))}</tr>))
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default TableComponent
