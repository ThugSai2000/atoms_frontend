import { Accordion, SimpleGrid, Title } from '@mantine/core'
import React from 'react'
import DigitalDataCard from '../cards/DigitalDataCard'
import AnalogDataCard from '../cards/AnalogDataCard'

const AccordianComponent = (props) =>
{
    const { data } = props
    function formatString(text)
    {
        // Replace underscores with spaces
        formattedText = text.replace("_", " ");

        // Capitalize the first letter, then any letters after spaces
        return formattedText.replace(/\b\w/g, char => char.toUpperCase());
    }
    var formattedText

    return (
        <div>

            <Accordion defaultValue={"Digital Input"} variant="contained" bg={'var(--color-white)'}>
                {Object.entries(data).map(([key, value]) => (

                    value.length > 0 ? <Accordion.Item key={key} value={key}>
                        <Accordion.Control> <Title fw={500} fz={16} p={'0.5rem'} ml={'0rem'} color='var(--color-bold-text)'>{formattedText = formatString(key)}</Title></Accordion.Control>

                        <Accordion.Panel>
                            <div style={{ height: '100%', width: 'auto', backgroundColor: 'var(--color-white)', borderRadius: '0.5rem', }}>
                                <SimpleGrid cols={5} h={'100%'} p={'1rem'} >
                                    {(key === "digital_input" || key === "digital_output") ? value.map((card) => (
                                        <DigitalDataCard key={card.name} data={card} />
                                    )) :
                                        value.map((card) => (
                                            <AnalogDataCard key={card.name} data={card} />
                                        ))

                                    }
                                </SimpleGrid>
                            </div>

                        </Accordion.Panel>

                    </Accordion.Item> : null
                ))

                }

            </Accordion>
            {/* {JSON.stringify(data)} */}
        </div>
    )
}

export default AccordianComponent
