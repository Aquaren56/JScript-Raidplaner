import { SceneObject, Topping, isObjects, Objects } from "../../types";
import Dropdown from './YetAnotherDropdown';
import { valuesToInt } from "../../utils/utils";

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

    const onNewTarget = (updatedValues: string[]) => {
        const parents = getAllObjects().filter((object) => valuesToInt(updatedValues).includes(object.id));
        props.topping.parents = parents;
        props.changingTopping();
    }
        
    return (
        <div>
             <div className="input-number-row-2">
                <div className="input-number-con">
                    <label className="input-label">Pos X:</label>
                    <input className='input-number' step='10' type="number" value={props.topping.drawRotPoint.x} onChange={(e) => {
                        props.topping.drawRotPoint.x = parseInt(e.target.value, 10);
                        props.changingTopping();
                    }} />
                </div>
                <div className="input-number-con">
                    <label className="input-label">Pos Y:</label>
                    <input className='input-number' step='10' type="number" value={props.topping.drawRotPoint.y} onChange={(e) => {
                            props.topping.drawRotPoint.y = parseInt(e.target.value, 10);
                            props.changingTopping();
                        }} />
                </div>
            </div>
            <br />

            <Dropdown objects={getAllObjects()} nonObject={props.topping} updateValues={onNewTarget}/>
        </div>
    )
}