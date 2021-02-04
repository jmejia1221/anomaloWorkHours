import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Aux from '../../hoc/Aux/Aux';
import Weekcontrols from './WeekControls/WeekControls';
import WeekList from './WeekList/WeekList';
import WeekHours from './WeekControls/WeekHours/WeekHours';
import Button from '../UI/Button/Button';

import './WeekBuilder.css';

import * as actions from '../../store/actions';
class WeekBuilder extends PureComponent {
    state = {
        currentDate: Math.ceil((new Date().getTime()  / (1000 * 60 * 60 * 24))),
        weekDayValue: {
            'SU': 0,
            'M': 1,
            'TU': 2,
            'W': 3,
            'TH': 4,
            'F': 5,
            'SA': 6
        }
    }

    weekDayHourHandler = (params) => {
        if (this.props.weekHours) return;
        if (params !== undefined) {
            const {weekDay, userId} = params;
            // this.setState({
            //     selectedDay: this.state.weekDayValue[weekDay]
            // });
            this.props.onFetchTaskDetails(
                userId,
                this.state.currentDate,
                weekDay,
                this.props.match.params.id);
        }
    }

    render() {
        let selectedDayExist = null; 
        if (this.props.weekHoursList) {
            selectedDayExist = this.props.weekHoursList.some(week => (week.weekDay === this.props.selectedDay));
        }
        return (
            <Aux>
                <div className="WeekBuilderContent">
                    <h1 className="WeekBuilderName">
                        { this.props.name }
                    </h1>
                    { this.props.weekControls && (
                        <Weekcontrols
                            selectedDay={this.props.selectedDay}
                            weekDayHandler={this.props.weekDayHandler}
                            taskDetails={this.props.taskDetails}
                            showTaskButton
                            addTask={this.props.addTask} />
                    )}
                    <WeekList
                        removeTaskHandler={this.props.removeTaskHandler}
                        taskDetails={this.props.taskDetails}
                        actions={this.props.actions} />

                    { this.props.weekControls && !selectedDayExist && (
                        <div className="WeekHoursControl">
                            <span className="controlHourTitle">Working Time</span>
                            <div className="controlHour">
                                <div className="controlHourInput">
                                    <input
                                        onChange={this.props.dayHoursHandler}
                                        defaultValue={this.props.dayHours}
                                        type="number"
                                        placeholder="Add Time" />
                                </div>
                                <Button
                                    clicked={this.props.addDayHourHandler}
                                    type="primary">
                                    Add
                                </Button>
                            </div>
                        </div>
                    )}

                    { (this.props.weekHours || this.props.hoursListed) && 
                        <WeekHours
                            weekDayHourHandler={this.weekDayHourHandler}
                            isEditable={this.props.hoursListEditable}
                            toggleHoursEditModal={this.props.toggleHoursEditModal}
                            weekHoursList={this.props.weekHoursList} /> 
                    }

                    <span className="stitchings">
                        <span className="stitching"></span>
                        <span className="stitching"></span>
                        <span className="stitching"></span>
                    </span>
                </div>
            </Aux>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchTaskDetails: (userId, week, weekDay, teamId) => dispatch(actions.fetchTaskDetail(userId, week, weekDay, teamId)),
    };
};

export default connect(null, mapDispatchToProps)(withRouter(WeekBuilder));