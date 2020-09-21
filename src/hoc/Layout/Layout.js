import React, { Component } from 'react';
import Aux from '../Aux/Aux';

import './Layout.css';

class Layout extends Component {
    render(props) {
        return (
            <Aux>
                {/* fullScreenButton
                toolbar */}
                <main className='Content'>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;