import React, { useEffect, useState, } from 'react';
import "./LoginForm.css";
import { useNavigate } from 'react-router-dom';
// import cookies from 'cookies';
import
{
    TextInput,
    PasswordInput,
    Paper,
    Title,
    Container,
    Button,
    Image,
    Box,
    Text,
} from '@mantine/core';
import client from '../../API/API';

const LoginForm = () =>
{

    const [currentUser, setCurrentUser] = useState(false);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loader, setLoader] = useState(null)
    const [error, setError] = useState('');


    const navigate = useNavigate();
    useEffect(() =>
    {
        if (window.location.pathname === "/")
        {
            navigate('/login')

        }
    })

    function handleLogin(e)
    {
        setLoader(true)
        e.preventDefault();

        client.post('/login/', {
            username: username,
            password: password
        })
            .then(function (response)
            {
                if (response.data.status === 'user_validated')
                {
                    window.localStorage.setItem("Authorization", response.data.generated_token)
                    window.localStorage.setItem("username", response.data.username)
                    navigate('/dashboard')


                    // console.log("user : " + response.data.username)

                } else
                {
                    setError("Enter correct password or username ")
                }

            })
            .catch(function (error)
            {
                console.log(error);
            });

    }
    return (
        <div>
            {
                currentUser ? (
                    navigate('/dashboard')
                ) :

                    <Container size={350} mt={120} id='container_login' color='var(-color-bg)'>
                        <Box m={30} mt={80}>
                            <Image width={300} h={80} src="https://automactechnologies.in/wp-content/uploads/2021/04/logo-1536x364.png" alt="" />
                        </Box>


                        <Paper withBorder shadow="md" p={30} radius="md" >
                            <form onSubmit={handleLogin}>
                                {/* <Box display={'flex'} >
                                <Image width={150} mt={20} mb={20} h={60} src="https://automactechnologies.in/wp-content/uploads/2021/04/logo-1536x364.png" alt="" />
                                </Box> */}

                                <Title
                                    align="center"
                                    mt={5} mb={20}
                                    weight={500}
                                    color='var(--color-bold-text)'
                                >
                                    Login
                                </Title>
                                <TextInput
                                    label="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.currentTarget.value)}
                                    placeholder="Enter Username"
                                    error={!!error}
                                    required
                                />
                                {error && <Text color="red">{error}</Text>}


                                <PasswordInput
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.currentTarget.value)}
                                    placeholder="Enter password"
                                    error={!!error}
                                    required
                                    mt="md"

                                />


                                {/* <Group position="apart" mt="lg">
                                    <Anchor component="button" size="sm">
                                        Forgot password?
                                    </Anchor>
                                </Group> */}
                                <Button fullWidth mt="xl" mb={20} type='submit' loading={loader}>
                                    Login
                                </Button>

                            </form>

                        </Paper>
                    </Container>

            }
        </div>);
};

export default LoginForm;







//     const config = {
//         method: 'post',
//         url: 'http://65.0.154.172/login/',
//         data: {
//             username: username,
//             password: password
//         },
//         withCredentials: true,
//     };
//     axios(config)
//         .then((response) =>
//         {
//             // const cookies = response.headers.get['set-cookie'];
//             // console.log(Cookies.get('authToken') + "  cookies");
//             // console.log(JSON.stringify(Cookies.get()) + "  cookies");
//             console.log(response)
//             // console.log(response.headers.get('set-cookie') + "new")
//             // const server = response.headers.get('server')
//             setCurrentUser(true)

//         })
//         .catch((error) =>
//         {
//             console.log(error);
//         });



// this is new
// const config = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: 'http://192.168.29.144/login/',
//     withCredentials: true,
//     data: {
//         username: username,
//         password: password
//     },
// };

// axios.request(config)
//     .then((response) =>
//     {
//         // const cookies = cookies.parse(response.headers['cookie']);
//         // const sessionid = cookies['sessionid'];
//         console.log(response.data)
//         // Do something with the sessionid.
//     })
//     .catch((error) =>
//     {
//         console.log(error);
//     });

//     axios.post("http://65.0.154.172/login/",
//         {
//             username: username,
//             password: password
//         },)
//         .then(function (response)
//         {


//             if (response.data.status === "user_validated")
//             {
//                 setCurrentUser(true);

//             } else
//             {

//                 alert(setCurrentUser(false) + 'i set to false');
//             }
//         })
//         .catch(function (error)
//         {
//             // alert(setCurrentUser(false) + " error catch");
//             console.log(error)
//         });
// }

// const handleLogin = async (/** @type {{ preventDefault: () => void; }} */ e) =>
// {

//     console.log(username, password)
//     e.preventDefault();


// };










// const handleInputChange = (value) =>
// {
//     setUsername(value);

//     // Validate the input value here
//     if (value.length < 5)
//     {
//         setErrorA('Input must be at least 5 characters');
//     } else
//     {
//         setErrorA('');
//     }
// };

// const handleInputPassword = (value) =>
// {
//     setPassword(value);

//     // Validate the input value here
//     if (value.length < 3)
//     {
//         setErrorB('Input must be at least 3 characters');
//     } else
//     {
//         setErrorB('');
//     }
// };

// const cookies = cookies.parse(response.headers['cookie']);
// const sessionid = cookies['sessionid'];
// console.log(response)
// console.log(response.headers)

// console.log(response.headers['content-type'])
// console.log("cookies")
// console.log(response.headers['Cookie'])

// console.log(cookies)
// console.log(sessionid)
// console.log("req")
// console.log(req)