import Attacks from "./components/IconBar/tabs/second";

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
    type?: DragIconType;
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
    angle: number;
    height: number;
}

export interface RectangleAoe extends Attack {
    width: number;
    height: number;
}

export interface Waymark extends SceneObject {
    drawSize: Point;
    img: string;
    shape: 'square' | 'circle';
}

export interface Objects extends SceneObject {
    drawSize: Point;
    img: string;
    rotation: number;
    children: SceneObject[];
}

export interface Topping extends SceneObject {
    drawSize: Point;
    img: string;
    drawOffset: Point;
}

export type Attacks = CircleAoe | ConeAoe | RectangleAoe;
export type Icons = Waymark | Objects | Topping;