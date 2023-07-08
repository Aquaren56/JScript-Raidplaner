import { RectangleAoe } from "../../../types";

import '../../../styling/property.css'


interface Props {
    attack: RectangleAoe;
    changeAttack: Function;
}

export default function RectAoeProperties(props: Props) {
    return (
        <>
            <div className="input-number-row-2">
                <div className="input-number-con">
                    <label className="input-label">Height:</label>
                    <input className='input-number' type='number' value={props.attack.size.y} onChange={(e) => {
                        props.attack.size.y = parseInt(e.target.value)
                        props.changeAttack();
                        }}
                    />
                </div>
                <div className="input-number-con">
                    <label className="input-label">Width:</label>
                    <input className='input-number' type='number' value={props.attack.size.x} onChange={(e) => {
                        props.attack.size.x = parseInt(e.target.value)
                        props.changeAttack();
                        }
                    }/>
                </div>
            </div>
            
            <br />
            PointOfRotationBottom: <input type='checkbox' checked={props.attack.rotAtBottom} onChange={(e) => {
                props.attack.rotAtBottom = e.target.checked;
                if(props.attack.rotAtBottom) {
                    props.attack.drawRotPoint.y = props.attack.drawRotPoint.y + props.attack.size.y/2;
                } else {
                    props.attack.drawRotPoint.y = props.attack.drawRotPoint.y + props.attack.size.y/2;
                }
                props.changeAttack();
            }} />
        </>
    )
}

