import React from 'react';

import './LoginContainer.css';

const LoginContainer = (props) => (
    <div className="LoginContainer">
        {props.children}
    </div>
);

export default LoginContainer;