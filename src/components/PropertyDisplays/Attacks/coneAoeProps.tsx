import { ConeAoe } from '../../../types';

interface Props {
    attack: ConeAoe;
    changeAttack: Function;
}

export default function ConeAoeProperties(props: Props) {
    return (
        <>
            angle: <input type='number' value={props.attack.angle} onChange={(e) => {
                props.attack.angle = parseInt(e.target.value)
                props.changeAttack();
            }}
                />
            <br />
            radius: <input type='number' value={props.attack.size.x/2} onChange={(e) => {
                props.attack.size.x = parseInt(e.target.value)*2;
                props.changeAttack();
            }} />
        </>
    )
}