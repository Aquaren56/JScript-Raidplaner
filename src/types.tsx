
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
    Attack = 'attack',
    Topping = 'topping',
    A = 'a',
    B = 'b',
    C = 'c',
    D = 'd',
    E = 'e',
    F = 'f',
    G = 'g',
    H = 'h',
}

export interface SceneObject {
    id: number;
    step: number;
    identifier: string;
    size: Point;
    pos: Point;
    img: string;
    rotation: number;
    drawRotPoint: Point;
    type: DragIconType;
}

export interface NonObject extends SceneObject {
    isChild?: boolean;
    parents: Objects[];
}

export interface Attack extends NonObject {
    rotation: number;
    color: string;
    alpha: number;
    target: (string | number)[];
}

export interface CircleAoe extends Attack {
    radius: number;
}

export interface ConeAoe extends Attack {
    shape: 'cone' | 'triangle';
    angle: number;
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
    topping?: Topping;
    children: SceneObject[];
}

export interface Player extends Objects {
    role: 'tank' | 'healer' | 'dps';
}

export interface Topping extends NonObject {
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

export function isNonObject(sceneObject: SceneObject): sceneObject is NonObject {
    return (sceneObject as NonObject).parents !== undefined;
}

export function isPlayer(sceneObject: SceneObject): sceneObject is Player {
    return (sceneObject as Player).role !== undefined;
}