import { CircleAoe } from "../../../types";

interface Props {
    attack: CircleAoe;
    changeAttack: Function;
}

export default function CircleAoeProperties(props: Props) {
    return (
        <>
            <div className="input-number-row-1">
                <div className="input-number-con">
                    <label className="input-label">Radius:</label>
                    <input className='input-number single' step='15' type="number" value={props.attack.size.x/2} onChange={(e) => {
                                props.attack.size.y = parseInt(e.target.value)*2;
                                props.attack.size.x = parseInt(e.target.value)*2;
                                props.changeAttack();
                            }} 
                    />
                </div>
            </div>
        </>
    )
}

