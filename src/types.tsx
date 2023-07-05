
export interface Point {
    x: number;
    y: number;
}

export interface CanvasEleVar {
    name: string;
    pos: Point;
    size: Point;
    img? : string;
    type?: DragIconType;
}

export enum DragIconType {
    Waymark = 'waymark',
    Player = 'player',
    Enemy = 'enemy',
    Object = 'object',
    Attack = 'attack'
}

export interface SceneObject {
    step: number;
    identifier: string;
    size: Point;
    pos: Point;
    img: string;
    rotation: number;
    drawRotPoint: Point;
    type?: DragIconType;
    isChild?: boolean;
}

export interface Attack extends SceneObject {
    rotation: number;
    color: string;
    alpha: number;
    draw: (context: CanvasRenderingContext2D) => void;
}

export interface CircleAoe extends Attack {
    radius: number;
}

export interface ConeAoe extends Attack {
    shape: 'cone' | 'triangle';
    angle: number;
    height: number;
}

export interface RectangleAoe extends Attack {
    width: number;
    height: number;
    rotAtBottom?: boolean;
}

export interface Waymark extends SceneObject {
    drawSize: Point;
    img: string;
    shape: 'square' | 'circle';
}

export interface Objects extends SceneObject {
    drawSize: Point;
    img: string;
    children: SceneObject[];
}

export interface Topping extends SceneObject {
    drawOffset: Point;
}

export type Attacks = CircleAoe | ConeAoe | RectangleAoe;
export type Icons = Waymark | Objects | Topping;

export function isAttack(sceneObject: SceneObject): sceneObject is Attack {
    return (sceneObject as Attack).color !== undefined;
}

export function isWaymark(sceneObject: SceneObject): sceneObject is Waymark {
    return (sceneObject as Waymark).shape !== undefined;
}

export function isObjects(sceneObject: SceneObject): sceneObject is Objects {
    return (sceneObject as Objects).children !== undefined;
}

export function isTopping(sceneObject: SceneObject): sceneObject is Topping {
    return (sceneObject as Topping).drawOffset !== undefined;
}

export function isCircleAoe(attack: Attack): attack is CircleAoe {
    return (attack as CircleAoe).radius !== undefined;
}

export function isConeAoe(attack: Attack): attack is ConeAoe {
    return (attack as ConeAoe).angle !== undefined;
}

export function isRectangleAoe(attack: Attack): attack is RectangleAoe {
    return (attack as RectangleAoe).width !== undefined;
}

