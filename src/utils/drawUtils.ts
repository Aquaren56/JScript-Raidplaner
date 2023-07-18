import {
  CircleAoe,
  ConeAoe,
  Point,
  RectangleAoe,
  isCircleAoe,
  isConeAoe,
  isRectangleAoe,
  Attack,
  AnObject,
  EnemyObject,
  isPlayers,
  Players,
  isEnemys,
  isToppings,
  ToppingObject,
  isWaymarks,
  WaymarkObject,
  isCircle,
  isRectangle,
  isCone,
  CircleObject,
  RectangleObject,
  ConeObject,
  Attacc,
  baseObject,
  isDpss,
  isHealers,
  isTanks,
} from "../types";
import { rotateCanvas } from "./utils";
import { calcDistance, calculateAngle } from "./maffs";

export const drawCircle = (
  context: CanvasRenderingContext2D,
  aoe: CircleAoe
) => {
  context.beginPath();
  context.arc(
    aoe.drawRotPoint.x,
    aoe.drawRotPoint.y,
    aoe.size.x / 2,
    0,
    2 * Math.PI
  );
  context.fillStyle = `rgba(${aoe.color}, ${aoe.alpha})`;
  context.fill();
};

export const drawRect = (
  context: CanvasRenderingContext2D,
  aoe: RectangleAoe
) => {
  if (aoe.rotAtBottom) {
    context.beginPath();
    context.rect(
      aoe.drawRotPoint.x - aoe.size.x / 2,
      aoe.drawRotPoint.y - aoe.size.y,
      aoe.size.x,
      aoe.size.y
    );
    context.fillStyle = `rgba(${aoe.color}, ${aoe.alpha})`;
    context.fill();
  } else {
    context.beginPath();
    context.rect(
      aoe.drawRotPoint.x - aoe.size.x / 2,
      aoe.drawRotPoint.y - aoe.size.y / 2,
      aoe.size.x,
      aoe.size.y
    );
    context.fillStyle = `rgba(${aoe.color}, ${aoe.alpha})`;
    context.fill();
  }
};

export const drawCone = (context: CanvasRenderingContext2D, aoe: ConeAoe) => {
  const angle = (aoe.angle * Math.PI) / 180;
  const start = (-90 * Math.PI) / 180;
  const radius = Math.sqrt(
    Math.pow(aoe.size.x / 2, 2) + Math.pow(aoe.size.y, 2)
  );

  context.beginPath();
  context.arc(
    aoe.drawRotPoint.x,
    aoe.drawRotPoint.y,
    radius,
    -angle / 2 + start,
    angle / 2 + start
  );
  context.lineTo(aoe.drawRotPoint.x, aoe.drawRotPoint.y);
  context.closePath();

  context.fillStyle = `rgba(${aoe.color}, ${aoe.alpha})`;
  context.fill();
};

export const drawTriangle = (
  context: CanvasRenderingContext2D,
  aoe: ConeAoe
) => {
  context.beginPath();
  context.moveTo(aoe.drawRotPoint.x, aoe.drawRotPoint.y);
  context.lineTo(
    aoe.drawRotPoint.x - aoe.size.x / 2,
    aoe.drawRotPoint.y - aoe.size.y
  );
  context.lineTo(
    aoe.drawRotPoint.x + aoe.size.x / 2,
    aoe.drawRotPoint.y - aoe.size.y
  );
  context.closePath();
  context.fillStyle = `rgba(${aoe.color}, ${aoe.alpha})`;
  context.fill();
};

export const drawAoe = (ctx: CanvasRenderingContext2D, aoe: Attack) => {
  if (isConeAoe(aoe)) {
    if (aoe.shape === "cone") {
      drawCone(ctx, aoe);
    } else {
      drawTriangle(ctx, aoe);
    }
  } else if (isRectangleAoe(aoe)) {
    drawRect(ctx, aoe);
  } else if (isCircleAoe(aoe)) {
    drawCircle(ctx, aoe);
  } else {
    console.error("Invalid aoe type");
  }
};

export const drawAttackAtParent = (
  ctx: CanvasRenderingContext2D,
  parent: Point,
  aoe: Attack
) => {
  const savePoint = aoe.drawRotPoint;
  aoe.drawRotPoint = parent;
  drawAoe(ctx, aoe);
  aoe.drawRotPoint = savePoint;
};

export const drawAnObject = (
  ctx: CanvasRenderingContext2D,
  obj: AnObject,
  step: number,
  allElements: AnObject[]
) => {
  if (isPlayers(obj) || isEnemys(obj)) {
    drawIcon(ctx, obj, step);
  } else if (isToppings(obj)) {
    drawTopping(ctx, obj, step);
  } else if (isWaymarks(obj)) {
    drawWaymark(ctx, obj);
  } else if (isCircle(obj)) {
    drawCircles(ctx, obj, step, allElements);
  } else if (isRectangle(obj)) {
    drawRects(ctx, obj, step, allElements);
  } else if (isCone(obj)) {
    drawCones(ctx, obj, step, allElements);
  }
};

export const drawIcon = (
  ctx: CanvasRenderingContext2D,
  obj: Players | EnemyObject,
  step: number
) => {
  ctx.save();
  ctx.scale(2, 2);
  rotateCanvas(ctx, obj[step].rotation, obj[step].pos);
  const img = new Image();
  img.src = obj.img;
  ctx.drawImage(
    img,
    obj[step].pos.x - obj[step].size.x / 2,
    obj[step].pos.y - obj[step].size.y / 2,
    obj[step].size.x,
    obj[step].size.y
  );
  ctx.restore();
};

export const drawTopping = (
  ctx: CanvasRenderingContext2D,
  obj: ToppingObject,
  step: number
) => {
  ctx.save();
  ctx.scale(2, 2);
  const img = new Image();
  img.src = obj.img;
  if (obj[step].parents.length > 0) {
    obj[step].parents.forEach((parent) => {
      ctx.drawImage(
        img,
        parent[step].pos.x - obj.size.x / 2 - obj.offset.x,
        parent[step].pos.y - obj.size.y / 2 - obj.offset.y,
        obj.size.x,
        obj.size.y
      );
    });
  } else {
    ctx.drawImage(
      img,
      obj[step].pos.x - obj.size.x / 2,
      obj[step].pos.y - obj.size.y / 2,
      obj.size.x,
      obj.size.y
    );
  }
  ctx.restore();
};

export const drawWaymark = (
  ctx: CanvasRenderingContext2D,
  obj: WaymarkObject
) => {
  ctx.save();
  ctx.scale(2, 2);
  const img = new Image();
  img.src = obj.img;
  ctx.drawImage(
    img,
    obj.pos.x - obj.size.x / 2,
    obj.pos.y - obj.size.y / 2,
    obj.size.x,
    obj.size.y
  );
  ctx.restore();
};

export const drawCircles = (
  ctx: CanvasRenderingContext2D,
  obj: CircleObject,
  step: number,
  allElements: AnObject[]
) => {
  ctx.save();
  ctx.scale(2, 2);
  if (obj[step].parents.length > 0) {
    obj[step].parents.forEach((parent, index) => {
      if (obj[step].targets.length > 0) {
        const targetObjects = getTargets(obj, index, allElements, step);
        targetObjects.forEach((targetGroup) => {
          targetGroup.forEach((target) => {
            ctx.beginPath();
            ctx.arc(
              target[step].pos.x,
              target[step].pos.y,
              obj[step].radius,
              0,
              2 * Math.PI
            );
            ctx.fillStyle = `rgba(${obj.color}, ${obj.alpha})`;
            ctx.fill();
          });
        });
      } else {
        ctx.beginPath();
        ctx.arc(
          parent[step].pos.x,
          parent[step].pos.y,
          obj[step].radius,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = `rgba(${obj.color}, ${obj.alpha})`;
        ctx.fill();
      }
    });
  } else {
    ctx.beginPath();
    ctx.arc(obj[step].pos.x, obj[step].pos.y, obj[step].radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(${obj.color}, ${obj.alpha})`;
    ctx.fill();
  }
  ctx.restore();
};

export const drawRects = (
  ctx: CanvasRenderingContext2D,
  obj: RectangleObject,
  step: number,
  allElements: AnObject[]
) => {
  if (obj[step].parents.length > 0) {
    obj[step].parents.forEach((parent, index) => {
      if (obj[step].targets.length > 0) {
        const targetObjects = getTargets(obj, index, allElements, step);
        targetObjects.forEach((targetGroup) => {
          targetGroup.forEach((target) => {
            ctx.save();
            ctx.scale(2, 2);
            const angle = calculateAngle(parent[step].pos, target[step].pos, {
              x: parent[step].pos.x,
              y: parent[step].pos.y + 1,
            });
            rotateCanvas(ctx, angle, parent[step].pos);
            drawRectFunc(ctx, obj, step, parent[step].pos);
            ctx.restore();
          });
        });
      } else {
        ctx.save();
        ctx.scale(2, 2);
        rotateCanvas(
          ctx,
          obj[step].rotation + parent[step].rotation,
          obj[step].pos
        );
        drawRectFunc(ctx, obj, step, parent[step].pos);
        ctx.restore();
      }
    });
  } else {
    ctx.save();
    ctx.scale(2, 2);
    rotateCanvas(ctx, obj[step].rotation, obj[step].pos);
    drawRectFunc(ctx, obj, step, obj[step].pos);
    ctx.restore();
  }
};

const drawRectFunc = (
  ctx: CanvasRenderingContext2D,
  obj: RectangleObject,
  step: number,
  drawPos: Point
) => {
  if (obj.rotAt === "middle") {
    ctx.beginPath();
    ctx.rect(
      drawPos.x - obj[step].size.x / 2,
      drawPos.y - obj[step].size.y / 2,
      obj[step].size.x,
      obj[step].size.y
    );
    ctx.fillStyle = `rgba(${obj.color}, ${obj.alpha})`;
    ctx.fill();
  } else if (obj.rotAt === "bottom") {
    ctx.beginPath();
    ctx.rect(
      drawPos.x - obj[step].size.x / 2,
      drawPos.y - obj[step].size.y,
      obj[step].size.x,
      obj[step].size.y
    );
    ctx.fillStyle = `rgba(${obj.color}, ${obj.alpha})`;
    ctx.fill();
  }
};

export const drawCones = (
  ctx: CanvasRenderingContext2D,
  obj: ConeObject,
  step: number,
  allElements: AnObject[]
) => {
  if (obj[step].parents.length > 0) {
    obj[step].parents.forEach((parent, index) => {
      if (obj[step].targets.length > 0) {
        const targetObjects = getTargets(obj, index, allElements, step);
        targetObjects.forEach((targetGroup) => {
          targetGroup.forEach((target) => {
            ctx.save();
            ctx.scale(2, 2);
            const angle = calculateAngle(parent[step].pos, target[step].pos, {
              x: parent[step].pos.x,
              y: parent[step].pos.y + 1,
            });
            rotateCanvas(ctx, angle, parent[step].pos);
            drawConeFunc(ctx, obj, step, parent[step].pos);
            ctx.restore();
          });
        });
      } else {
        ctx.save();
        ctx.scale(2, 2);
        rotateCanvas(
          ctx,
          obj[step].rotation + parent[step].rotation,
          obj[step].pos
        );
        drawConeFunc(ctx, obj, step, parent[step].pos);
        ctx.restore();
      }
    });
  } else {
    ctx.save();
    ctx.scale(2, 2);
    rotateCanvas(ctx, obj[step].rotation, obj[step].pos);
    drawConeFunc(ctx, obj, step, obj[step].pos);
    ctx.restore();
  }
};

const drawConeFunc = (
  ctx: CanvasRenderingContext2D,
  obj: ConeObject,
  step: number,
  drawPos: Point
) => {
  const angle = (obj.angle * Math.PI) / 180;
  const start = (-90 * Math.PI) / 180;

  ctx.beginPath();
  ctx.arc(
    drawPos.x,
    drawPos.y,
    obj[step].radius,
    -angle / 2 + start,
    angle / 2 + start
  );
  ctx.lineTo(drawPos.x, drawPos.y);
  ctx.closePath();
  ctx.fillStyle = `rgba(${obj.color}, ${obj.alpha})`;
  ctx.fill();
};

const getPlayersByDistance = (
  players: Players[],
  point: Point,
  step: number
) => {
  return players.sort((a: Players, b: Players) => {
    const aDist = calcDistance(a[step].pos, point);
    const bDist = calcDistance(b[step].pos, point);
    if (aDist === 0) {
      return Infinity;
    }
    if (bDist === 0) {
      return -Infinity;
    }
    return aDist - bDist;
  });
};

const getPlayer = (objects: AnObject[]): Players[] => {
  return objects.filter((element: AnObject) => {
    return isPlayers(element);
  }) as Players[];
};

const getTargets = (
  attack: Attacc,
  parent: number,
  allElements: AnObject[],
  step: number
): Players[][] => {
  const players = getPlayer(allElements as AnObject[]);
  const playerByDist = getPlayersByDistance(
    players,
    attack[step].parents[parent][step].pos,
    step
  );
  if (!attack[step].targets) return [];
  return attack[step].targets.map((tar: number | string | baseObject) => {
    if (typeof tar === "number") {
      return [playerByDist[tar - 1]];
    } else {
      switch (tar) {
        case "dps": {
          return players.filter((player: Players) => {
            return isDpss(player);
          });
        }
        case "healer": {
          return players.filter((player: Players) => {
            return isHealers(player);
          });
        }
        case "tank": {
          return players.filter((player: Players) => {
            return isTanks(player);
          });
        }
        case "support": {
          return players.filter((player: Players) => {
            return isTanks(player) || isHealers(player);
          });
        }
        default: {
          return [];
        }
      }
    }
  });
};
