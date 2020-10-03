import React, { Component } from 'react';

import './Modal.css';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class Modal extends Component {
    render() {
        return (
            <Aux>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.closeModal} />
                {this.props.show && (
                    <div className="Modal">
                        <span
                            className="ModalCloseButton"
                            onClick={this.props.closeModal}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                        {this.props.children}
                    </div>
                )}
            </Aux>
        );
    }
}

export default Modal;