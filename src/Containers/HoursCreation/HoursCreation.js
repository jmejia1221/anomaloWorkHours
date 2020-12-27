import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Panels from '../../Components/UI/Panels/Panels';
import LeftPanel from '../../Components/UI/Panels/LeftPanel/LeftPanel';
import RightPanel from '../../Components/UI/Panels/RightPanel/RightPanel';
import WorkHistory from '../../Components/WorkHistory/WorkHistory';
import WeekBuilder from '../../Components/WeekBuilder/WeekBuilder';
import Modal from '../../Components/UI/Modal/Modal';
import AddTask from '../../Components/WeekBuilder/WeekControls/AddTask/AddTask';
import Button from '../../Components/UI/Button/Button';

import * as actions from '../../store/actions';

class HoursCreation extends PureComponent {
    state = {
        showModal: false,
        currentDate: Math.ceil((new Date().getTime()  / (1000 * 60 * 60 * 24))),
        currentDay: new Date().getDay(),
        weekDayValue: {
            'SU': 0,
            'M': 1,
            'TU': 2,
            'W': 3,
            'TH': 4,
            'F': 5,
            'SA': 6
        },
        selectedDay: '',
        task: '',
        taskDaySelected: '',
        dayHours: 0,
        hoursEditModal: false,
        weekDayHours: {},
        teamSelected: ''
    }

    componentDidMount() {
        this.props.onFetchCurrentUser();
        this.props.onFetchWeekTasks(
            this.props.userId,
            this.state.currentDate,
            this.state.currentDay
        );
        this.props.onFetchWeekHours(
            this.props.userId,
            this.state.currentDate,
            this.state.currentDay
        );
        this.setState({
            selectedDay: this.state.currentDay
        });
        this.props.onFetchTeams(this.props.userId);
    }

    // Task Modal
    addTaskHandler = () => {
        this.setState({showModal: true});
    }

    closeTaskHandler = () => {
        this.setState({showModal: false});
        this.setState({
            taskDaySelected: ''
        });
    }

    // Create task in modal
    selectDayHandler = (day) => {
        this.setState({
            taskDaySelected: this.state.weekDayValue[day]
        });
    }

    taskHandler = (event) => {
        let taskValue = event.target.value;

        this.setState({
            task: taskValue 
        });
    }

    createTaskHandler = () => {
        let ticket = this.state.task.match(/\(([^)]+)\)/) ?
            this.state.task.match(/\(([^)]+)\)/)[1].trim() :
            '';
        let status = this.state.task.match(/\[(.*?)\]/) ?
            this.state.task.match(/\[(.*?)\]/)[1].trim() :
            '';
        let description = this.state.task.match(/([^(]*)/g)[0].trim();

        const time = {
            currentDate: this.state.currentDate,
            currentDay: this.state.selectedDay || this.state.currentDay
        }

        const taskData = {
            description: description,
            ticket: ticket,
            status: status,
            id: new Date().getTime(),
            userId: this.props.userId,
            week: this.state.currentDate - this.state.taskDaySelected,
            weekDay: this.state.taskDaySelected,
            team: this.state.teamSelected
        };
        this.props.onCreateTask(taskData, time);
        this.closeTaskHandler();
    }

    // Tasks actions
    removeTaskHandler = (taskId) => {
        const time = {
            currentDate: this.state.currentDate,
            currentDay: this.state.selectedDay || this.state.currentDay
        }
        this.props.onDeleteTask(this.props.userId, taskId, time);
    }

    requestWeekDay = (day) => {
        this.setState({
            selectedDay: this.state.weekDayValue[day]
        });
        this.props.onFetchWeekTasks(
            this.props.userId,
            this.state.currentDate,
            this.state.weekDayValue[day]
        );
    }

    addDayHourHandler = () => {
        const weekHoursData = {
            dayHours: this.state.dayHours,
            userId: this.props.userId,
            id: new Date().getTime(),
            week: this.state.currentDate - this.state.currentDay,
            weekDay: this.state.selectedDay,
            teamId: this.state.teamSelected
        };

        this.props.onCreateWeekHours(weekHoursData);
        this.props.onFetchWeekHours(
            this.props.userId,
            this.state.currentDate,
            this.state.currentDay
        );
    }

    updateDayHourHandler = () => {
        const weekHoursData = {
            dayHours: this.state.dayHours,
            userId: this.state.weekDayHours.userId
        };

        const hoursId = this.state.weekDayHours.hoursId;

        this.props.onUpdateWeekHours(weekHoursData, hoursId);
        this.props.onFetchWeekHours(
            this.props.userId,
            this.state.currentDate,
            this.state.currentDay
        );
        this.toggleHoursEditModal(null);
    }

    dayHoursHandler = (event) => {
        this.setState({
            dayHours: event.target.value
        });
    }

    toggleHoursEditModal = (day) => {
        this.setState({
            dayHours: day !== null ? day.dayHours : 0,
            weekDayHours: day !== null ? {
                dayHours: day.dayHours,
                hoursId: day.hoursId,
                userId: day.userId
            } : {}
        });
        this.setState(prevState => ({
            hoursEditModal: !prevState.hoursEditModal
        }));
    }

    // Teams actions
    selectTeamHandler = (id) => {
        this.setState({
            teamSelected: id
        });
    }

    render() {
        let currentUserName = null;
        let teams = null;

        if (this.props.user) {
            currentUserName = this.props.user.displayName;
        }

        if (this.props.teams) {
            teams = (
                <div className="TeamList">
                    {this.props.teams.map(team => (
                        <div
                            onClick={() => this.selectTeamHandler(team.id)}
                            className={`${this.state.teamSelected === team.id ? 'active' : ''} TeamListItem`}
                            key={team.id}>
                            {team.team}
                        </div>
                    ))}
                </div>
            );
        }

        return(
            <Aux>
                <Panels>
                    <LeftPanel
                        hidePanel={this.props.hidePanel}
                        title="Work History"
                        type="history">
                        <WorkHistory />
                    </LeftPanel>
                    <RightPanel
                        title="My Hours"
                        showFullScreenButton
                        hidePanel={this.props.hidePanel}
                        togglePanel={this.props.togglePanel}>
                        {/* Make a component for this */}
                        {teams}
                        <WeekBuilder
                            hoursListEditable={true}
                            toggleHoursEditModal={this.toggleHoursEditModal}
                            weekHoursList={this.props.weekHoursList}
                            addDayHourHandler={this.addDayHourHandler}
                            dayHoursHandler={this.dayHoursHandler}
                            dayHours={this.state.dayHours}
                            removeTaskHandler={this.removeTaskHandler}
                            selectedDay={this.state.selectedDay}
                            weekDayHandler={this.requestWeekDay}
                            taskDetails={this.props.weekTasks}
                            addTask={this.addTaskHandler}
                            name={currentUserName}
                            weekControls
                            weekHours
                            actions />
                    </RightPanel>
                </Panels>
                <Modal
                    show={this.state.showModal}
                    closeModal={this.closeTaskHandler}>
                    <AddTask
                        taskDaySelected={this.state.taskDaySelected}
                        weekDayHandler={this.selectDayHandler}
                        taskHandler={this.taskHandler}
                        createTask={this.createTaskHandler} />

                </Modal>
                <Modal
                    closeModal={this.toggleHoursEditModal}
                    show={this.state.hoursEditModal}>
                    {/* TODO: make a component for this also for the one in WeekBuilder */}
                    <div className="WeekHoursControl">
                        <h1 style={{width: '100%', margin: '10px 10px 30px'}} className="TaskTitle">Update hour time</h1>
                        <span className="controlHourTitle">Working Time</span>
                        <div className="controlHour">
                            <div className="controlHourInput">
                                <input
                                    onChange={this.dayHoursHandler}
                                    defaultValue={this.state.dayHours}
                                    type="number"
                                    placeholder="Add Time" />
                            </div>
                            <Button
                                clicked={this.updateDayHourHandler}
                                type="primary">
                                Update
                            </Button>
                        </div>
                    </div>
                </Modal>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        weekTasks: state.hoursCreation.weekTasks,
        userId: state.auth.userId,
        user: state.auth.currentUser,
        weekHoursList: state.hoursCreation.weekHoursList,
        teams: state.teamCreation.teams
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateTask: (taskData, time) => dispatch(actions.createTask(taskData, time)),
        onFetchCurrentUser: () => dispatch(actions.fetchCurrentUser()),
        onFetchWeekTasks: (userId, currentDate, currentDay) => dispatch(actions.fetchWeekTasks(userId, currentDate, currentDay)),
        onDeleteTask: (userId, taskId, time) => dispatch(actions.deleteTask(userId, taskId, time)),
        onCreateWeekHours: (weekData) => dispatch(actions.createWeekHours(weekData)),
        onFetchWeekHours: (userId, currentDate, currentDay) => dispatch(actions.getWeekHours(userId, currentDate, currentDay)),
        onUpdateWeekHours: (weekHoursData, hoursId) => dispatch(actions.updateWeekHours(weekHoursData, hoursId)),
        onFetchTeams: (userId) => dispatch(actions.fetchTeams(userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HoursCreation);