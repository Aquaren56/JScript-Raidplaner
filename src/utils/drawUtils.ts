import { CircleAoe, ConeAoe, Point, RectangleAoe, isCircleAoe, isConeAoe, isRectangleAoe, Attack } from '../types';

export const drawCircle = (context: CanvasRenderingContext2D, aoe: CircleAoe) => {
    context.beginPath();
    context.arc(aoe.drawRotPoint.x, aoe.drawRotPoint.y, aoe.size.x/2, 0, 2 * Math.PI);
    context.fillStyle = `rgba(${aoe.color}, ${aoe.alpha})`;
    context.fill();
}

export const drawRect = (context: CanvasRenderingContext2D, aoe: RectangleAoe) => {
    if(aoe.rotAtBottom) {
        context.beginPath();
        context.rect(aoe.drawRotPoint.x - aoe.size.x/2, aoe.drawRotPoint.y - aoe.size.y, aoe.size.x, aoe.size.y);
        context.fillStyle = `rgba(${aoe.color}, ${aoe.alpha})`;
        context.fill();
    } else {
        context.beginPath();
        context.rect(aoe.drawRotPoint.x - aoe.size.x/2, aoe.drawRotPoint.y - aoe.size.y/2, aoe.size.x, aoe.size.y);
        context.fillStyle = `rgba(${aoe.color}, ${aoe.alpha})`;
        context.fill();
    }
}

export const drawCone = (context: CanvasRenderingContext2D, aoe: ConeAoe) => {
    const angle = aoe.angle * Math.PI / 180;
    const start = -90 * Math.PI / 180;
    const radius = Math.sqrt(Math.pow(aoe.size.x/2, 2) + Math.pow(aoe.size.y, 2));
    
    context.beginPath();
    context.arc(aoe.drawRotPoint.x, aoe.drawRotPoint.y, radius, -angle/2+start, angle/2+start);
    context.lineTo(aoe.drawRotPoint.x, aoe.drawRotPoint.y);
    context.closePath();

    context.fillStyle = `rgba(${aoe.color}, ${aoe.alpha})`;
    context.fill();
}

export const drawTriangle = (context: CanvasRenderingContext2D, aoe: ConeAoe) => {
    context.beginPath();
    context.moveTo(aoe.drawRotPoint.x, aoe.drawRotPoint.y);
    context.lineTo(aoe.drawRotPoint.x - aoe.size.x/2, aoe.drawRotPoint.y - aoe.size.y);
    context.lineTo(aoe.drawRotPoint.x + aoe.size.x/2, aoe.drawRotPoint.y - aoe.size.y);
    context.closePath();
    context.fillStyle = `rgba(${aoe.color}, ${aoe.alpha})`;
    context.fill();
}

export const drawAoe = (ctx: CanvasRenderingContext2D, aoe: Attack) => {
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

export const drawAttackAtParent = (ctx: CanvasRenderingContext2D, parent: Point, aoe: Attack) => {
    const savePoint = aoe.drawRotPoint;
    aoe.drawRotPoint = parent;
    drawAoe(ctx, aoe);
    aoe.drawRotPoint = savePoint;
}

