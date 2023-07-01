import '../../styling/header.css';
import IconModel from '../../models/IconModel';
import MapModel from '../../models/MapModel';

import MapProperties from './MapProperties';
import PlayerProperties from './PlayerProperties';

interface Player {
    player: IconModel;
}

interface PropertyDisplayProps {
    selection: Player | MapModel;
    changeSelection: Function;
    changeMap: Function;
}

export default function PropertyDisplay(props: PropertyDisplayProps) {
    const display = () => {
        if(props.selection instanceof MapModel) {
            return (
                <MapProperties map={props.selection} changeMap={props.changeMap}/>
                )
            } else {
                return (
                <PlayerProperties player={props.selection.player} changingPlayer={props.changeSelection} />
            )
        }
    }

    return (
        <div className='property-display' style={{ backgroundColor: 'var(--darkest)'}}>
            PropertyDIsplay Right Side
            {display()}
        </div>
    )
}