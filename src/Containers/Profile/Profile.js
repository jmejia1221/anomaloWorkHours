import React, { Component } from 'react';
import { connect } from 'react-redux';

import Panels from '../../Components/UI/Panels/Panels';
import RightPanel from '../../Components/UI/Panels/RightPanel/RightPanel';
import ProfileBuilder from '../../Components/ProfileBuilder/ProfileBuilder';

import * as actions from '../../store/actions';

class Profile extends Component {
    componentDidMount() {
        this.props.onFetchCurrentUser();
    }

    render() {
        let userName = null;
        if (this.props.currentUser) {
            userName = this.props.currentUser.displayName;
            console.log(userName)
        }

        return (
            <Panels>
                <RightPanel
                    title="My Profile">
                    {this.props.userName}
                    <ProfileBuilder 
                        userName={userName} />
                </RightPanel>
            </Panels>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchCurrentUser: () => dispatch(actions.fetchCurrentUser())
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);