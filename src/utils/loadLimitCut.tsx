import lc1 from '../icons/toppings/limitcut/lc1.png';
import lc2 from '../icons/toppings/limitcut/lc2.png';
import lc3 from '../icons/toppings/limitcut/lc3.png';
import lc4 from '../icons/toppings/limitcut/lc4.png';
import lc5 from '../icons/toppings/limitcut/lc5.png';
import lc6 from '../icons/toppings/limitcut/lc6.png';
import lc7 from '../icons/toppings/limitcut/lc7.png';
import lc8 from '../icons/toppings/limitcut/lc8.png';

import dsrX from '../icons/toppings/playstation/dsrX.png';
import dsrO from '../icons/toppings/playstation/dsrO.png';
import dsrSquare from '../icons/toppings/playstation/dsrSquare.png';
import dsrTriangle from '../icons/toppings/playstation/dsrTriangle.png';

import DragIcon from '../components/IconBar/DraggableIcon';
import { DragIconType } from './DragnDrop';
import { Topping } from '../types';

const lc = {
    lc1: lc1,
    lc2: lc2,
    lc3: lc3,
    lc4: lc4,
    lc5: lc5,
    lc6: lc6,
    lc7: lc7,
    lc8: lc8
}

const dsr = {
    dsrX: dsrX,
    dsrO: dsrO,
    dsrSquare: dsrSquare,
    dsrTriangle: dsrTriangle
}

export type Lc = keyof typeof lc;
export type Dsr = keyof typeof dsr;

export const getAllLcIcons = () => {
    return {
        ...lc
    }
}

export const getAllDsrIcons = () => {
    return {
        ...dsr
    }
}

const getIconName = (key: Lc) => {
    return key;
}

const getLcIcon = (key: Lc) => {
    const allIcons = getAllLcIcons();
    return allIcons[key];
}

const getDSRIcon = (key: Dsr) => {
    const allIcons = getAllDsrIcons();
    return allIcons[key];
}

const getDraggableIcon = (key: Lc) => {
    return <DragIcon 
        key={key} 
        role={key} 
        type={DragIconType.Player}
        src={getLcIcon(key)} 
        alt={getIconName(key)}
        SceneObjectProps={getLcPrefab(key)}/>
}

export const getDraggableLCIcons = (keys: (Lc)[]) => {
    return keys.map((key) => {
        return getDraggableIcon(key);
    })
}

export const getLcDragIcons = () => {
    return getDraggableLCIcons(Object.keys(lc) as Lc[]);
}

export const getLcPrefab = (key: Lc): Topping => {
    const width = parseInt(key[2],10) > 4 ? 60 : 30;
    return {
        id: 0,
        step: 1,
        identifier: key,
        size: { x: width, y: 30 },
        pos: { x: 0, y: 0 },
        img: getLcIcon(key),
        rotation: 0,
        drawRotPoint: { x: 0, y: 0 },
        type: 'e' as DragIconType,
        isChild: false,
        parents: [],
        drawOffset: { x: 0, y: 5 },
    }
}

export const getDsrPrefab = (key: Dsr): Topping => {
    return {
        id: 0,
        step: 1,
        identifier: key,
        size: { x: 30, y: 30 },
        pos: { x: 0, y: 0 },
        img: getDSRIcon(key),
        rotation: 0,
        drawRotPoint: { x: 0, y: 0 },
        type: 'e' as DragIconType,
        isChild: false,
        drawOffset: { x: 0, y: 5 },
        parents: [],
    }
}

export const getLcPrefabs = () => {
    return Object.keys(lc).map((key) => {
        return getLcPrefab(key as Lc);
    })
}
