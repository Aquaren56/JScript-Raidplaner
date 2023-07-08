import { ConeAoe } from '../../../types';


interface Props {
    attack: ConeAoe;
    changeAttack: Function;
}

export default function ConeAoeProperties(props: Props) {
    return (
        <>
            <div className="input-number-row-2">
                <div className="input-number-con">
                    <label className="input-label">Angle:</label>
                    <input className='input-number' type='number' step={5} value={props.attack.angle} onChange={(e) => {
                    props.attack.angle = parseInt(e.target.value)
                    props.changeAttack();
                }}
                    />
                </div>
                <div className="input-number-con">
                    <label className="input-label">Radius:</label>
                    <input className='input-number' type='number' step={10} value={props.attack.size.x/2} onChange={(e) => {
                        props.attack.size.x = parseInt(e.target.value)*2;
                        props.attack.size.y = parseInt(e.target.value)*2;
                        props.changeAttack();
                    }} />
                </div>
            </div>
        </>
    )
}