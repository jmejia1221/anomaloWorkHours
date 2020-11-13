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
        showModal: false
    }

    componentDidMount() {
        this.props.onFetchTask(this.props.userId);
    }

    addTaskHandler = () => {
        this.setState({showModal: true});
    }

    cancelTaskHandler = () => {
        this.setState({showModal: false});
    }

    createTaskHandler = () => {
        const taskData = {
            description: 'This is my first task',
            ticket: 'OP-20100',
            status: 'in-progress',
            id: new Date().getTime(),
            userId: this.props.userId
        };
        this.props.onCreateTask(taskData);
    }

    // taskHandler = (event) => {
    //     let taskValue = event.target.value;
    // }

    render() {
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
                            taskDetails={this.props.tasks}
                            addTask={this.addTaskHandler}
                            name="John Mejia"
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
        tasks: state.hoursCreation.taskData,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateTask: (taskData) => dispatch(actions.createTask(taskData)),
        onFetchTask: (userId) => dispatch(actions.fetchTask(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HoursCreation);