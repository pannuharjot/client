import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchGetUser, dispatchLogin, fetchUser } from './redux/actions/authAction'

import styled from 'styled-components'
import Header from './components/header/Header';
import Body from './components/body/Body';
import axios from 'axios';


function App() {


  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    
    if(firstLogin){
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null)
        dispatch({ type: 'GET_TOKEN', payload: res.data.access_token })
    }
    getToken()
  }
}, [auth.isLogged, dispatch])

useEffect(() => {
  
  if(token) {
    const getUser = () => {
      dispatch(dispatchLogin())

       return fetchUser(token).then(res => {
        dispatch(dispatchGetUser(res))
      })
    }
    getUser()
  }

}, [token])

  return (
    <Router>
        <Wrapper>
              <Header />
              <Body />
        </Wrapper>
    </Router>
  );
}

const Wrapper = styled.div`
max-width:1200px;
width: 100%;
min-height: 100vh;
box-shadow: 0 0 20px #eee;
margin: 0 auto;
overflow: hidden;
border: 2px solid red;
`

export default App;



const Container = styled.div``
