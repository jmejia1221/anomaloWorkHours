import React from 'react';
import { faArrowCircleRight, faKey, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../UI/Button/Button';

import './Login.css';

const Login = (props) => {
    return (
        <div className="LoginBox">
            <h1 className="LoginTitle">
                Anomalos
            </h1>
            <div className="LoginInputContent">
                <FontAwesomeIcon
                    className='LoginIcon'
                    icon={faUserAlt} />
                <input
                    className="LoginInput"
                    placeholder="User" />
            </div>
            <div className="LoginInputContent">
                <FontAwesomeIcon
                    className='LoginIcon'
                    icon={faKey} />
                <input
                    className="LoginInput"
                    type="password"
                    placeholder="Password" />
            </div>
            <Button
                class="LoginButton"
                type="primary">
                Login
                <FontAwesomeIcon
                    className="LoginIconGo"
                    icon={faArrowCircleRight} />
            </Button>
            <div className="LoginCreateAccount">
                <span className="SignUpText">
                    Don't have an account ? 
                    <span onClick={props.signUpClicked}>Sign Up</span>
                </span>
            </div>
        </div>
    )
}

export default Login;