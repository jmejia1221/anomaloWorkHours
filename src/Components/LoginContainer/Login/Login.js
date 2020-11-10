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
                    name="email"
                    onChange={props.inputChange}
                    className="LoginInput"
                    placeholder="User" />
            </div>
            <div className="LoginInputContent">
                <FontAwesomeIcon
                    className='LoginIcon'
                    icon={faKey} />
                <input
                    name="password"
                    onChange={props.inputChange}
                    className="LoginInput"
                    type="password"
                    placeholder="Password" />
            </div>
            <Button
                clicked={props.loginHandler}
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