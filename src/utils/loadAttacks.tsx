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
            return coneAoe;
        case 'triangle':
            return triangleAoe;
        case 'rect':
            return rectangleAoe;
        case 'circle':
            return circleAoe;
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
    target: null,
    pos: { x: 0, y: 0 },
    drawRotPoint: { x: 0, y: 0 },
    size: { x: 40, y: 40 },
    img: getIcon('circle'),
    rotation: 0,
    color: '255,0,0',
    alpha: 0.5,
    radius: 20,
    parents: [],
    type: 'c' as DragIconType,
    draw: (context: CanvasRenderingContext2D) => {
        context.beginPath();
        context.arc(0, 0, circleAoe.radius, 0, 2 * Math.PI);
        context.fillStyle = `rgba(${circleAoe.color}, ${circleAoe.alpha})`;
        context.fill();
    }
}

const coneAoe: ConeAoe = {
    id: 0,
    step: 0,
    identifier: 'cone',
    target: null,
    shape: 'cone',
    pos: { x: 0, y: 0 },
    drawRotPoint: { x: 0, y: 0 },
    size: { x: 30, y: 30 },
    img: getIcon('cone'),
    rotation: 0,
    color: '255,0,0',
    alpha: 0.5,
    angle: 90,
    height: 100,
    parents: [],
    type: 'c' as DragIconType,
    draw: (context: CanvasRenderingContext2D) => {
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(coneAoe.height, coneAoe.angle / 2);
        context.lineTo(coneAoe.height, -coneAoe.angle / 2);
        context.closePath();
        context.fillStyle = `rgba(${coneAoe.color}, ${coneAoe.alpha})`;
        context.fill();
    }
}

const rectangleAoe: RectangleAoe = {
    id: 0,
    step: 0,
    identifier: 'rectangle',
    target: null,
    pos: { x: 0, y: 0 },
    drawRotPoint: { x: 0, y: 0 },
    rotAtBottom: false,
    size: { x: 30, y: 100 },
    img: getIcon('rect'),
    rotation: 0,
    color: '255,0,0',
    alpha: 0.5,
    width: 30,
    parents: [],
    height: 100,
    type: 'c' as DragIconType,
    draw: (context: CanvasRenderingContext2D) => {
        context.beginPath();
        context.rect(0, 0, rectangleAoe.width, rectangleAoe.height);
        context.fillStyle = `rgba(${rectangleAoe.color}, ${rectangleAoe.alpha})`;
        context.fill();
    }
}

const triangleAoe: ConeAoe = {
    id: 0,
    step: 0,
    identifier: 'triangle',
    target: null,
    shape: 'triangle',
    angle: 90,
    pos: { x: 0, y: 0 },
    drawRotPoint: { x: 0, y: 0 },
    size: { x: 30, y: 30 },
    img: getIcon('triangle'),
    rotation: 0,
    color: '255,0,0',
    alpha: 0.5,
    height: 5,
    parents: [],
    type: 'c' as DragIconType,
    draw: (context: CanvasRenderingContext2D) => {
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(triangleAoe.height, triangleAoe.height);
        context.lineTo(triangleAoe.height, -triangleAoe.height);
        context.closePath();
        context.fillStyle = `rgba(${triangleAoe.color}, ${triangleAoe.alpha})`;
        context.fill();
    }
}
