import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Panels from '../../Components/Panels/Panels';
import LeftPanel from '../../Components/Panels/LeftPanel/LeftPanel';
import RightPanel from '../../Components/Panels/RightPanel/RightPanel';
import WorkHistory from '../../Components/WorkHistory/WorkHistory';
import WeekBuilder from '../../Components/WeekBuilder/WeekBuilder';

class HoursCreation extends Component {
    render() {
        return(
            <Aux>
                <Panels>
                    <LeftPanel
                        title="Work History"
                        type="history">
                        <WorkHistory />
                    </LeftPanel>
                    <RightPanel>
                        <WeekBuilder
                            name="John Mejia"
                            weekControls
                            weekHours
                            actions />
                    </RightPanel>
                </Panels>
            </Aux>
        );
    }
}

export default HoursCreation;