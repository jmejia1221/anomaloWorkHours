import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Panels from '../../Components/UI/Panels/Panels';
import LeftPanel from '../../Components/UI/Panels/LeftPanel/LeftPanel';
import RightPanel from '../../Components/UI/Panels/RightPanel/RightPanel';
import WorkHistory from '../../Components/WorkHistory/WorkHistory';
import WeekBuilder from '../../Components/WeekBuilder/WeekBuilder';
import Modal from '../../Components/UI/Modal/Modal';
import AddTask from '../../Components/WeekBuilder/WeekControls/AddTask/AddTask';

class HoursCreation extends Component {
    state = {
        showModal: false
    }

    addTaskHandler = () => {
        this.setState({showModal: true});
    }

    cancelTaskHandler = () => {
        this.setState({showModal: false});
    }
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
                        showFullScreenButton
                        hidePanel={this.props.hidePanel}
                        togglePanel={this.props.togglePanel}>
                        <WeekBuilder
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
                    <AddTask />
                </Modal>
            </Aux>
        );
    }
}

export default HoursCreation;