import React from 'react'
import { Avatar, Menu } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import "./CSS/navbarTop.css"
import client from '../../API/API';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../Store/store';
const Logout = () =>
{
    const userValue = useRecoilValue(userAtom)
    const navigate = useNavigate()


    const handleLogout = () =>
    {
        client.get('/logout', {
            headers: {
                Authorization: window.localStorage.getItem('Authorization')
            }
        }).then((response) =>
        {
            if (response.data.status === "Logged_out")
            {
                localStorage.clear()
                navigate('/login');

            }
        })

    };
    return (
        // <Container >
        <Menu withArrow arrowPosition='center' position='bottom-end'>
            <Menu.Target>
                <Avatar color="var(--color-icon)" radius="xl" >{userValue.charAt(0).toLocaleUpperCase()}</Avatar>
            </Menu.Target>
            <Menu.Dropdown sx={{ marginTop: '1.2rem' }}>
                <Menu.Item sx={{ fontSize: '16px' }} fw={500} color='var(--color-bold-text)'>{userValue.charAt(0).toLocaleUpperCase() + userValue.slice(1)}</Menu.Item>
                <Menu.Label>Role</Menu.Label>
                <Menu.Divider />
                <Menu.Item sx={{ fontSize: '16px' }} fw={500} color='var(--color-text)'><Link to={'/settings'} style={{ textDecoration: 'none', color: 'var(--color-text)' }}>Account Settings</Link> </Menu.Item>
                <Menu.Item fw={500} color='rgba(211, 40, 40, 1)' sx={{ fontSize: '16px' }} onClick={handleLogout}>Logout</Menu.Item>
            </Menu.Dropdown>

        </Menu>


        // </Container>
    )
}

export default Logout
