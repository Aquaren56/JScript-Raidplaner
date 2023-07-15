export interface Point {
  x: number;
  y: number;
}

export interface CanvasEleVar {
  name: string;
  pos: Point;
  size: Point;
  img?: string;
  type?: DragIconType;
}

export enum ObjectType {
  Player = "player",
  Enemy = "enemy",
  Boss = "boss",
  Topping = "topping",
  Waymark = "waymark",
  Cone = "cone",
  Rect = "rect",
  Circle = "circle",
  Triangle = "triangle",
}

export enum DragIconType {
  Waymark = "waymark",
  Player = "player",
  Enemy = "enemy",
  Object = "object",
  Attack = "attack",
  Topping = "topping",
  A = "a",
  B = "b",
  C = "c",
  D = "d",
  E = "e",
  F = "f",
  G = "g",
  H = "h",
}

export interface SceneObject {
  id: number;
  step: number;
  identifier: string;
  size: Point;
  img: string;
  rotation: number;
  drawRotPoint: Point;
  type: ObjectType;
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
  shape: "cone" | "triangle";
  angle: number;
}

export interface RectangleAoe extends Attack {
  width: number;
  height: number;
  rotAtBottom?: boolean;
}

export interface Waymark extends SceneObject {
  drawSize: Point;
  shape: "square" | "circle";
}

export interface Objects extends SceneObject {
  drawSize: Point;
  img: string;
  children: SceneObject[];
}

export interface Player extends Objects {
  role: "tank" | "healer" | "dps";
}

export interface Topping extends NonObject {
  drawOffset: Point;
}

export type Attacks = CircleAoe | ConeAoe | RectangleAoe;
export type Icons = Waymark | Objects | Topping;

function makeObjectTest<T extends SceneObject>(
  ...types: readonly ObjectType[]
): (object: SceneObject) => object is T {
  return (object): object is T => types.includes(object.type);
}

export const isPlayer = makeObjectTest<Player>(ObjectType.Player);
export const isEnemy = makeObjectTest<Objects>(
  ObjectType.Enemy,
  ObjectType.Boss
);
export const isWaymark = makeObjectTest<Waymark>(ObjectType.Waymark);
export const isObjects = makeObjectTest<Objects>(
  ObjectType.Player,
  ObjectType.Enemy,
  ObjectType.Boss
);
export const isTopping = makeObjectTest<Topping>(ObjectType.Topping);
export const isCircleAoe = makeObjectTest<CircleAoe>(ObjectType.Circle);
export const isConeAoe = makeObjectTest<ConeAoe>(ObjectType.Cone);
export const isRectangleAoe = makeObjectTest<RectangleAoe>(ObjectType.Rect);
export const isAttack = makeObjectTest<Attack>(
  ObjectType.Circle,
  ObjectType.Cone,
  ObjectType.Rect
);
export const isNonObject = makeObjectTest<NonObject>(
  ObjectType.Topping,
  ObjectType.Circle,
  ObjectType.Cone,
  ObjectType.Rect
);
