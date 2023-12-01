import React, { useEffect, useState } from 'react'
import { Accordion, Title } from '@mantine/core'
import DigitalInput from './IOcards/DigitalInput';
import DigitalOutput from './IOcards/DigitalOutput';
import AnalogInput from './IOcards/AnalogInput';
import AnalogOutput from './IOcards/AnalogOutput';
import { machineDropdownAtom, timestampglobal } from '../../API/API';
import { useRecoilValue } from 'recoil';
import Params from './IOcards/Params';


const IOStatusMachines = () =>
{
  const [value, setValue] = useState([] || "item-1");
  const [dbtimestamp, setDbtimestamp] = useState('')
  const dpvalue = useRecoilValue(machineDropdownAtom)
  const timestampvalue = useRecoilValue(timestampglobal);
  useEffect(() =>
  {


    if (dpvalue !== "")
    {
      setDbtimestamp(timestampvalue)
    }
  }, [dpvalue, timestampvalue])
  return (
    <>
      <Title fw={500} fz={16} p={'1rem'} ml={'0rem'} color='var(--color-onclick)'>Last updated at: {dbtimestamp}</Title>

      <Accordion value={value} onChange={setValue} variant="filled">
        <Accordion.Item value="item-1">
          <Accordion.Control> <Title fw={500} fz={16} pt={'1rem'} ml={'0rem'} color='var(--color-bold-text)'>Digital Input</Title></Accordion.Control>

          <Accordion.Panel><DigitalInput /></Accordion.Panel>


        </Accordion.Item>

        <Accordion.Item value="item-2">
          <Accordion.Control><Title fw={500} fz={16} pt={'1rem'} ml={'0rem'} color='var(--color-bold-text)'>Digital Output </Title></Accordion.Control>
          <Accordion.Panel><DigitalOutput /></Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="item-3">
          <Accordion.Control><Title fw={500} fz={16} pt={'1rem'} ml={'0rem'} color='var(--color-bold-text)'>Analog Input</Title></Accordion.Control>
          <Accordion.Panel><AnalogInput /></Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="item-4">
          <Accordion.Control> <Title fw={500} fz={16} pt={'1rem'} ml={'0rem'} color='var(--color-bold-text)'>Analog Ouput</Title></Accordion.Control>
          <Accordion.Panel><AnalogOutput /></Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="item-5">
          <Accordion.Control> <Title fw={500} fz={16} pt={'1rem'} ml={'0rem'} color='var(--color-bold-text)'>Params</Title></Accordion.Control>
          <Accordion.Panel><Params /></Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default IOStatusMachines
