import { Attacks, SceneObject, isAttack, isConeAoe, isRectangleAoe } from "../types";

interface Point {
    x: number;
    y: number;
}

export const gcd = (a:number, b:number):number => {
    if (!b) {
      return a;
    }
    return gcd(b, a % b);
  }
  
export const lcm = (a:number,b:number) => {
    return ( a*b ) / gcd(a,b);
}

export const calcMiddlePoint = (a:Point, width: number, height: number):Point => {
    return {x: (a.x + a.x + width) / 2, y: (a.y + a.y + height) / 2};
}

export function calculateAngle(A: Point, B: Point, Z: Point): number {
    const sideA = Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2);
    const sideB = Math.sqrt((Z.x - B.x) ** 2 + (Z.y - B.y) ** 2);
    const sideC = Math.sqrt((A.x - Z.x) ** 2 + (A.y - Z.y) ** 2);
  
    const angleRadians = Math.acos(
      (sideB ** 2 + sideC ** 2 - sideA ** 2) / (2 * sideB * sideC)
    );
  
    let angleDegrees = angleRadians * (180 / Math.PI);
  
    // Adjust the angle to cover the full 360 degrees range
    const crossProduct = (A.x - B.x) * (Z.y - B.y) - (A.y - B.y) * (Z.x - B.x);
    if (crossProduct < 0) {
      angleDegrees = 360 - angleDegrees;
    }
  
    return -angleDegrees;
  }
  
export const calcBottomRotPoint = (sceneObj: Attacks): Point => {
    return {x: sceneObj.pos.x + sceneObj.size.x / 2, y: sceneObj.pos.y + sceneObj.size.y};
}

//Point where its drawn and rotated from
export const calcDrawRotForSceneObject = (sceneObj: SceneObject): Point => {
    if(isAttack(sceneObj) && (isConeAoe(sceneObj) || (isRectangleAoe(sceneObj) && sceneObj.rotAtBottom))) {
        return calcBottomRotPoint(sceneObj);
    } 
    return {x: sceneObj.pos.x + sceneObj.size.x / 2, y: sceneObj.pos.y + sceneObj.size.y / 2};
}

export const calcPointForAngle = (angle: number, rotPoint: Point, mouse: Point): Point => {
    const dx = mouse.x - rotPoint.x;
    const dy = mouse.y - rotPoint.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const rad = Math.atan2(dy, dx) + angle;
    return {x: rotPoint.x + dist * Math.cos(rad), y: rotPoint.y + dist * Math.sin(rad)};
}

export const isElementHit = (mouse: Point, sceneObj: SceneObject): boolean => {
    const adjustedMouse = calcPointForAngle(-sceneObj.rotation * Math.PI / 180, sceneObj.drawRotPoint, mouse);
    if(isAttack(sceneObj) && (isConeAoe(sceneObj) || (isRectangleAoe(sceneObj) && sceneObj.rotAtBottom))) {
        return adjustedMouse.x >= sceneObj.drawRotPoint.x - sceneObj.size.x / 2
            && adjustedMouse.x <= sceneObj.drawRotPoint.x + sceneObj.size.x / 2
            && adjustedMouse.y <= sceneObj.drawRotPoint.y
            && adjustedMouse.y >= sceneObj.drawRotPoint.y - sceneObj.size.y;
      }
      
    return adjustedMouse.x >= sceneObj.drawRotPoint.x - sceneObj.size.x / 2
        && adjustedMouse.x <= sceneObj.drawRotPoint.x + sceneObj.size.x / 2
        && adjustedMouse.y >= sceneObj.drawRotPoint.y - sceneObj.size.y / 2 
        && adjustedMouse.y <= sceneObj.drawRotPoint.y + sceneObj.size.y / 2;
}