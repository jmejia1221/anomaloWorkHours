import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Panels from '../../Components/UI/Panels/Panels';
import LeftPanel from '../../Components/UI/Panels/LeftPanel/LeftPanel';
import RightPanel from '../../Components/UI/Panels/RightPanel/RightPanel';
import WeekBuilder from '../../Components/WeekBuilder/WeekBuilder';
import Users from '../../Components/Users/Users';

import * as actions from '../../store/actions';

class UsersFeed extends Component {
    componentDidMount() {
        const teamParams = this.props.match.params;
        if (teamParams.id === 'undefined') {
            this.props.history.push('/teams');
        } else {
            this.props.onFetchTeamDetails(teamParams.id);
        }
    }
    render() {
        let weekListUser = null;
        let renderUsers = null;
        if (!this.props.loading && this.props.teamDetails.length) {
            const userList = this.props.teamDetails[0];

            if (userList !== undefined && userList.users !== undefined) {
                renderUsers = <Users users={userList.users} />;
                weekListUser = userList.users.map(user => {
                    return (
                        <WeekBuilder
                            updateUserId={user.userId}
                            key={user.userId}
                            name={user.name}
                            hoursListed />
                    );
                });
            }
        }
        return(
            <Aux>
                <Panels>
                    <LeftPanel
                        title="Anomalo List"
                        type="history">
                        {renderUsers}
                    </LeftPanel>
                    <RightPanel
                        showFullScreenButton
                        title="Anomalos' Work Hours">
                        {weekListUser}
                    </RightPanel>
                </Panels>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        teams: state.teamCreation.teams,
        loading: state.teamCreation.loading,
        teamDetails: state.teamCreation.teamDetails,
        tasksDetail: state.hoursCreation.taskDataDetail
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchTeamDetails: (teamId) => dispatch(actions.fetchTeamDetails(teamId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersFeed);