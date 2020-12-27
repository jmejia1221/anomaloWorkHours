import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Panels from '../../Components/UI/Panels/Panels';
import LeftPanel from '../../Components/UI/Panels/LeftPanel/LeftPanel';
import RightPanel from '../../Components/UI/Panels/RightPanel/RightPanel';
import WeekBuilder from '../../Components/WeekBuilder/WeekBuilder';
import Users from '../../Components/Users/Users';

import * as actions from '../../store/actions';

class UsersFeed extends PureComponent {
    state = {
        showModal: false,
        currentDate: Math.ceil((new Date().getTime()  / (1000 * 60 * 60 * 24))),
        currentDay: new Date().getDay()
    }

    componentDidMount() {
        const teamParams = this.props.match.params;
        if (teamParams.id === 'undefined') {
            this.props.history.push('/teams');
        } else {
            this.props.onFetchTeamDetails(teamParams.id);
            this.props.onFetchWeekHours(
                this.props.userId,
                this.state.currentDate,
                this.state.currentDay
            );
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.teamUsers !== prevProps.teamUsers) {
            this.fetchTaskDetails();
        }
    }

    fetchTaskDetails = () => {
        if (this.props.teamUsers.length) {
            this.props.teamUsers.forEach(user => {
                this.props.onFetchTaskDetails(
                    user.userId,
                    this.state.currentDate,
                    this.state.currentDay,
                    this.props.match.params.id);
            });
        }
    }

    render() {
        let weekListUser = null;
        let renderUsers = null;
        let weekHourList = [];
        if (!this.props.loading && this.props.teamUsers.length && this.props.taskDetails) {
            const userList = this.props.teamUsers;
            if (userList !== undefined) {
                renderUsers = <Users users={userList} />;
                weekListUser = userList.map(user => {
                    weekHourList = this.props.weekHoursList.filter(hour => {
                        return hour.userId === user.userId;
                    });
                    return (
                        <WeekBuilder
                            hoursListEditable={false}
                            weekHoursList={weekHourList}
                            isTaskDetails
                            taskDetails={this.props.taskDetails[user.userId]}
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
        userId: state.auth.userId,
        teams: state.teamCreation.teams,
        loading: state.teamCreation.loading,
        teamDetails: state.teamCreation.teamDetails,
        teamUsers: state.teamCreation.teamUsers,
        taskDetails: state.hoursCreation.taskDataDetail,
        weekHoursList: state.hoursCreation.weekHoursList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchTeamDetails: (teamId) => dispatch(actions.fetchTeamDetails(teamId)),
        onFetchTaskDetails: (userId, week, weekDay, teamId) => dispatch(actions.fetchTaskDetail(userId, week, weekDay, teamId)),
        onFetchWeekHours: (userId, currentDate, currentDay) => dispatch(actions.getWeekHours(userId, currentDate, currentDay)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersFeed);