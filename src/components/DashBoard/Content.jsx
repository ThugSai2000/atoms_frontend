import React from 'react'
import "./CSS/content.css"
import { Card, Col, Container, Grid, List, Paper, Text, ThemeIcon } from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons-react'

const Content = () =>
{


    const secondgriditems = []

    for (let j = 1; j <= 3; j++)
    {
        secondgriditems.push(
            <Card padding="md" shadow="xs" radius="md" mt={'1rem'} style={{ background: 'var(--color-bg)' }}>
                <Grid gutter="lg">
                    <Col span={3}>
                        <Paper padding="md" style={{ background: 'var(--color-bg)' }}>
                            <Text size="lg" weight={500} style={{ marginBottom: '1rem' }}>
                                Machine Name
                            </Text>
                            <List
                                spacing="xs"
                                size="sm"
                                center
                                icon={
                                    <ThemeIcon color="teal" size={24} radius="xl">
                                        <IconCircleCheck size="1rem" />
                                    </ThemeIcon>
                                }
                            >
                                <List.Item>Active</List.Item>

                            </List>
                        </Paper>
                    </Col>
                    <Col span={3}>
                        <Paper padding="md" style={{ background: 'var(--color-bg)' }}>
                            <Text size="lg" weight={500} style={{ marginBottom: '1rem' }}>
                                540 ltr
                            </Text>
                            <Text>Daily Water Generated</Text>
                        </Paper>
                    </Col>
                    <Col span={3}>
                        <Paper padding="md" style={{ background: 'var(--color-bg)' }}>
                            <Text size="lg" weight={500} style={{ marginBottom: '1rem' }}>
                                2630 ltr
                            </Text>
                            <Text>Total Water Generated</Text>
                        </Paper>
                    </Col>
                    <Col span={3}>
                        <Paper padding="md" style={{ background: 'var(--color-bg)' }}>
                            <Text size="lg" weight={500} style={{ marginBottom: '1rem' }}>
                                Normal
                            </Text>
                            <Text>Dosing Solution Level</Text>
                        </Paper>
                    </Col>
                </Grid>
            </Card>

        )

    }


    return (
        <Container mt={'0.5rem'} fluid><Text size="xl" weight={600} mt={'0.5rem'} ml={'1rem'} style={{ marginBottom: '1rem' }}>
            Dashboard
        </Text>
            <Container size="lg" >
                <Grid gutter="lg">
                    {/* First row with four columns */}
                    <Col span={3}>
                        <Card padding="lg" shadow="xs" radius="md" style={{ background: 'var(--color-bg)' }}>
                            <Text size="lg" weight={500} style={{ marginBottom: '1rem' }}>
                                14
                            </Text>
                            <Text>No. of Machines</Text>
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Card padding="lg" shadow="xs" radius="md" style={{ background: 'var(--color-bg)' }}>
                            <Text size="lg" weight={500} style={{ marginBottom: '1rem' }}>
                                11
                            </Text>
                            <Text>Active Machines</Text>
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Card padding="lg" shadow="xs" radius="md" style={{ background: 'var(--color-bg)' }}>
                            <Text size="lg" weight={500} style={{ marginBottom: '1rem' }}>
                                2
                            </Text>
                            <Text>Active Machines</Text>
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Card padding="lg" shadow="xs" radius="md" style={{ background: 'var(--color-bg)' }}>
                            <Text size="lg" weight={500} style={{ marginBottom: '1rem' }}>
                                1
                            </Text>
                            <Text>Broke</Text>
                        </Card>
                    </Col>
                </Grid>
                <div>
                    {secondgriditems}
                </div>

            </Container>
        </Container>
    )
}

export default Content
