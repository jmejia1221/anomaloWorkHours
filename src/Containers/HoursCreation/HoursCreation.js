import React, { PureComponent } from 'react';

// External libs
import {faVoteYea} from "@fortawesome/free-solid-svg-icons";

// Components
import Panels from '../../Components/UI/Panels/Panels';
import LeftPanel from '../../Components/UI/Panels/LeftPanel/LeftPanel';
import RightPanel from '../../Components/UI/Panels/RightPanel/RightPanel';
import WorkHistory from '../../Components/WorkHistory/WorkHistory';
import WeekBuilder from '../../Components/WeekBuilder/WeekBuilder';
import Modal from '../../Components/UI/Modal/Modal';
import AddTask from '../../Components/WeekBuilder/WeekControls/AddTask/AddTask';
import Button from '../../Components/UI/Button/Button';
import WeekList from '../../Components/WeekBuilder/WeekList/WeekList';
import NoItemSelected from '../../Components/NoItemSelected/NoItemSelected';
import Spinner from "../../Components/UI/Spinner";

// Redux
import * as actions from '../../store/actions';
import { connect } from 'react-redux';

// Constants
import * as constant from '../../Shared/constants';

class HoursCreation extends PureComponent {
    state = {
        showModal: false,
        selectedDay: '',
        task: '',
        taskDaySelected: '',
        dayHours: 0,
        hoursEditModal: false,
        weekDayHours: {},
        teamSelected: '',
        isEditTask: false,
        taskId: '',
        weekTasksByTeam: []
    }

    componentDidMount() {
        this.props.onFetchCurrentUser();
        this.props.onFetchWeekTasks(
            this.props.userId,
            constant.COMPUTED_TIME,
            constant.CURRENT_DAY
        );
        this.props.onFetchWeekHours(
            this.props.userId,
            constant.COMPUTED_TIME
        );
        this.setState({
            selectedDay: constant.CURRENT_DAY
        });
        this.props.onFetchTeams();
    }

    // Open task Modal
    openTaskModal = () => {
        this.setState({showModal: true});
    }

    closeTaskModal = () => {
        this.setState({
            showModal: false,
            taskDaySelected: '',
            task: '',
            isEditTask: false
        });
    }

    // Create task in modal
    selectDayHandler = (day) => {
        this.setState({
            taskDaySelected: constant.WEEKDAY_VALUE[day]
        });
    }

    taskHandler = (event) => {
        let taskValue = event.target.value;

        this.setState({
            task: taskValue 
        });
    }

    bundleTaskData = (callback) => {
        const ticket = this.state.task.match(/\(([^)]+)\)/) ?
            this.state.task.match(/\(([^)]+)\)/)[1].trim() :
            '';
        const status = this.state.task.match(/\[(.*?)\]/) ?
            this.state.task.match(/\[(.*?)\]/)[1].trim() :
            '';
        const description = this.state.task.match(/([^(]*)/g)[0].trim();

        const time = {
            currentDate: constant.COMPUTED_TIME,
            currentDay: this.state.selectedDay || constant.CURRENT_DAY
        }

        const taskData = {
            description: description,
            ticket: ticket ? ticket : 'NO-TICKET',
            status: status ? status : 'Open',
            userId: this.props.userId,
            week: constant.COMPUTED_TIME,
            weekDay: this.state.taskDaySelected,
            team: this.state.teamSelected
        };

        callback(taskData, time);
    }
    createTaskHandler = () => {
        this.bundleTaskData((taskData, time) => {
            this.props.onCreateTask(taskData, time);
        })
        this.closeTaskModal();
    }

    updateTaskHandler = () => {
        this.bundleTaskData((taskData, time) => {
            this.props.onUpdateTask(taskData, this.state.taskId, time)
        })
        this.closeTaskModal();
    }

    // Tasks actions
    removeTaskHandler = (taskId) => {
        const time = {
            currentDate: constant.COMPUTED_TIME,
            currentDay: this.state.selectedDay || constant.CURRENT_DAY
        }
        this.props.onDeleteTask(this.props.userId, taskId, time);
    }

    editTaskModalHandler = (task) => {
        const taskString = `${task.description} (${task.ticket}) [${task.status}]`;
        this.setState({
            showModal: true,
            isEditTask: true,
            task: taskString,
            taskId: task.taskId,
            taskDaySelected: task.weekDay
        });
    }

    requestWeekDay = (day) => {
        this.setState({
            selectedDay: constant.WEEKDAY_VALUE[day]
        });
        this.props.onFetchWeekTasks(
            this.props.userId,
            constant.COMPUTED_TIME,
            constant.WEEKDAY_VALUE[day]
        );
    }

    addDayHourHandler = () => {
        const weekHoursData = {
            dayHours: this.state.dayHours,
            userId: this.props.userId,
            id: new Date().getTime(),
            week: constant.COMPUTED_TIME,
            weekDay: this.state.selectedDay,
            teamId: this.state.teamSelected
        };

        this.props.onCreateWeekHours(weekHoursData);
        this.props.onFetchWeekHours(
            this.props.userId,
            constant.COMPUTED_TIME,
            constant.CURRENT_DAY
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
            constant.COMPUTED_TIME,
            constant.CURRENT_DAY
        );
        this.toggleHoursEditModal(null);
    }

    dayHoursHandler = (event) => {
        this.setState({
            dayHours: event.target.value
        });
    }

    toggleHoursEditModal = (day) => {
        this.setState(prevState => ({
            hoursEditModal: !prevState.hoursEditModal,
            dayHours: day !== null ? day.dayHours : 0,
            weekDayHours: day !== null ? {
                dayHours: day.dayHours,
                hoursId: day.hoursId,
                userId: day.userId
            } : {}
        }));
    }

    // Teams actions
    selectTeamHandler = (id) => {
        const weekTasks = [...this.props.weekTasks];
        const filterWeekTasksByTeam = weekTasks.filter(weekTask => {
            return weekTask.team === id
        });
        this.setState({
            teamSelected: id,
            weekTasksByTeam: filterWeekTasksByTeam
        });
    }

    render() {
        let currentUserName = null;
        let teams = <Spinner />;
        let renderWeekBuilder = null;

        if (this.props.user) {
            currentUserName = this.props.user.displayName;
        }

        if (this.props.teams.length) {
            let teamsBelong = this.props.teams.filter(team => {
                let usersId = team.users.map(user => user.userId);
                return usersId.includes(this.props.userId)
            });
            teams = (
                <div
                    className="TeamList">
                    {teamsBelong.map(team => (
                        <button
                            onClick={() => this.selectTeamHandler(team.id)}
                            className={`${this.state.teamSelected === team.id ? 'active' : ''} TeamListItem`}
                            key={team.id}>
                            {team.team}
                        </button>
                    ))}
                </div>
            );
            renderWeekBuilder = (
                <NoItemSelected
                    icon={faVoteYea}
                    text="You need to select a team to build your work hours" />
            );
        }

        if (this.state.teamSelected) {
            renderWeekBuilder = (
                <WeekBuilder
                    hoursListEditable
                    toggleHoursEditModal={this.toggleHoursEditModal}
                    weekHoursList={this.props.weekHoursList}
                    addDayHourHandler={this.addDayHourHandler}
                    dayHoursHandler={this.dayHoursHandler}
                    dayHours={this.state.dayHours}
                    selectedDay={this.state.selectedDay}
                    weekDayHandler={this.requestWeekDay}
                    addTask={this.openTaskModal}
                    name={currentUserName}
                    weekControls
                    weekHours>
                    <WeekList
                        openTaskModal={this.editTaskModalHandler}
                        removeTaskHandler={this.removeTaskHandler}
                        taskDetails={this.state.weekTasksByTeam}
                        actions />
                </WeekBuilder>
            );
        }

        return(
            <>
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
                        { teams }
                        { renderWeekBuilder }
                    </RightPanel>
                </Panels>
                <Modal
                    show={this.state.showModal}
                    closeModal={this.closeTaskModal}>
                    <AddTask
                        isEditTask={this.state.isEditTask}
                        taskValue={this.state.task}
                        taskDaySelected={this.state.taskDaySelected}
                        weekDayHandler={this.selectDayHandler}
                        taskHandler={this.taskHandler}
                        createTask={this.createTaskHandler}
                        editTask={this.updateTaskHandler} />
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
            </>
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
        onFetchWeekHours: (userId, currentDate) => dispatch(actions.getWeekHours(userId, currentDate)),
        onUpdateWeekHours: (weekHoursData, hoursId) => dispatch(actions.updateWeekHours(weekHoursData, hoursId)),
        onFetchTeams: (userId) => dispatch(actions.fetchTeams(userId)),
        onUpdateTask: (taskData, taskId, time) => dispatch(actions.updateTask(taskData, taskId, time))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HoursCreation);