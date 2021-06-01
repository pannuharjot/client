import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom';
import styles from 'styled-components'
import Login from './auth/Login'
import Register from './auth/Register';
import ActivationEmail from './auth/ActivationEmail';
import { useSelector } from 'react-redux';
import NotFound from '../utils/NotFound/NotFound'
import ForgotPassword from '../body/auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword';
import Profile from './profile/Profile';
import EditUser from '../body/profile/EditUser'




function Body() {
    const auth = useSelector(state => state.auth);

    const { isLogged, isAdmin } = auth

    return (
        <Section>
            <Switch>
                <Route path="/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/register" component={isLogged ? NotFound : Register} exact />
                <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPassword} exact />
                <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPassword} exact />
                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />
                <Route path="/profile" component={!isLogged ? NotFound : Profile} exact />
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />
            </Switch>
        </Section>
    )
}


const Section = styles.section`
border: 2px solid blue;
height: 100vh;
`
export default Body
