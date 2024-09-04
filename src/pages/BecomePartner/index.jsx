import React from "react";
import { Helmet } from "react-helmet";
import CommonForm from "../../components/CommonForm/index.jsx";

const BecomePartner = () => {
    return (
       <>
        <Helmet>
                <title>Maalana-BecomePartner</title>
            </Helmet>
       <CommonForm
           title='Humko join karlo!'
       />
       </>
    );
};
export default BecomePartner;

