import '../../styling/header.css';
import MapModel from '../../models/MapModel';
import { SceneObject, isAttack, isObjects, isTopping } from '../../types';
import AttackProperties from './Attacks/base';
import ToppingProperties from './ToppingProperties';

import MapProperties from './MapProperties';
import PlayerProperties from './PlayerProperties';


interface PropertyDisplayProps {
    selection: SceneObject | MapModel;
    changeSelection: Function;
    changeMap: Function;
    allElements: SceneObject[];
    addElements: Function;
}

export default function PropertyDisplay(props: PropertyDisplayProps) {
    const display = () => {
        if(props.selection instanceof MapModel) {
            return (
                <MapProperties map={props.selection} changeMap={props.changeMap}/>
                )
            } else if (isObjects(props.selection)) {
                return (
                <PlayerProperties player={props.selection} changingPlayer={props.changeSelection} addElements={props.addElements} allElements={props.allElements}/>
            )
        } else if (isAttack(props.selection)) {
            return (
                <AttackProperties attack={props.selection} changingAttack={props.changeSelection} allElements={props.allElements}/>
            )
        } else if(isTopping(props.selection)) {
            return (
                <ToppingProperties topping={props.selection} changingTopping={props.changeSelection} allElements={props.allElements}/>
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