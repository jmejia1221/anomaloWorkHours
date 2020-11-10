import React, { Component } from 'react';
import Button from '../../../UI/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions';

import './WeekItem.css'

class WeekItem extends Component  {
    componentDidMount() {
        this.props.onFetchTask(this.props.userId);
    }
    render() {
        console.log(this.props.tasks)
        let mapTasks = this.props.tasks.map(task => {
            return (
                <li key={task.id} className="WeekItem">
                    <span className="WeekDescription">{task.description}</span>
                    <span className="WeekTicket">
                        <span className="WeekItemTicket">
                            {task.ticket}
                        </span>
                    </span>
                    <span className="WeekStatus">
                        <Button type="status" status="approved">
                            {task.status}
                        </Button>
                    </span>
                    { this.props.actions && (
                        <span className="WeekCheck">
                            <span className="WeekItemAction">
                                <FontAwesomeIcon className='iconAction' icon={faEdit} />
                                <FontAwesomeIcon className='iconAction' icon={faTrash} />
                            </span>
                        </span>
                    ) }
                </li>
            )
            
        })
        // let mapTasks = null;
        return (
            <>
                {mapTasks}
            </>
        )
    }
};

const mapStateToProps = state => {
    return {
        tasks: state.hoursCreation.taskData,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchTask: (userId) => dispatch(actions.fetchTask(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekItem);