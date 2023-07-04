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
        </>
    )
}

