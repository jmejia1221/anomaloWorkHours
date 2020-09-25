import React, { Component } from 'react';

import './Modal.css';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    render() {
        return (
            <Aux>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.closeModal} />
                {this.props.show && (
                    <div
                        className="Modal">
                        {this.props.children}
                    </div>
                )}
            </Aux>
        );
    }
}

export default Modal;