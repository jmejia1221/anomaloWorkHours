import { faArrowCircleRight, faEnvelope, faKey, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import Button from '../../UI/Button/Button';

import './SignUp.css';

const SignUp = (props) => {
    return (
        <div className="SignUpBox">
            <h1 className="LoginTitle">
                Sign Up
            </h1>
            <div className="LoginInputContent">
                <FontAwesomeIcon
                    className='LoginIcon'
                    icon={faUserAlt} />
                <input
                    className="LoginInput"
                    placeholder="Name" />
            </div>
            <div className="LoginInputContent">
                <FontAwesomeIcon
                    className='LoginIcon'
                    icon={faEnvelope} />
                <input
                    className="LoginInput"
                    placeholder="Email" />
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
                Sign Up
                <FontAwesomeIcon
                    className="LoginIconGo"
                    icon={faArrowCircleRight} />
            </Button>
            <div className="SignUpGoLogin">
                <span className="LoginText">
                    Already have an account ? 
                    <span onClick={props.loginClicked}>Login</span>
                </span>
            </div>
        </div>
    )
}

export default SignUp;