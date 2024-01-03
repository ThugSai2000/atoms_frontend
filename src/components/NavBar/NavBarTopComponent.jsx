import React from 'react';
import { Container, Input, Tooltip, Group, Box, Image } from '@mantine/core';
import { AiOutlineSearch } from 'react-icons/ai';
import Notifications from './Notifications';
import Logout from './Logout';
import AtomsLogo from "./../../assets/AtomsLogo.png"


// import './CSS/navbarTop.css';

const NarBarTopComponent = () =>
{

  return (
    <Container size="lg">

      <div style={{ padding: '0.5rem' }}>



        <div id="navCompanyLogo" >

          <Group position='left'>
            <Image
              width={104}
              mt={20}
              ml={56}
              src={window.localStorage.logourl}
              alt="Atoms Logo"
            />
          </Group>

        </div>
        <Group position='right' style={{ margin: '0', alignItems: 'center' }}>
          {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
          {/* <Input
            id="navtop_search"
            placeholder="Search..."
            rightSection={

              <AiOutlineSearch

                size="1rem"
                id="icon_search"
                style={{ opacity: 0.5, marginTop: '11px' }} />

            }
          /> */}
          {/* <Box mt={7} >
            <Notifications />
          </Box> */}
          <Box mt={7}>
            <Logout />
          </Box>
          {/* </div> */}
        </Group>
      </div>
    </Container>
  );
};

export default NarBarTopComponent;
