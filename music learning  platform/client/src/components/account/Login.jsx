import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: '100%',
    height: 'auto',
    display: 'block',
    margin: 'auto',
    padding: '50px 0 0',
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #FB641B; // Changed to match the theme
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color:rgb(14, 14, 14); // Changed to match the theme
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: rgb(249, 240, 240);
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;

const loginInitialValues = {
    email: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    email: '',
    password: '',
    role: '',
    interest: ''
};

const roles = ['Blog Creator', 'Blog Reader'];
const interests = ['Chordophones', 'Aerophones', 'Idiophones', 'Membranophones', 'Keyboard-Instruments','Electronic-Instruments'];

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    const imageURL = 'https://thumbs.dreamstime.com/b/music-design-over-white-background-vector-illustration-44922674.jpg';

    useEffect(() => {
        showError(false);
    }, [login]);

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const loginUser  = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            showError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            isUserAuthenticated(true);
            setLogin(loginInitialValues); // Reset login fields
            navigate('/');
        } else {
            showError('Something went wrong! please try again later');
        }
    };

    const signupUser  = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues); // Reset signup fields
            toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later');
        }
    };

    const toggleSignup = () => {
        if (account === 'signup') {
            setSignup(signupInitialValues); // Reset signup fields when toggling
            toggleAccount('login');
        } else {
            setLogin(loginInitialValues); // Reset login fields when toggling
            toggleAccount('signup');
        }
    };

    return (
        <Component>
            <Image src={imageURL} alt="Login" />
            <Wrapper>
                {account === 'login' ? (
                    <>
                        <TextField
                            label="Email"
                            name="email"
                            value={login.email}
                            onChange={onValueChange}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={login.password}
                            onChange={onValueChange}
                        />
                        {error && <Error>{error}</Error>}
                        <LoginButton onClick={loginUser }>Login</LoginButton>
                        <Text>Don't have an account? <Button onClick={toggleSignup}>Signup</Button></Text>
                    </>
                ) : (
                    <>
                        <TextField
                            label="Name"
                            name="name"
                            value={signup.name}
                            onChange={onInputChange}
                        />
                        <TextField
                            label="Username"
                            name="username"
                            value={signup.username}
                            onChange={onInputChange}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={signup.email}
                            onChange={onInputChange}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={signup.password}
                            onChange={onInputChange}
                        />
                        <FormControl>
                            <InputLabel>Role</InputLabel>
                            <Select
                                name="role"
                                value={signup.role}
                                onChange={onInputChange}
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role} value={role}>{role}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel>Interest</InputLabel>
                            <Select
                                name="interest"
                                value={signup.interest}
                                onChange={onInputChange}
                            >
                                {interests.map((interest) => (
                                    <MenuItem key={interest} value={interest}>{interest}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {error && <Error>{error}</Error>}
                        <SignupButton onClick={signupUser }>Signup</SignupButton>
                        <Text>Already have an account? <Button onClick={toggleSignup}>Login</Button></Text>
                    </>
                )}
            </Wrapper>
        </Component>
    );
};

export default Login;