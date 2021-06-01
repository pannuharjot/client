import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { showError, showSuccess } from '../../utils/notification/Notification';
import { dispatchLogin } from '../../../redux/actions/authAction'
import  { useDispatch } from 'react-redux';



const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}


function Login() {

    const [user, setUser] = useState(initialState);
    const { email, password, err, success } = user;
    const dispatch = useDispatch();
    const history = useHistory();

    const invalid = password.length <= 6 || password === null || password === 'undefined' || email === null


    const handleChangeInput = e => {

        const { name, value } = e.target;
        // setUser({...user, [e.target.name]: e.target.value, err: '', success: ''})
        setUser({ ...user, [name]: value, err: '', success: '' })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(invalid) return setUser({...user, err: 'Password & Email cannot be empty!',  success: ''})
        try {
            const res = await (axios.post('/user/login', { email, password }))
            setUser({ ...user, error: '', success: res.data.msg })
            localStorage.setItem('firstLogin', true);
            dispatch(dispatchLogin())
            history.push('/');
        } catch (err) {
            err.response.data.msg && setUser({ ...user, err: err.response.data.msg, success: '' });
        }
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Header uppercase>Login</Header>
            {user.err && showError(user.err)}
            <Container>
                <Input type="email" onChange={handleChangeInput} placeholder="Enter Email Address" id="email" value={email} name="email" />
            </Container>
            <Container>

                <Input type="password" onChange={handleChangeInput} placeholder="Enter Password" id="password" value={password} name="password" />
            </Container>

            <Container>
                <Button type="submit"> Login</Button>
                <ForgotPassword to="/forgot_password">Forgot Password</ForgotPassword>
            </Container>
            <Container>
            {user.success && showSuccess(user.success)}
            </Container>
            <Container center>
                <Register to="/register"> New Customer?</Register>
            </Container>

            
        </Form>



    )
}

const Button = styled.button`
width: 150px;
padding: 10px 0;
color: white;
background: black;
text-transform: uppercase;
letter-spacing: 1.5px;
margin-right: 10px;

`;

const ForgotPassword = styled(Link)`
text-decoration: none;
margin: 3px;
padding: 3px;
color: crimson;
`

const Register = styled(Link)`
text-decoration: none;
margin: 3px;
padding: 3px;
color: crimson;
`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
max-width: 500px;
margin: auto;
color: #444;
padding: 0 15px;
border: 2px solid red;


`


const Container = styled.div`
display: flex;
text-align: center;
justify-content: ${({center}) => center ? 'center' : 'space-between'};
align-items: center;
`

const Header = styled.h1`

text-align: center;
//text-transform: uppercase;
text-transform:${({ uppercase }) => uppercase ? 'uppercase' : ''};

`

const Form = styled.form`
    margin: auto;
    color: #444;
    padding:0 15px;
    padding: 20px;;
`

const Label = styled.label`
`
const Input = styled.input`
width: 100%;
height: 45px;
margin: 10px 0;
outline: none;
padding: 0 10px;
`;

export default Login
