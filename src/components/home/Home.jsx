import { Button } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () =>
{
    return (
        <div>

            <Link to={"/login"}><Button>Login</Button></Link>
        </div>
    )
}

export default Home
