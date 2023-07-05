import { RectangleAoe } from "../../../types";

interface Props {
    attack: RectangleAoe;
    changeAttack: Function;
}

export default function RectAoeProperties(props: Props) {
    return (
        <>
            height: <input type='number' value={props.attack.size.y} onChange={(e) => {
                props.attack.size.y = parseInt(e.target.value)
                props.changeAttack();
            }}
                />
            <br />
            width: <input type='number' value={props.attack.size.x} onChange={(e) => {
                props.attack.size.x = parseInt(e.target.value);
                props.changeAttack();
            }} />
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

