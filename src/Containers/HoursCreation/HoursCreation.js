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
        dayHours: 0
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
    }

    addTaskHandler = () => {
        this.setState({showModal: true});
    }

    closeTaskHandler = () => {
        this.setState({showModal: false});
        this.setState({
            taskDaySelected: ''
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

        const taskData = {
            description: description,
            ticket: ticket,
            status: status,
            id: new Date().getTime(),
            userId: this.props.userId,
            week: this.state.currentDate - this.state.taskDaySelected,
            weekDay: this.state.taskDaySelected
        };
        this.props.onCreateTask(taskData);
        this.closeTaskHandler();
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

    addDayHourHandler = () => {
        const weekHoursData = {
            dayHours: this.state.dayHours,
            userId: this.props.userId,
            id: new Date().getTime(),
            week: this.state.currentDate - this.state.currentDay,
            weekDay: this.state.selectedDay
        };

        this.props.onCreateWeekHours(weekHoursData);
        this.props.onFetchWeekHours(
            this.props.userId,
            this.state.currentDate,
            this.state.currentDay
        );

    }

    dayHoursHandler = (event) => {
        this.setState({
            dayHours: event.target.value
        });
    }

    removeTaskHandler = (taskId) => {
        let time = {
            currentDate: this.state.currentDate,
            currentDay: this.state.currentDay
        }
        this.props.onDeleteTask(this.props.userId, taskId, time);
    }

    render() {
        let currentUserName = null;

        if (this.props.user) {
            currentUserName = this.props.user.displayName;
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
                        <WeekBuilder
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
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        weekTasks: state.hoursCreation.weekTasks,
        userId: state.auth.userId,
        user: state.auth.currentUser,
        weekHoursList: state.hoursCreation.weekHoursList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateTask: (taskData) => dispatch(actions.createTask(taskData)),
        onFetchCurrentUser: () => dispatch(actions.fetchCurrentUser()),
        onFetchWeekTasks: (userId, currentDate, currentDay) => dispatch(actions.fetchWeekTasks(userId, currentDate, currentDay)),
        onDeleteTask: (userId, taskId, time) => dispatch(actions.deleteTask(userId, taskId, time)),
        onCreateWeekHours: (weekData) => dispatch(actions.createWeekHours(weekData)),
        onFetchWeekHours: (userId, currentDate, currentDay) => dispatch(actions.getWeekHours(userId, currentDate, currentDay))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HoursCreation);