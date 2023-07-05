import lc1 from '../icons/toppings/limitcut/lc1.png';
import lc2 from '../icons/toppings/limitcut/lc2.png';
import lc3 from '../icons/toppings/limitcut/lc3.png';
import lc4 from '../icons/toppings/limitcut/lc4.png';
import lc5 from '../icons/toppings/limitcut/lc5.png';
import lc6 from '../icons/toppings/limitcut/lc6.png';
import lc7 from '../icons/toppings/limitcut/lc7.png';
import lc8 from '../icons/toppings/limitcut/lc8.png';

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

type Lc = keyof typeof lc;

export const getAllLcIcons = () => {
    return {
        ...lc
    }
}

const getIconName = (key: Lc) => {
    return key;
}

const getIcon = (key: Lc) => {
    const allIcons = getAllLcIcons();
    return allIcons[key];
}

const getDraggableIcon = (key: Lc) => {
    return <DragIcon 
        key={key} 
        role={key} 
        type={DragIconType.Player}
        src={getIcon(key)} 
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
        step: 1,
        identifier: key,
        size: { x: width, y: 30 },
        pos: { x: 0, y: 0 },
        img: getIcon(key),
        rotation: 0,
        drawRotPoint: { x: 0, y: 0 },
        type: DragIconType.Player,
        isChild: false,
        drawOffset: { x: 0, y: -20 },
    }
}

export const getLcPrefabs = () => {
    return Object.keys(lc).map((key) => {
        return getLcPrefab(key as Lc);
    })
}
