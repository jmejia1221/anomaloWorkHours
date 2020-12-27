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
        usersSelected: [],
        teamDetails: [],
        isUpdateTeam: false
    }

    componentDidMount() {
        this.props.onFetchTeams(this.props.userId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.teamDetails !== prevProps.teamDetails) {
            if (this.props.teamDetails.length) {
                this.setState({
                    teamName: this.props.teamDetails[0].team
                });
            }
        }
    }

    openNewTeamModal = () => {
        this.setState({
            showModal: true,
            isUpdateTeam: false
        });
    }

    closeNewTeamModal = () => {
        this.setState({showModal: false});
        this.props.onRemoveUsers();
        this.setState({
            usersSelected: []
        });
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
        };
        this.props.onCreateTeam(teamData);
        this.closeNewTeamModal();
    }

    updateTeamHandler = () => {
        let teamData = {
            team: this.state.teamName,
            users: this.state.usersSelected,
            userId: this.props.userId,
            id: this.props.teamDetails[0].id
        };
        this.props.onUpdateTeam(teamData);
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

    openUpdateModal = (teamId) => {
        this.props.onFetchTeamDetails(teamId);
        this.openNewTeamModal();
        this.setState({
            isUpdateTeam: true
        });
    }

    removeTeamHandler = (teamId) => {
        this.props.onRemoveTeam(this.props.userId, teamId);
    }

    render() {
        return (
            <>
                <Panels>
                    <RightPanel
                        title="My Teams">
                        <TeamBuilder
                            removeTeam={this.removeTeamHandler}
                            openUpdateModal={this.openUpdateModal}
                            teams={this.props.teams}
                            addNewTeam={this.openNewTeamModal} />
                    </RightPanel>
                </Panels>
                <Modal
                    show={this.state.showModal}
                    closeModal={this.closeNewTeamModal}>
                    <CreateTeam
                        defaultTeamName={this.state.teamName}
                        updateTeam={this.updateTeamHandler}
                        isUpdateTeam={this.state.isUpdateTeam}
                        teamDetails={this.props.teamDetails}
                        usersSelected={this.state.usersSelected}
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
        teams: state.teamCreation.teams,
        teamDetails: state.teamCreation.teamDetails
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateTeam: (teamData) => dispatch(actions.createTeam(teamData)),
        onFetchUsers: (token, textValue) => dispatch(actions.fetchUsers(token, textValue)),
        onRemoveUsers: () => dispatch(actions.removeUsers()),
        onFetchTeams: (userId) => dispatch(actions.fetchTeams(userId)),
        onFetchTeamDetails: (teamId) => dispatch(actions.fetchTeamDetails(teamId)),
        onUpdateTeam: (teamData) => dispatch(actions.updateTeam(teamData)),
        onRemoveTeam: (userId, teamId) => dispatch(actions.removeTeam(userId, teamId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamCreation);