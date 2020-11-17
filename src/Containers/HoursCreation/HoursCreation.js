import React, { Component } from 'react';
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

class HoursCreation extends Component {
    state = {
        showModal: false,
        currentDate: Math.ceil((new Date().getTime()  / (1000 * 60 * 60 * 24))),
        currentDay: new Date().getDay(),
        selectedDay: ''
    }

    componentDidMount() {
        // this.props.onFetchTask(this.props.userId);
        this.props.onFetchCurrentUser();
        this.props.onFetchWeekTasks(
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

    cancelTaskHandler = () => {
        this.setState({showModal: false});
    }

    createTaskHandler = () => {
        const taskData = {
            description: 'This is my second task',
            ticket: 'OP-20115',
            status: 'in-progress',
            id: new Date().getTime(),
            userId: this.props.userId,
            week: this.state.currentDate - this.state.currentDay,
            weekDay: this.state.currentDay,
            hours: 7
        };
        this.props.onCreateTask(taskData);
    }

    requestWeekDay = (week, weekDay) => {
        const weekDayValue = {
            'SU': 0,
            'M': 1,
            'TU': 2,
            'W': 3,
            'TH': 4,
            'F': 5,
            'SA': 6
        };
        this.setState({
            selectedDay: weekDayValue[week]
        });
        this.props.onFetchWeekTasks(
            this.props.userId,
            this.state.currentDate,
            weekDayValue[week]
        );
    }

    // taskHandler = (event) => {
    //     let taskValue = event.target.value;
    // }

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
                    closeModal={this.cancelTaskHandler}>
                    <AddTask
                        taskHandler={this.taskHandler}
                        createTask={this.createTaskHandler} />
                </Modal>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        // tasks: state.hoursCreation.taskData,
        weekTasks: state.hoursCreation.weekTasks,
        userId: state.auth.userId,
        user: state.auth.currentUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateTask: (taskData) => dispatch(actions.createTask(taskData)),
        // onFetchTask: (userId) => dispatch(actions.fetchTask(userId)),
        onFetchCurrentUser: () => dispatch(actions.fetchCurrentUser()),
        onFetchWeekTasks: (userId, currentDate, currentDay) => dispatch(actions.fetchWeekTasks(userId, currentDate, currentDay))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HoursCreation);