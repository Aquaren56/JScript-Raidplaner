import cone from "../icons/attacks/cone.png";
import rect from "../icons/attacks/rect.png";
import triangle from "../icons/attacks/triangle.png";
import circle from "../icons/attacks/circle.png";
import { DragIconType } from "./DragnDrop";

import {
  CircleAoe,
  RectangleAoe,
  ConeAoe,
  ObjectType,
  ConeObject,
  RectangleObject,
  CircleObject,
  AttackObject,
  PossibleParentObject,
  Players,
  EnemyObject,
} from "../types";

import DragIcon from "../components/IconBar/DraggableIcon";

const attackShapes = {
  Cone: cone,
  Rect: rect,
  Triangle: triangle,
  Circle: circle,
};

export type AttackShape = keyof typeof attackShapes;

const getIconName = (key: AttackShape) => {
  return key;
};

export const getIcon = (key: AttackShape) => {
  return attackShapes[key];
};

export const loadAttacks = () => {
  return Object.keys(attackShapes).map((key) => {
    return (
      <DragIcon
        key={key}
        role={key}
        type={DragIconType.Attack}
        src={getIcon(key as AttackShape)}
        alt={getIconName(key as AttackShape)}
        SceneObjectProps={getAttack(key as AttackShape)}
      />
    );
  });
};

export const getAttack = (key: AttackShape) => {
  switch (key) {
    case "Cone":
      return { ...coneAoe };
    case "Triangle":
      return { ...triangleAoe };
    case "Rect":
      return { ...rectangleAoe };
    case "Circle":
      return { ...circleAoe };
  }
};

export const getAllAttacks = () => {
  return {
    ...attackShapes,
  };
};

export const getAttackPrefabs = () => {
  return {
    coneAoe,
    triangleAoe,
    rectangleAoe,
    circleAoe,
  };
};

const circleAoe: CircleAoe = {
  id: 0,
  step: 0,
  identifier: "circle",
  target: [],
  drawRotPoint: { x: 0, y: 0 },
  size: { x: 200, y: 200 },
  img: getIcon("Circle"),
  rotation: 0,
  color: "255,0,0",
  alpha: 0.5,
  radius: 100,
  parents: [],
  type: ObjectType.Circle,
};

const coneAoe: ConeAoe = {
  id: 0,
  step: 0,
  identifier: "cone",
  target: [],
  shape: "cone",
  drawRotPoint: { x: 0, y: 0 },
  size: { x: 500, y: 500 },
  img: getIcon("Cone"),
  rotation: 0,
  color: "255,0,0",
  alpha: 0.5,
  angle: 70,
  parents: [],
  type: ObjectType.Cone,
};

const rectangleAoe: RectangleAoe = {
  id: 0,
  step: 0,
  identifier: "rectangle",
  target: [],
  drawRotPoint: { x: 0, y: 0 },
  rotAtBottom: false,
  size: { x: 125, y: 1000 },
  img: getIcon("Rect"),
  rotation: 0,
  color: "255,0,0",
  alpha: 0.5,
  width: 30,
  parents: [],
  height: 100,
  type: ObjectType.Rect,
};

const triangleAoe: ConeAoe = {
  id: 0,
  step: 0,
  identifier: "triangle",
  target: [],
  shape: "triangle",
  angle: 70,
  drawRotPoint: { x: 0, y: 0 },
  size: { x: 250, y: 700 },
  img: getIcon("Triangle"),
  rotation: 0,
  color: "255,0,0",
  alpha: 0.5,
  parents: [],
  type: ObjectType.Cone,
};

const createAttackObject = (id = 0): AttackObject => {
  return {
    id: id,
    label: "",
    type: ObjectType.Rect,
    color: "255,0,0",
    alpha: 0.5,
  };
};

export const createCone = (
  step: number,
  id = 0,
  pos = { x: 250, y: 250 },
  targets = new Array<Players | EnemyObject>(),
  parents = new Array<PossibleParentObject>()
): ConeObject => {
  return {
    ...createAttackObject(id),
    label: "coneAoe",
    type: ObjectType.Cone,
    angle: 70,
    [step]: {
      rotation: 0,
      radius: 250,
      pos: { x: pos.x, y: pos.y },
      targets: targets,
      parents: parents,
    },
  };
};

export const createRect = (
  step: number,
  id = 0,
  pos = { x: 250, y: 250 },
  targets = new Array<Players | EnemyObject>(),
  parents = new Array<PossibleParentObject>()
): RectangleObject => {
  return {
    ...createAttackObject(id),
    label: "rectAoe",
    type: ObjectType.Rect,
    rotAt: "middle",
    [step]: {
      rotation: 0,
      size: { x: 150, y: 500 },
      pos: { x: pos.x, y: pos.y },
      targets: targets,
      parents: parents,
    },
  };
};

export const createCircle = (
  step: number,
  id = 0,
  pos = { x: 250, y: 250 },
  targets = new Array<Players | EnemyObject>(),
  parents = new Array<PossibleParentObject>()
): CircleObject => {
  return {
    ...createAttackObject(id),
    label: "circleAoe",
    type: ObjectType.Circle,
    [step]: {
      rotation: 0,
      radius: 100,
      pos: { x: pos.x, y: pos.y },
      targets: targets,
      parents: parents,
    },
  };
};

export const createAttack = (
  step: number,
  type: ObjectType,
  id = 0,
  pos: { x: 250; y: 250 },
  parents = new Array<PossibleParentObject>(),
  targets = new Array<Players | EnemyObject>()
) => {
  switch (type) {
    case ObjectType.Circle:
      return createCircle(step, id, pos, targets, parents);
    case ObjectType.Cone:
      return createCone(step, id, pos, targets, parents);
    case ObjectType.Rect:
      return createRect(step, id, pos, targets, parents);
  }
};

export const attackKeys = {
  Cone: cone,
  Rect: rect,
  Circle: circle,
};

export type AttackShapes = keyof typeof attackKeys;

export const getAttacks = () => {
  return {
    ...attackKeys,
  };
};
