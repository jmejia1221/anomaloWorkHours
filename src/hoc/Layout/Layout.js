import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import Navigation from '../../Components/Navigation/NavigationItems/NavigationItems';

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
                { this.props.showMenu && <Navigation /> }
            </Aux>
        )
    }
}

export default Layout;