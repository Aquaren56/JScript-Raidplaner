import { Attack, SceneObject, isCircleAoe, isConeAoe, isRectangleAoe, isObjects, Objects } from "../../../types";
import RectAoeProperties from "./rectAoeProps";
import CircleAoeProperties from "./circleAoeProps";
import ConeAoeProperties from "./coneAoeProps";
import TriangleAoeProperties from "./triangleAoeProps";
import ColorButton from '../ColorButtonPrefab';
import { valuesToInt, valuesMaybeToInt } from "../../../utils/utils";
import Dd2 from '../TestDropdown';

import '../../../styling/property.css'

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

    const getColorButtons = () => {
        const colors = [
            '#ff0000',
            '#00ff00',
            '#0000ff',
            '#ffff00',
            '#ff00ff',
            '#00ffff',
            '#ffffff',
            '#000000',
            '#ff8000',
            '#8000ff',
            '#00ff80',
            '#ff0080',
            '#80ff00',
            '#0080ff',
        ]
        return colors.map((color) => {
            return <ColorButton key={color} color={color} attack={props.attack} onChange={props.changingAttack} colorToRgb={hexToRgb}/>
        })
    }

    const mapParentsIdToString = () => {
        return props.attack.parents.map((parent) => {
            return parent.id.toString();
        })
    }

    const objectsToDropdown = () => {
        return getAllObjects().map((object) => {
            return {value: object.id.toString(), label: object.identifier}
        })
    }

    const onNewSource = (updatedValues: string[]) => {
        const parents = getAllObjects().filter((object) => valuesToInt(updatedValues).includes(object.id));
        props.attack.parents = parents;
        props.changingAttack();
    }    

    const getTargetValues = () => {
        const values = ['1', '2', '3', '4', '5', '6', '7', '8', 'dps', 'healer', 'tank', 'support'];
        return values.map((value) => {
            return {value: value, label: value}
        })
    }

    const onNewTarget = (updatedValues: string[]) => {
        props.attack.target = valuesMaybeToInt(updatedValues);
        props.changingAttack();
    }

    const mapTargetsToString = () => {
        if(props.attack.target) {
            return props.attack.target.map((target) => {
                return target.toString();
            })
        } else {
            return []
        }    
    }
        
    return (
        <div>
            <div>
                <div className="input-number-con">
                    <label className="input-label">Color:</label>
                    <div className="color-display">
                        <div style={{ backgroundColor: rgbToHex(props.attack.color), display: 'inline', width:25 }}>
                            <input className='input-color' type="color" value={rgbToHex(props.attack.color)} onChange={(e) => {
                                        const rgb = hexToRgb(e.target.value);
                                        props.attack.color = rgb;
                                        props.changingAttack();
                                    }} />

                            
                        </div>
                        <input className='input-color-text' type="text" value={rgbToHex(props.attack.color)} onChange={(e) => {
                            if(/#[0-9A-Fa-f]{6}/.test(e.target.value)) {
                                const rgb = hexToRgb(e.target.value);
                                props.attack.color = rgb;
                                props.changingAttack();
                            }
                        }} />
                    </div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            {getColorButtons().slice(0, 7).map((button,index) => {
                                return <td key={index}>{button}</td>
                            })}
                        </tr>
                        <tr>
                            {getColorButtons().slice(7, 14).map((button,index) => {
                                return <td key={index}>{button}</td>
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="input-number-con">
                <label className="input-label">Opacity:</label>
                <div className="opacity-slider">
                    <input type="range" min="0" max="100" step="5" value={(props.attack.alpha * 100).toFixed(2)} onChange={(e) => {
                                props.attack.alpha = parseInt(e.target.value, 10) / 100;
                                props.changingAttack();
                            }} />
                    {(props.attack.alpha * 100).toFixed(0)}%
                            
                </div>

            </div>
            <br />
            <div className="input-number-row-2">
                <div className="input-number-con">
                    <label className="input-label">Pos X:</label>
                    <input className='input-number' step='10' type="number" value={props.attack.drawRotPoint.x} onChange={(e) => {
                        props.attack.drawRotPoint.x = parseInt(e.target.value, 10);
                        props.changingAttack();
                    }} />
                </div>
                <div className="input-number-con">
                    <label className="input-label">Pos Y:</label>
                    <input className='input-number' step='10' type="number" value={props.attack.drawRotPoint.y} onChange={(e) => {
                            props.attack.drawRotPoint.y = parseInt(e.target.value, 10);
                            props.changingAttack();
                        }} />
                </div>
            </div>
            <br />
            
            {displayAttackSpecificProps()}
            <br />
            <div className="input-number-row-1">
                <div className="input-number-con">
                    <label className="input-label">Rotation:</label>
                    <input className='input-number single' step='15' type="number" value={props.attack.rotation} onChange={(e) => {
                                props.attack.rotation = parseInt(e.target.value, 10);
                                props.changingAttack();
                            }} 
                    />
                </div>
            </div>
            

            <br />

            <Dd2 objects={objectsToDropdown()} selection={mapParentsIdToString()} updateValues={onNewSource} dropdownLabel="Source: "/>
            <Dd2 objects={getTargetValues()} selection={mapTargetsToString()} updateValues={onNewTarget} dropdownLabel="Target: "/>
        </div>
    )
}