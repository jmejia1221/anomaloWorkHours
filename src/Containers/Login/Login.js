import { faArrowCircleRight, faKey, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import Button from '../../Components/UI/Button/Button';
import Panels from '../../Components/UI/Panels/Panels';
import RightPanel from '../../Components/UI/Panels/RightPanel/RightPanel';

import './Login.css';

class Login extends Component {
    render() {
        return(
            <>
                <Panels>
                    <RightPanel>
                        <div className="LoginContainer">
                            <div className="LoginBox">
                                <h1 className="LoginTitle">
                                    Anomalos
                                </h1>
                                <div className="LoginInputContent">
                                    <FontAwesomeIcon
                                        className='LoginIcon'
                                        icon={faUserAlt} />
                                    <input placeholder="User" />
                                </div>
                                <div className="LoginInputContent">
                                    <FontAwesomeIcon
                                        className='LoginIcon'
                                        icon={faKey} />
                                    <input placeholder="Password" />
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
                                        <a>Sign Up</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </RightPanel>
                </Panels>
            </>
        )
    }
}

export default Login;