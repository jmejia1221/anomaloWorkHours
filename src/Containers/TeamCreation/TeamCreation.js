import React, { Component } from 'react';
import TeamBuilder from '../../Components/TeamBuilder/TeamBuilder';

import Panels from '../../Components/UI/Panels/Panels';
import RightPanel from '../../Components/UI/Panels/RightPanel/RightPanel';
import Modal from '../../Components/UI/Modal/Modal';
import CreateTeam from '../../Components/TeamBuilder/CreateTeam/CreateTeam';

class TeamCreation extends Component {
    state = {
        showModal: false
    }

    createNewTeamHandler = () => {
        this.setState({showModal: true});
    }

    cancelTeamCreationHandler = () => {
        this.setState({showModal: false});
    }

    render() {
        return (
            <>
                <Panels>
                    <RightPanel
                        title="My Teams">
                        <TeamBuilder
                            addNewTeam={this.createNewTeamHandler} />
                    </RightPanel>
                </Panels>
                <Modal
                    show={this.state.showModal}
                    closeModal={this.cancelTeamCreationHandler}>
                    <CreateTeam />
                </Modal>
            </>
        )
    }
}

export default TeamCreation;