import React, { Component } from 'react';
import fire from '../../config/FireBase';

import Panels from '../../Components/UI/Panels/Panels';
import RightPanel from '../../Components/UI/Panels/RightPanel/RightPanel';
import LoginContainer from '../../Components/LoginContainer/LoginContainer';
import Login from '../../Components/LoginContainer/Login/Login';
import SignUp from '../../Components/LoginContainer/SignUp/SignUp';

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
        fire.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
            .then(u => {
                console.log('Successfully Logged in');
                this.props.history.push('/');
            })
            .catch(err => {
                console.log('Error: ', err.toString());
            });
    }

    signInHandler = (e) => {
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(u => {
                console.log('Successfully Signed up');
                fire.auth().currentUser.updateProfile({
                    displayName: this.state.username
                });
            })
            .catch(err => {
                console.log('Error: ', err.toString())
            })
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

export default LoginPage;