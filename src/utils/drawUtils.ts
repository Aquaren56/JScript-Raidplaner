interface Point {
    x: number;
    y: number;
}

export const drawLine = (ctx: CanvasRenderingContext2D, from: Point, to: Point) => {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
}

export const drawCircle = (ctx: CanvasRenderingContext2D, center: Point, radius: number) => {
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.fill();
}

export const drawRect = (ctx: CanvasRenderingContext2D, center: Point, width: number, height: number) => {
    const alphaValue = 0.5;
    ctx.fillStyle = `rgba(255, 0, 0, ${alphaValue})`;
    ctx.beginPath();
    ctx.rect(center.x - width / 2, center.y - height / 2, width, height);
    ctx.fill();
}



