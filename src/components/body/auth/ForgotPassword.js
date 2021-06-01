import React, { useState }  from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { isEmail } from '../../utils/validations/Validation'
import { showError, showSuccess } from '../../utils/notification/Notification'



const initialState = {
    email: '',
    err: '',
    success: '',
    password: ''
 }

const ForgotPassword = () => {
    const [ data, setData ] = useState(initialState)

    const { email, err, success, password } = data;

    const handleChangeInput = (e) => {

        const { name, value } = e.target

        setData({...data, [name]: value, err: '', success: '' })

    }

    const forgotPassword = async () => {
        if(!isEmail(email)) {
            
            return setData({...data, err: 'Invalid Email', success: ''})
        }
        try {
          
            const res = await axios.post('/user/forgot', {email})

            console.log('this is the res', res)

           return setData({...data, err: '', success: res.data.msg})
        } catch (err) {
            console.log('err', err.response)
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <Container>
          <Header>Forgot Password</Header>

            <Row>
                {err && showError(err)}
                {success && showSuccess(success)}

                <Input type="email" onChange={handleChangeInput} id="email" placeholder="Enter you Email" name="email" value={email} />
                
                <Button onClick={forgotPassword}> Verify your email</Button>
            </Row>
        </Container>
    )
}


const Input = ({type, name, id, value, placeholder, onChange }) => {
    return (<InputProps type={type} name={name} id={id} onChange={onChange} value={value} placeholder={placeholder} />)
}

const Button = styled.button`
  background: #333;
    color: white;
    padding: 10px 30px;
    text-transform: uppercase;
    letter-spacing: 1.3px;
    border-radius: 3px;
    margin-top: 15px;
`



const Container = styled.div`
margin: 0 auto;

`
const Header = styled.h2`

color: #555;
    text-transform: uppercase;
    text-align: center;
    font-size: 2rem;
    margin: 50px 0;
    letter-spacing: 1.3px;
`

const Row = styled.div`
 max-width: 500px;
    margin: auto;
    padding: 0 10px;
`

const InputProps = styled.input`
    width: 100%;
    height: 45px;
    border: 1px solid #ccc;
    outline: none;
    padding: 0 15px;
    border-radius: 3px;
    margin: 5px 0;

:hover {
    padding: 13 0;
    border: .5px solid red;
}
`





export default ForgotPassword
