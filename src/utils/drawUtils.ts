import { Attacks, CircleAoe, ConeAoe, Point, RectangleAoe, isCircleAoe, isConeAoe, isRectangleAoe } from '../types';
import { calcMiddlePoint } from './maffs';

export const drawLine = (ctx: CanvasRenderingContext2D, from: Point, to: Point) => {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
}

export const drawCircle = (context: CanvasRenderingContext2D, aoe: CircleAoe) => {
    const mid = calcMiddlePoint(aoe.pos, aoe.size.x, aoe.size.y);
    context.beginPath();
    context.arc(mid.x, mid.y, aoe.size.x/2, 0, 2 * Math.PI);
    context.fillStyle = `rgba(${aoe.color}, ${aoe.alpha})`;
    context.fill();
}

export const drawRect = (context: CanvasRenderingContext2D, rectangleAoe: RectangleAoe) => {
    context.beginPath();
    context.rect(rectangleAoe.pos.x, rectangleAoe.pos.y, rectangleAoe.size.x, rectangleAoe.size.y);
    context.fillStyle = `rgba(${rectangleAoe.color}, ${rectangleAoe.alpha})`;
    context.fill();
}

export const drawCone = (context: CanvasRenderingContext2D, aoe: ConeAoe) => {
    context.beginPath();
    context.moveTo(aoe.pos.x, aoe.pos.y);
    context.lineTo(aoe.height, aoe.angle / 2);
    context.lineTo(aoe.height, -aoe.angle / 2);
    context.closePath();
    context.fillStyle = `rgba(${aoe.color}, ${aoe.alpha})`;
    context.fill();
}

export const drawTriangle = (context: CanvasRenderingContext2D, triangleAoe: ConeAoe) => {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(triangleAoe.height, triangleAoe.angle / 2);
    context.lineTo(triangleAoe.height, -triangleAoe.angle / 2);
    context.closePath();
    context.fillStyle = `rgba(${triangleAoe.color}, ${triangleAoe.alpha})`;
    context.fill();
}

export const drawAoe = (ctx: CanvasRenderingContext2D, aoe: Attacks) => {
    if(isConeAoe(aoe)) {
        if(aoe.shape === 'cone') {
            drawCone(ctx, aoe);
        } else {
            drawTriangle(ctx, aoe);
        }
        
    } else if(isRectangleAoe(aoe)) {
        drawRect(ctx, aoe);
    } else if(isCircleAoe(aoe)) {
        drawCircle(ctx, aoe);
    } else {
    console.error('Invalid aoe type');
    }
}



