import '../../styling/header.css';
import IconModel from '../../models/IconModel';
import MapModel from '../../models/MapModel';

import MapProperties from './MapProperties';
import PlayerProperties from './PlayerProperties';

interface Player {
    player: IconModel;
    index: number;
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
                <PlayerProperties player={props.selection.player} changingPlayer={props.changeSelection} index={props.selection.index}/>
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