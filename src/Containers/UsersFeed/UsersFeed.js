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
    state = {
        showModal: false,
        currentDate: Math.ceil((new Date().getTime()  / (1000 * 60 * 60 * 24))),
        currentDay: new Date().getDay(),
        weekList: {}
    }

    componentDidMount() {
        const teamParams = this.props.match.params;
        if (teamParams.id === 'undefined') {
            this.props.history.push('/teams');
        } else {
            this.props.onFetchTeamDetails(teamParams.id, this.state.currentDate, this.state.currentDay);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.teamUsers !== prevProps.teamUsers) {
            this.fetchTaskDetails();
        }

        if ((this.props.taskDetails !== prevProps.taskDetails) &&
            (this.state.weekList === prevState.weekList)) {
            this.setState(prevState => ({
                weekList: {
                    ...prevState.weekList,
                    ...this.props.taskDetails
                }
            }));
        }
    }

    fetchTaskDetails = (params) => {
        if (params !== undefined) {
            const {weekDay, userId} = params;
            // this.setState({
            //     selectedDay: this.state.weekDayValue[weekDay]
            // });
            if (this.props.teamUsers.length) {
                this.props.teamUsers.forEach(user => {
                    this.props.onFetchTaskDetails(
                        userId,
                        this.state.currentDate,
                        weekDay,
                        this.props.match.params.id);
                });
            }
            for (const list in this.state.weekList) {
                if (this.props.taskDetails[userId] === this.state.weekList[list]) {
                    this.setState(prevState => ({
                        weekList: {
                            ...prevState.weekList,
                            [list]: {...this.props.taskDetails[list]}
                        }
                    }))
                }
            }
        } else {
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
    }

    render() {
        let weekListUser = null;
        let renderUsers = null;
        const userList = [...this.props.teamUsers];
        if (!this.props.loading && userList.length) {
            if (userList !== undefined) {
                renderUsers = <Users users={userList} />;
            }
        }

        console.log('ByTeam', this.state.weekList);
        if (!this.props.loading && userList.length) {
            weekListUser = userList.map(user => {
                const weekList = this.props.weekTeamHourList.filter(hour => {
                    return hour.userId === user.userId;
                });
                return (
                    <WeekBuilder
                        weekDayHourHandler={this.fetchTaskDetails}
                        hoursListEditable={false}
                        weekHoursList={weekList}
                        isTaskDetails
                        taskDetails={this.state.weekList[user.userId]}
                        updateUserId={user.userId}
                        key={user.userId}
                        name={user.name}
                        hoursListed={true} />
                );
            });
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
        weekHoursList: state.hoursCreation.weekHoursList,
        weekTeamHourList: state.teamCreation.weekTeamHourList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchTeamDetails: (teamId, week, weekDay) => dispatch(actions.fetchTeamDetails(teamId, week, weekDay)),
        onFetchTaskDetails: (userId, week, weekDay, teamId) => dispatch(actions.fetchTaskDetail(userId, week, weekDay, teamId)),
        onFetchWeekHours: (userId, currentDate, currentDay, callback) => dispatch(actions.getWeekHours(userId, currentDate, currentDay, callback)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersFeed);