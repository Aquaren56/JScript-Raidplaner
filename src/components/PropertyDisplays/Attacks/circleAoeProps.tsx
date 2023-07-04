import { CircleAoe } from "../../../types";

interface Props {
    attack: CircleAoe;
    changeAttack: Function;
}

export default function CircleAoeProperties(props: Props) {
    return (
        <>
            radius: <input type='number' value={props.attack.size.y/2} onChange={(e) => {
                props.attack.size.y = parseInt(e.target.value)*2;
                props.attack.size.x = parseInt(e.target.value)*2;
                props.changeAttack();
            }}
                />
        </>
    )
}

