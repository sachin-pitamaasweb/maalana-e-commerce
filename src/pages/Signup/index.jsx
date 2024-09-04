import React from 'react';
import { Helmet } from 'react-helmet';
import CommonForm from '../../components/CommonForm/index.jsx';

const Signup = () => {
  return (
    <>
     <Helmet>
                <title>Maalana-Signup</title>
            </Helmet>
      <CommonForm
        title='Sign Up'
      />
    </>
  );
};

export default Signup;
