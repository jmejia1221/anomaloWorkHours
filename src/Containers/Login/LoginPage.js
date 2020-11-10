import React, { Component } from 'react';
import { connect } from 'react-redux';

import Panels from '../../Components/UI/Panels/Panels';
import RightPanel from '../../Components/UI/Panels/RightPanel/RightPanel';
import LoginContainer from '../../Components/LoginContainer/LoginContainer';
import Login from '../../Components/LoginContainer/Login/Login';
import SignUp from '../../Components/LoginContainer/SignUp/SignUp';

import * as actions from '../../store/actions';

class LoginPage extends Component {
    state = {
        toggleLogin: false,
        username: '',
        password: '',
        email: ''
    }

    toggleLogin = () => {
        this.setState(prevState => {
            return {toggleLogin: !prevState.toggleLogin};
        })
    }

    inputChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loginHandler = (e) => {
        this.props.onAuth(this.state.email, this.state.password);
    }

    signInHandler = (e) => {
        this.props.onAuthSignIn(
            this.state.email,
            this.state.password,
            this.state.username
        );
    }

    render() {
        return(
            <>
                <Panels>
                    <RightPanel>
                        <LoginContainer>
                            { !this.state.toggleLogin && (
                                <Login
                                    inputChange={this.inputChangeHandler}
                                    loginHandler={this.loginHandler}
                                    signUpClicked={this.toggleLogin} />
                            )}

                            { this.state.toggleLogin && (
                                <SignUp
                                    inputChange={this.inputChangeHandler}
                                    signInHandler={this.signInHandler}
                                    loginClicked={this.toggleLogin} />
                            )}
                        </LoginContainer>
                    </RightPanel>
                </Panels>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        onAuthSignIn: (email, password, userName) => dispatch(actions.authSignIn(email, password, userName))
    };
};

export default connect(null, mapDispatchToProps)(LoginPage);