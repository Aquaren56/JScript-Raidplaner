import { CircleObject } from "../../../types";
import { StepContext } from "../../../App";
import { useContext } from "react";

interface Props {
  attack: CircleObject;
  changeAttack: Function;
}

export default function CircleAoeProperties({ attack, changeAttack }: Props) {
  const step = useContext(StepContext);
  return (
    <>
      <div className="input-number-row-1">
        <div className="input-number-con">
          <label className="input-label">Radius:</label>
          <input
            className="input-number single"
            step="15"
            type="number"
            value={attack[step].radius}
            onChange={(e) => {
              attack[step].radius = parseInt(e.target.value);
              changeAttack();
            }}
          />
        </div>
      </div>
    </>
  );
}
