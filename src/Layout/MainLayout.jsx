import React, { useEffect, useRef, useState } from 'react'
import NavBarTopComponent from '../components/NavBar/NavBarTopComponent'
import './Css/pages.css'
import { ActionIcon, Box, Tooltip, } from '@mantine/core'
import { AppShell, Header } from '@mantine/core';

import { GiGears, GiHamburgerMenu } from 'react-icons/gi';
import { BiSolidDashboard, BiSolidReport } from 'react-icons/bi';
import { IoMdNotifications } from 'react-icons/io';
import { AiFillSetting } from 'react-icons/ai';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { activeStyles } from '../utils/sidebarActive';


const MainLayout
    = () =>
    {
        const navigate = useNavigate()
        let [open, setOpen] = useState(false);
        const [showText, setShowText] = useState(false);
        const [largeNavbar, setLargeNavbar] = useState(false);
        const [currentLink, setCurrentLink] = useState(null)
        const currentLinkRef = useRef(null)

        const location = useLocation()
        // console.log("act " + location.pathname)

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
            { link: '/home/dashboard', icon: <BiSolidDashboard size={showText ? '1.5rem' : '1.5rem'} />, label: 'Dashboard' },
            { link: '/home/machinelist', icon: <GiGears size={showText ? '1.5rem' : '1.5rem'} />, label: 'Machine' },
            { link: '/home/trails', icon: <IoMdNotifications size={showText ? '1.5rem' : '1.5rem'} />, label: 'Trails' },
            { link: '/home/reports', icon: <BiSolidReport size={showText ? '1.5rem' : '1.5rem'} />, label: 'Reports' },
            { link: '/home/settings', icon: <AiFillSetting size={showText ? '1.5rem' : '1.5rem'} />, label: 'Settings' },
        ];

        const handleLinkClick = (item) =>
        {

            // item.current.setActive(true);
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

                        <NavLink
                            key={item.link}
                            to={item.link}
                            className='navLink'
                            // onClick={() =>
                            // {
                            //     setCurrentLink(item.link)
                            //     handleLinkClick(item)
                            // }} 
                            // style={currentLink === item.link ? activeStyles : { color: "var(--color-icon)" }}
                            style={{ textDecoration: 'none', color: 'var(--color-text)' }}

                        >

                            <div className="sidebar-item">
                                <Tooltip label={item.label}
                                    color="grey"
                                    position="right-start"
                                    withArrow
                                >
                                    <div style={{ color: 'inherit' }}>
                                        {item.icon}
                                    </div>
                                </Tooltip>

                                {showText && <div className="sidebar-text" >
                                    <span>{item.label}</span>
                                </div>}
                            </div>
                        </NavLink>


                    ))}

                    {/* <NavLink
                        to='/home'
                    >

                        <div className="sidebar-item">
                            <Tooltip label={'DashBoard'}
                                color="grey"
                                position="right-start"
                                withArrow
                            >
                                <div>
                                    <BiSolidDashboard />
                                </div>
                            </Tooltip>

                            {showText && <div className="sidebar-text" >
                                <span>DashBoard</span>
                            </div>}
                        </div>
                    </NavLink>
                    <NavLink
                        to='/home/machinelist'
                    >

                        <div className="sidebar-item">
                            <Tooltip label={'DashBoard'}
                                color="grey"
                                position="right-start"
                                withArrow
                            >
                                <div>
                                    <GiGears />
                                </div>
                            </Tooltip>

                            {showText && <div className="sidebar-text" >
                                <span>Machines</span>
                            </div>}
                        </div>
                    </NavLink> */}

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

