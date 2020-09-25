import React, { Component } from 'react';

import Panels from '../../Components/UI/Panels/Panels';
import RightPanel from '../../Components/UI/Panels/RightPanel/RightPanel';
import LoginContainer from '../../Components/LoginContainer/LoginContainer';
import Login from '../../Components/LoginContainer/Login/Login';
import SignUp from '../../Components/LoginContainer/SignUp/SignUp';

class LoginPage extends Component {
    state = {
        toggleLogin: false
    }

    toggleLogin = () => {
        this.setState(prevState => {
            return {toggleLogin: !prevState.toggleLogin};
        })
    }

    render() {
        return(
            <>
                <Panels>
                    <RightPanel>
                        <LoginContainer>
                            { !this.state.toggleLogin && (
                                <Login signUpClicked={this.toggleLogin} />
                            )}

                            { this.state.toggleLogin && (
                                <SignUp loginClicked={this.toggleLogin} />
                            )}
                        </LoginContainer>
                    </RightPanel>
                </Panels>
            </>
        )
    }
}

export default LoginPage;