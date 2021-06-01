import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { showError, showSuccess } from '../../utils/notification/Notification';
import { dispatchLogin } from '../../../redux/actions/authAction'
import  { useDispatch } from 'react-redux';
import { throttle } from '../../utils/utility';
import { isEmail, isMatch, validPassword, isEmpty} from '../../utils/validations/Validation'

const initialState = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}


function Register() {
    const [user, setUser] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();
    const { name, email, password, cf_password,  error, success } = user;

    const handleChangeInput = e => {

        const { name, value } = e.target;
        // setUser({...user, [e.target.name]: e.target.value, err: '', success: ''})
        setUser({ ...user, [name]: value, err: '', success: '' })
    }
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isEmpty(name) || isEmpty(password)) {
            return setUser({...user, err: "Please fill in all the fields"})
        }
        if(!isEmail(email)) {
            return setUser({...user, err: "Invalid Email"})
        }
        if(!validPassword(email)) {
            return setUser({...user, err: "Password must be greater then 6 characters."})
        }
        if(!isMatch(password, cf_password)) {
            return setUser({...user, err: "Password Must Match"})
        }
        try {
            const res = await (axios.post('/user/register', { name, email, password }))
            setUser({ ...user, err: '', success: res.data.msg })
        } catch (err) {
            err.response.data.msg && setUser({ ...user, err: err.response.data.msg, success: '' });
        }
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Header uppercase>Register</Header>
            {user.err && showError(user.err)}
            <Container>
                <Input type="text" onChange={handleChangeInput} placeholder="Enter Name" id="name" value={name} name="name" />
            </Container>
            <Container>
                <Input type="email" onChange={handleChangeInput} placeholder="Enter Email Address" id="email" value={email} name="email" />
            </Container>
            <Container>
                <Input type="password" onChange={handleChangeInput} placeholder="Enter Password" id="password" value={password} name="password" />
            </Container>
            <Container>
                <Input type="password" onChange={handleChangeInput} placeholder="Confirm Password" id="cf_password" value={cf_password} name="cf_password" />
            </Container>

            <Container>
                <Button type="submit"> Register</Button>
                <Login to="/login"> Aready have an Account?</Login>
            </Container>

            
            {user.success && showSuccess(user.success)}
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

const Login = styled(Link)`
text-decoration: none;
margin: 3px;
padding: 3px;
color: crimson;
text-align: center;
justify-content: center;
padding-top: 12px;
font-weight: bold;

:hover {
    padding: .03px;
    text-decoration: underline;
    color: lightgreen;
}
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
justify-content: space-between;
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

:hover {
    padding: 13 0;
    border: .5px solid red;
}
`;

export default Register
