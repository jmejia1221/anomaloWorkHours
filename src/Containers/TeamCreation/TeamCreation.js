import React, { Component } from 'react';
import TeamBuilder from '../../Components/TeamBuilder/TeamBuilder';
import { connect } from 'react-redux';

import Panels from '../../Components/UI/Panels/Panels';
import RightPanel from '../../Components/UI/Panels/RightPanel/RightPanel';
import Modal from '../../Components/UI/Modal/Modal';
import CreateTeam from '../../Components/TeamBuilder/CreateTeam/CreateTeam';

import * as actions from '../../store/actions';

class TeamCreation extends Component {
    state = {
        showModal: false,
        teamName: '',
        usersSelected: []
    }

    componentDidMount() {
        this.props.onFetchTeams(this.props.userId);
    }

    openNewTeamModal = () => {
        this.setState({showModal: true});
    }

    closeNewTeamModal = () => {
        this.setState({showModal: false});
        this.props.onRemoveUsers();
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    createTeamHandler = () => {
        let teamData = {
            team: this.state.teamName,
            users: this.state.usersSelected,
            userId: this.props.userId,
            id: new Date().getTime()
        };
        this.props.onCreateTeam(teamData, this.props.token);
        this.closeNewTeamModal();
    }

    showUsersHandler = () => {
        this.props.onFetchUsers(this.props.token);
    }

    addTeamUserHandler = (newUser) => {
        const hasUser = this.state.usersSelected.some(u => {
            return u.email === newUser.email;
        });
        if (hasUser) {
            this.state.usersSelected.forEach((u, i) => {
                if (u.email === newUser.email) {
                    this.setState({
                        users: this.state.usersSelected.splice(i, 1)
                    });
                }
            });
        } else {
            this.setState({
                users: this.state.usersSelected.push(newUser)
            });
        }
    }

    render() {
        return (
            <>
                <Panels>
                    <RightPanel
                        title="My Teams">
                        <TeamBuilder
                            teams={this.props.teams}
                            addNewTeam={this.openNewTeamModal} />
                    </RightPanel>
                </Panels>
                <Modal
                    show={this.state.showModal}
                    closeModal={this.closeNewTeamModal}>
                    <CreateTeam
                        addTeamUserHandler={this.addTeamUserHandler}
                        showUsersHandler={this.showUsersHandler}
                        users={this.props.users}
                        inputChanged={this.inputChangeHandler}
                        createTeam={this.createTeamHandler} />
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        users: state.users.users,
        teams: state.teamCreation.teams
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateTeam: (teamData, token) => dispatch(actions.createTeam(teamData, token)),
        onFetchUsers: (token, textValue) => dispatch(actions.fetchUsers(token, textValue)),
        onRemoveUsers: () => dispatch(actions.removeUsers()),
        onFetchTeams: (userId) => dispatch(actions.fetchTeams(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamCreation);