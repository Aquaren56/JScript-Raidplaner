import { Attack, SceneObject, isCircleAoe, isConeAoe, isRectangleAoe, isObjects, Objects } from "../../../types";
import RectAoeProperties from "./rectAoeProps";
import CircleAoeProperties from "./circleAoeProps";
import ConeAoeProperties from "./coneAoeProps";
import TriangleAoeProperties from "./triangleAoeProps";
import Dropdown from '../YetAnotherDropdown';

interface Props {
    attack: Attack;
    changingAttack: Function;
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


    const displayAttackSpecificProps = () => {
        if (isCircleAoe(props.attack)) {
            return (
                <CircleAoeProperties attack={props.attack} changeAttack={props.changingAttack}/>
            )
        } else if (isConeAoe(props.attack)) {
            if(props.attack.shape === 'cone') {
            return <ConeAoeProperties attack={props.attack} changeAttack={props.changingAttack}/> 
        } else { 
            return <TriangleAoeProperties attack={props.attack} changeAttack={props.changingAttack}/> 
        }
        } else if (isRectangleAoe(props.attack)) {
            return <RectAoeProperties attack={props.attack} changeAttack={props.changingAttack}/>
        } else {
            return (   
                <div>Unknown</div>
            )
        }
    }

    function hexToRgb(hex: string) {
        // Remove the '#' character from the hex color code
        const cleanedHex = hex.replace('#', '');
    
        // Convert the cleaned hex value to RGB
        const r = parseInt(cleanedHex.substring(0, 2), 16);
        const g = parseInt(cleanedHex.substring(2, 4), 16);
        const b = parseInt(cleanedHex.substring(4, 6), 16);
    
        return `${r},${g},${b}` ;
      }

      function rgbToHex(rgb: string): string {
        const values = rgb.split(',').map((value) => parseInt(value.trim(), 10));
        const [r, g, b] = values;
      
        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
          const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
          return `#${hex}`;
        }
      
        return '';
      }
        
    return (
        <div>
            <br />
            x: <input type="number" value={props.attack.drawRotPoint.x} onChange={(e) => {
                        props.attack.drawRotPoint.x = parseInt(e.target.value, 10);
                        props.changingAttack();
                    }} />
            <br />
            y: <input type="number" value={props.attack.drawRotPoint.y} onChange={(e) => {
                        props.attack.drawRotPoint.y = parseInt(e.target.value, 10);
                        props.changingAttack();
                    }} />
            <br />
            Color: <input type="color" value={rgbToHex(props.attack.color)} onChange={(e) => {
                        const rgb = hexToRgb(e.target.value);
                        props.attack.color = rgb;
                        props.changingAttack();
                    }} />
            <br />
            OpacitySlider: <input type="range" min="0" max="100" step="5" value={(props.attack.alpha * 100).toFixed(2)} onChange={(e) => {
                        props.attack.alpha = parseInt(e.target.value, 10) / 100;
                        props.changingAttack();
                    }} />
            {(props.attack.alpha * 100).toFixed(0)}
            <br />
            Rotation: <input type="number" value={props.attack.rotation} onChange={(e) => {
                        props.attack.rotation = parseInt(e.target.value, 10);
                        props.changingAttack();
                    }} />
            <br />
            
            {displayAttackSpecificProps()}

            <br />

            <Dropdown objects={getAllObjects()} nonObject={props.attack} change={props.changingAttack}/>
        </div>
    )
}