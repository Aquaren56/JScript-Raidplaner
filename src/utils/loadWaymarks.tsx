import WayA from '../icons/waymarks/way_a.png';
import WayB from '../icons/waymarks/way_b.png';
import WayC from '../icons/waymarks/way_c.png';
import WayD from '../icons/waymarks/way_d.png';
import Way1 from '../icons/waymarks/way_1.png';
import Way2 from '../icons/waymarks/way_2.png';
import Way3 from '../icons/waymarks/way_3.png';
import Way4 from '../icons/waymarks/way_4.png';

import DragIcon from '../components/IconBar/DraggableIcon';
import { DragIconType } from './DragnDrop';
import { Waymark } from '../types';

const waymarkNumbers = {
    way1: Way1,
    way2: Way2,
    way3: Way3,
    way4: Way4
}

const waymarkLetters = {
    wayA: WayA,
    wayB: WayB,
    wayC: WayC,
    wayD: WayD
}

type WaymarkNumber = keyof typeof waymarkNumbers;
type WaymarkLetter = keyof typeof waymarkLetters;
type WaymarkIcon = WaymarkNumber | WaymarkLetter;

const getAllWaymarkIcons = () => {
    return {
        ...waymarkNumbers,
        ...waymarkLetters
    }
}

const getIconName = (key: WaymarkIcon) => {
    return key;
}

const getIcon = (key: WaymarkIcon) => {
    const allIcons = getAllWaymarkIcons();
    return allIcons[key];
}

const getDraggableIcon = (key: WaymarkIcon) => {
    return <DragIcon 
        key={key} 
        role={key} 
        type={DragIconType.Waymark}
        src={getIcon(key)} 
        alt={getIconName(key)}
        SceneObjectProps={getWaymarkPrefab(key)}/>
}

const getDraggableIcons = (keys: (WaymarkIcon)[]) => {
    return keys.map((key) => {
        return getDraggableIcon(key);
    })
}

export const getWaymarkDragIcons = () => {
    return (
        <>
            <div className='icon-row'>
                {Object.keys(waymarkNumbers).map((key) => {
                    return getDraggableIcons([key as WaymarkIcon]);
                })}
            </div>
            <div className='icon-row'>
                {Object.keys(waymarkLetters).map((key) => {
                    return getDraggableIcons([key as WaymarkIcon]);
                })}
            </div>
        </>
    )
}

const getWaymarkPrefab = (key: WaymarkIcon): Waymark => {
    const allIcons = getAllWaymarkIcons();
    const icon = allIcons[key];
    const shape = key.includes('way') ? 'square' : 'circle';
    return {
        step: 0,
        rotation: 0,
        identifier: key,
        pos: { x: 0, y: 0 },
        size: { x: 30, y: 30 },
        img: icon,
        shape,
        drawSize: { x: 30, y: 30 }
    }
}