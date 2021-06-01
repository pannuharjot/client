import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { showError, showSuccess } from '../../utils/notification/Notification'
import styled from 'styled-components';
import { validPassword, isMatch, isEmpty } from '../../utils/validations/Validation';


const intialState = {
    password: '',
    cf_password: '',
    err: '',
    success: '',
  
}


function ResetPassword() {

    const [valid, setValid] = useState(true)
    const [data, setData] = useState(intialState)

    const { password, cf_password, err, success } = data
    const { token } = useParams();

    useEffect(() => {
      
    }, [valid])

    const handleChangeInput = (e) => {

    const { name, value } = e.target;
    setData({...data, [name]: value, err: '', success: ''})
}

const handleSubmit = async (e) => {
    e.preventDefault();
    const invalid =  !validPassword(password) || !isMatch(password, cf_password) 
    if(invalid) {
        setValid(false)
        return setData({...data, err: 'Invalid Password' })
       
    }

    setValid(true)


 try {
            const res = await axios.post('/user/reset', { password},
                { headers: { Authorization: token }
            })
            console.log(res)
            return setData({...data, err:'', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }

}

    return (
    <Container>
            {showError(err)}
            {showSuccess(success)}
    <Input valid type="password" onChange={handleChangeInput} placeholder="Enter Password"  value={password} name="password" />
   
        <Input valid type="password" onChange={handleChangeInput} placeholder="Confirm Password"  value={cf_password} name="cf_password" />
    
        <Button onClick={handleSubmit}>Reset Password</Button>
    </Container>
    )
}


const Container = styled.div`
display: flex;
flex-direction: column;
text-align: center;
margin: 0 50px;
justify-content: space-between;
align-items: center;

`
const Input = styled.input`
width: 100%;
height: 45px;
margin: 10px 0;
outline: none;
padding: 0 10px;
border: ${({valid}) => !valid ? ' .5px solid orange' : '  .5px solid blue'};

:hover {
    padding: 13 0;
    border: red.5px solid ;
}
`;

const Button = styled.button`
width: 150px;
padding: 10px 0;
color: white;
background: black;
text-transform: uppercase;
letter-spacing: 1.5px;
margin-right: 10px;

`;

export default ResetPassword
