import React, { useState } from 'react'
import NavBarTopComponent from '../components/NavBar/NavBarTopComponent'
import './Css/pages.css'
import { ActionIcon, Box, } from '@mantine/core'
import { AppShell, Header } from '@mantine/core';

import { GiGears, GiHamburgerMenu } from 'react-icons/gi';
import { BiSolidDashboard, BiSolidReport } from 'react-icons/bi';
import { IoMdNotifications } from 'react-icons/io';
import { AiFillSetting } from 'react-icons/ai';
import { Link, Outlet } from 'react-router-dom';



const MainLayout
    = () =>
    {
        let [open, setOpen] = useState(false);
        const [showText, setShowText] = useState(false);
        const [largeNavbar, setLargeNavbar] = useState(false);
        const [active, setActive] = useState('Dashboard');
        const [activeComponent, setActiveComponent] = useState('');

        const handleClose = () =>
        {
            setOpen((open) = () => false)

        }

        const toggleTextVisibility = () =>
        {
            setShowText(!showText);
        };

        const toggleNavbarSize = () =>
        {
            setLargeNavbar(!largeNavbar);

        };


        const sidebarItems = [
            { link: '/dashboard', icon: <BiSolidDashboard size={showText ? '1.5rem' : '1.5rem'} />, label: 'Dashboard' },
            { link: '/machinelist', icon: <GiGears size={showText ? '1.5rem' : '1.5rem'} />, label: 'Machine' },
            { link: '/trails', icon: <IoMdNotifications size={showText ? '1.5rem' : '1.5rem'} />, label: 'Trails' },
            { link: '/reports', icon: <BiSolidReport size={showText ? '1.5rem' : '1.5rem'} />, label: 'Reports' },
            { link: '/settings', icon: <AiFillSetting size={showText ? '1.5rem' : '1.5rem'} />, label: 'Settings' },
        ];
        const handleLinkClick = (item) =>
        {
            console.log(`Link clicked: ${item.label}`);
            setActive(item.components);
        };

        return (

            <AppShell
                open={open}
                onClose={handleClose}
                padding="md"
                navbar={<div className={`sidebar ${largeNavbar ? 'large-navbar' : ''}`} style={{
                    marginTop: '5rem', width: largeNavbar ? '13rem' : '4.7rem', transition: 'width 0.1s ease-in', background: 'transparent'
                }}>

                    {sidebarItems.map((item, index) => (
                        <Link
                            to={item.link}
                            key={item.label}
                            onClick={() => handleLinkClick(item)}
                            style={{ textDecoration: 'none', color: 'var(--color-text)' }}
                        >
                            <div className="sidebar-item" key={index} >

                                <div className='sidebar-icon'>

                                    {item.icon}
                                </div>

                                {showText && <div className="sidebar-text" >

                                    <span>{item.label}</span>
                                </div>}

                            </div>
                        </Link>
                    ))}

                </div>
                }
                header={<Header height={60} p="xs" px={0} py={0} m={'0'} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', boxShadow: 'rgba(0, 0, 0, 0.45) -6px -15px 9px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '0.8rem' }}>

                        <ActionIcon color='dark' size={'xl'} radius={'xl'} onClick={() => { toggleTextVisibility(); toggleNavbarSize(); }} style={{ zIndex: '105' }}>
                            <GiHamburgerMenu size={'1.6rem'} color='#373737' />
                        </ActionIcon>
                    </div>
                    <Box >
                        <NavBarTopComponent />
                    </Box>
                </Header>}
                styles={(theme) => ({
                    main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
                })}
            >
                <Outlet />
            </AppShell>

        )

    }

export default MainLayout

