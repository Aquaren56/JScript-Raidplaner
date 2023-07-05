import lc1 from '../icons/toppings/limitcut/FFXIV_Dice_1.png';
import lc2 from '../icons/toppings/limitcut/FFXIV_Dice_2.png';
import lc3 from '../icons/toppings/limitcut/FFXIV_Dice_3.png';
import lc4 from '../icons/toppings/limitcut/FFXIV_Dice_4.png';
import lc5 from '../icons/toppings/limitcut/FFXIV_Dice_5.png';
import lc6 from '../icons/toppings/limitcut/FFXIV_Dice_6.png';
import lc7 from '../icons/toppings/limitcut/FFXIV_Dice_7.png';
import lc8 from '../icons/toppings/limitcut/FFXIV_Dice_8.png';

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

const getAllLcIcons = () => {
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

const getLcPrefab = (key: Lc): Topping => {
    return {
        step: 1,
        identifier: key,
        size: { x: 50, y: 50 },
        pos: { x: 0, y: 0 },
        img: getIcon(key),
        rotation: 0,
        drawRotPoint: { x: 0, y: 0 },
        type: DragIconType.Player,
        isChild: false,
        drawOffset: { x: 0, y: -20 },
    }
}
