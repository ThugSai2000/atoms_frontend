import { useState } from 'react';
import
{
    AppShell,
    Navbar,
    Header,
    Footer,
    Aside,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
    Container,
    Image,
    Box,
    Button,
    SimpleGrid,
    Paper,
} from '@mantine/core';
import AutomacScreen1 from "../../assets/AutomacScreen3.png"
import HeaderLogo from "../../assets/A_favicon_io/favicon-32x32.png"
import { Link } from 'react-router-dom';



export default function AppShellDemo()
{

    return (
        <AppShell
            style={{ background: `url(${AutomacScreen1})`, backgroundSize: '100% 140%', backgroundRepeat: 'no-repeat' }}
            footer={
                <Footer height={60} p="md" w={'unset'} size={24} fw={500} color='var(--color-bold-text)' sx={{ textAlign: 'center' }} bg={'var(--color-bg)'}>
                    Powered by AUTOMAC
                </Footer>
            }
            header={
                <Header height={{ base: 50, md: 70 }} p="md" bg={'var(--color-bg)'}>
                    <div style={{ height: '100%' }}>
                        <SimpleGrid cols={2}>
                            <Image src={HeaderLogo} width={'inherit'} h={'inherit'} sx={{ marginLeft: '50px' }} />
                            <Link to={'/login'}>
                                <Button w={100} ml={600}>
                                    Login
                                </Button>
                            </Link>
                        </SimpleGrid>
                    </div>
                </Header>
            }
        >
            <main>


                <Container fluid w={'100%'} h={'100%'} style={{ display: "grid", placeItems: 'center', zIndex: 20, }} mt={0}>
                    <Box p={300} pt={200}>
                        <Link to={'/login'}>
                            <Button w={200}>
                                Login
                            </Button>
                            <br />
                        </Link>
                    </Box>


                </Container>
                {/* <Image src={AutomacScreen1} p={0} m={0} zIndex={0} /> */}

            </main>

        </AppShell>
    );
}