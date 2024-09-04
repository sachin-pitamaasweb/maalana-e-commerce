import React from 'react'
import { Helmet } from 'react-helmet';
import CommonForm from '../../components/CommonForm/index.jsx';


const Login = () => {
    return (
        <>
            <Helmet>
                <title>Maalana-Login</title>
            </Helmet>
            <CommonForm
                title='Login'
                isValue={true}
            />
        </>
    )
}

export default Login