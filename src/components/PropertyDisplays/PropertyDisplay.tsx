import '../../styling/header.css';
import IconModel from '../../models/IconModel';
import MapModel from '../../models/MapModel';

import MapProperties from './MapProperties';

interface PropertyDisplayProps {
    selection: IconModel | MapModel;
    changeSelection: Function;
    changeMap: Function;
}

export default function PropertyDisplay(props: PropertyDisplayProps) {
    const display = () => {
        if(props.selection instanceof IconModel) {
            return (
                <div>{props.selection.identifier}</div>
            )
        } else {
            return (
                <MapProperties map={props.selection} changeMap={props.changeMap}/>
            )
        }
    }

    return (
        <div className='property-display'>
            PropertyDIsplay Right Side
            {display()}
        </div>
    )
}