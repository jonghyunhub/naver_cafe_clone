import React from 'react';
import {Header, LoginForm ,Footer} from 'components';
import './Login.css';

const Login = (props)=>{
    return(
        <div className="login">
            <Header/>
            <LoginForm/>
            <Footer/>
        </div>
    )
}

export default Login;