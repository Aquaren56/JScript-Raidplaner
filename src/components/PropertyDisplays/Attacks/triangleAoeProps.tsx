import { ConeAoe } from "../../../types";

interface Props {
    attack: ConeAoe;
    changeAttack: Function;
}

export default function TriangleAoeProperties(props: Props) {
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
        </>
    )
}

