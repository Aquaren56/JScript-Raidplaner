import { SceneObject, Topping, isObjects, Objects } from "../../types";
import Dropdown from './YetAnotherDropdown';

interface Props {
    topping: Topping;
    changingTopping: Function;
    allElements: (SceneObject | Objects)[];
}

export default function AttackProperties(props: Props) {

    const getAllObjects = (): Objects[] => {
        const arr = props.allElements.filter((element) => {
            return isObjects(element);
        })
        
        if(arr.every((element) => {
            return isObjects(element);
        })) {
            return arr as Objects[];
        }
        return [];

    }
        
    return (
        <div>
            <br />
            x: <input type="number" value={props.topping.drawRotPoint.x} onChange={(e) => {
                        props.topping.drawRotPoint.x = parseInt(e.target.value, 10);
                        props.changingTopping();
                    }} />
            <br />
            y: <input type="number" value={props.topping.drawRotPoint.y} onChange={(e) => {
                        props.topping.drawRotPoint.y = parseInt(e.target.value, 10);
                        props.changingTopping();
                    }} />
            <br />

            <Dropdown objects={getAllObjects()} nonObject={props.topping} change={props.changingTopping}/>
        </div>
    )
}