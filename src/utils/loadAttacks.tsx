import cone from '../icons/attacks/cone.png';
import rect from '../icons/attacks/rect.png';
import triangle from '../icons/attacks/triangle.png';
import circle from '../icons/attacks/circle.png';
import { DragIconType } from './DragnDrop';

import { CircleAoe, RectangleAoe, ConeAoe } from '../types';


import DragIcon from '../components/IconBar/DraggableIcon';

const attackShapes = {
    cone: cone,
    rect: rect,
    triangle: triangle,
    circle: circle,
}

export type AttackShape = keyof typeof attackShapes;

const getIconName = (key: AttackShape) => {
    return key;
}

export const getIcon = (key: AttackShape) => {
    return attackShapes[key];
}

export const loadAttacks = () => {
    return Object.keys(attackShapes).map((key) => {
        return <DragIcon 
            key={key} 
            role={key} 
            type={DragIconType.Attack}
            src={getIcon(key as AttackShape)} 
            alt={getIconName(key as AttackShape)}
            SceneObjectProps={getAttack(key as AttackShape)}/>
    })
}

export const getAttack = (key: AttackShape) => {
    switch (key) {
        case 'cone':
            return {...coneAoe};
        case 'triangle':
            return {...triangleAoe};
        case 'rect':
            return {...rectangleAoe};
        case 'circle':
            return {...circleAoe};
    }
}

export const getAllAttacks = () => {
    return {
        ...attackShapes
    }
}

export const getAttackPrefabs = () => {
    return {
        coneAoe,
        triangleAoe,
        rectangleAoe,
        circleAoe
    }
}

const circleAoe: CircleAoe = {
    id: 0,
    step: 0,
    identifier: 'circle',
    target: [],
    pos: { x: 0, y: 0 },
    drawRotPoint: { x: 0, y: 0 },
    size: { x: 200, y: 200 },
    img: getIcon('circle'),
    rotation: 0,
    color: '255,0,0',
    alpha: 0.5,
    radius: 100,
    parents: [],
    type: 'd' as DragIconType,
}

const coneAoe: ConeAoe = {
    id: 0,
    step: 0,
    identifier: 'cone',
    target: [],
    shape: 'cone',
    pos: { x: 0, y: 0 },
    drawRotPoint: { x: 0, y: 0 },
    size: { x: 500, y: 500 },
    img: getIcon('cone'),
    rotation: 0,
    color: '255,0,0',
    alpha: 0.5,
    angle: 70,
    parents: [],
    type: 'd' as DragIconType,
}

const rectangleAoe: RectangleAoe = {
    id: 0,
    step: 0,
    identifier: 'rectangle',
    target: [],
    pos: { x: 0, y: 0 },
    drawRotPoint: { x: 0, y: 0 },
    rotAtBottom: false,
    size: { x: 125, y: 1000 },
    img: getIcon('rect'),
    rotation: 0,
    color: '255,0,0',
    alpha: 0.5,
    width: 30,
    parents: [],
    height: 100,
    type: 'd' as DragIconType,
}

const triangleAoe: ConeAoe = {
    id: 0,
    step: 0,
    identifier: 'triangle',
    target: [],
    shape: 'triangle',
    angle: 70,
    pos: { x: 0, y: 0 },
    drawRotPoint: { x: 0, y: 0 },
    size: { x: 250, y: 700 },
    img: getIcon('triangle'),
    rotation: 0,
    color: '255,0,0',
    alpha: 0.5,
    parents: [],
    type: 'd' as DragIconType,
}
