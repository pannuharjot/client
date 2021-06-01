import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { showError, showSuccess } from '../../utils/notification/Notification'

const ActivationEmail = () => {
   const { activation_token } = useParams();

   const [ err, setErr ] = useState('')
   const [ success, setSuccess ] = useState('')

   useEffect(() => {
       if(activation_token){
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/user/activation', { activation_token });
                    setSuccess(res.data.msg);
                } catch (err) {
                    err.response?.data.msg && setErr(err.response.data.msg)
                }
            }
            activationEmail()
       }
   }, [activation_token])
    return (
        <Container>
            {err && showError(err)}
            {success && showSuccess(success)}
        </Container>
    )
}

const Container = styled.div`

`

export default ActivationEmail
