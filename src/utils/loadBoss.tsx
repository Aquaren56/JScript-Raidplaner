import boss from '../icons/enemy/herbert.png';

import DragIcon from '../components/IconBar/DraggableIcon';
import { DragIconType } from './DragnDrop';
import { Objects } from '../types';

const closs = {
    boss
}

type bossy = keyof typeof closs;

const getAllEnemyIcons = () => {
    return {
        ...closs
        }
}

const getIconName = (key: bossy) => {
    return key;
}

const getIcon = (key: bossy) => {
    const allIcons = getAllEnemyIcons();
    return allIcons[key];
}

const getIconKeys = () => {
    return Object.keys(closs) as bossy[];
}

const getDraggableIcon = (key: bossy) => {
    return <DragIcon 
        key={key} 
        role={key} 
        type={DragIconType.Waymark}
        src={getIcon(key)} 
        alt={getIconName(key)}
        SceneObjectProps={getEnemyPrefab(key)}/>
}

export const getEnemyDragIcons = () => {
    return getIconKeys().map((key) => {
        return getDraggableIcon(key);
    })
}

export const initBossSetup = () => {
    const bossman = Object.keys(closs).map((key) => {
        const schmoss = getEnemyPrefab(key as bossy);
        schmoss.drawRotPoint = { x: 250, y: 100 };
        schmoss.id = 8;

        return schmoss;
    })
        
    return bossman;
}

export const getEnemyPrefabs = (key: bossy): Objects => {
    const allIcons = getAllEnemyIcons();
    const icon = allIcons[key];
    return {
        id: 0,
        step: 0,
        rotation: 0,
        identifier: key,
        pos: { x: 0, y: 0 },
        drawRotPoint: { x: 0, y: 0 },
        size: { x: 120, y: 120 },
        img: icon,
        type: 'a' as DragIconType,
        drawSize: { x: 30, y: 30 },
        children: [],
    }
}

export const getEnemyPrefab = (key: bossy) => {
    const objectPrefab: Objects = {
        id: 0,
        step: 0,
        identifier: key,
        pos: {
            x: 0,
            y: 0
        },
        drawRotPoint: { x: 0, y: 0 },
        size: { x: 100, y: 100 },
        drawSize: {
            x: 30,
            y: 30
        },
        img: getIcon(key),
        rotation: 0,
        type: 'a' as DragIconType,
        children: []
    }
    return objectPrefab;
}