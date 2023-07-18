import "../../styling/canvases.css";

import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  useContext,
} from "react";
import { onDrop, onDrop2 } from "../../utils/DragnDrop";
import {
  SceneObject,
  isAttack,
  Attack,
  isObjects,
  Objects,
  Topping,
  isTopping,
  isNonObject,
  isCircleAoe,
  Player,
  isPlayer,
  AnObject,
  isWaymarks,
} from "../../types";
import {
  drawAoe,
  drawAttackAtParent,
  drawAnObject,
} from "../../utils/drawUtils";
import {
  calcDrawRotForSceneObject,
  isElementHit,
  isStepItemHit,
  calculateAngle,
  reverseOrderChildren,
  calcDistance,
} from "../../utils/maffs";
import { rotateCanvas, createAnObject } from "../../utils/utils";
import { useCounter } from "../../IdProvider";
import { StepContext } from "../../App";

interface Point {
  x: number;
  y: number;
}

export default function PlanningCanvas(props: any) {
  const { counter, incrementCounter } = useCounter();
  const currentStep = useContext(StepContext);

  const {
    children,
    setChildren,
    selection,
    setSelection,
    allElements,
    setAllElements,
    selectedElement,
    setSelectedElement,
    ...rest
  } = props;

  const [dragging2, setDragging2] = useState<Point | null>(null);
  const [dragging, setDragging] = useState<Point | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stepItems = allElements.filter((element: AnObject) => {
    return element[currentStep] !== undefined || isWaymarks(element);
  });

  const getPlayersByDistance = useCallback(
    (players: Player[], point: Point) => {
      return players.sort((a: Player, b: Player) => {
        const aDist = calcDistance(a.drawRotPoint, point);
        const bDist = calcDistance(b.drawRotPoint, point);
        if (aDist === 0) {
          return Infinity;
        }
        if (bDist === 0) {
          return -Infinity;
        }
        return aDist - bDist;
      });
    },
    []
  );

  const getPlayer = (objects: SceneObject[]): Player[] => {
    return objects.filter((element: SceneObject) => {
      return isPlayer(element);
    }) as Player[];
  };

  const getTargetAngles = useCallback(
    (attack: Attack, indexMain: number) => {
      const players = getPlayer(children as SceneObject[]);
      const playerByDist = getPlayersByDistance(
        players,
        attack.parents[indexMain].drawRotPoint
      );
      if (attack.target === null) return [];
      return attack.target.map((tar: number | string) => {
        if (typeof tar === "number") {
          return [playerByDist[tar - 1]];
        } else {
          switch (tar) {
            case "dps": {
              return players.filter((player: Player) => {
                return player.role === "dps";
              });
            }
            case "healer": {
              return players.filter((player: Player) => {
                return player.role === "healer";
              });
            }
            case "tank": {
              return players.filter((player: Player) => {
                return player.role === "tank";
              });
            }
            case "support": {
              return players.filter((player: Player) => {
                return player.role === "tank" || player.role === "healer";
              });
            }
            default: {
              return [];
            }
          }
        }
      });
    },
    [children, getPlayersByDistance]
  );

  const drawAttack = useCallback(
    (context: CanvasRenderingContext2D, attack: Attack) => {
      if (attack.parents.length > 0) {
        attack.parents.forEach((parent: Objects, index) => {
          if (attack.target.length > 0) {
            const targetAngles = getTargetAngles(attack, index);
            if (targetAngles) {
              targetAngles.forEach((angles: Player[]) => {
                angles.forEach((player: Player) => {
                  context.save();
                  context.scale(2, 2);
                  if (isCircleAoe(attack)) {
                    drawAttackAtParent(context, player.drawRotPoint, attack);
                  } else {
                    const angle = calculateAngle(
                      attack.parents[index].drawRotPoint,
                      player.drawRotPoint,
                      {
                        x: attack.parents[index].drawRotPoint.x,
                        y: attack.parents[index].drawRotPoint.y + 1,
                      }
                    );
                    rotateCanvas(context, angle, parent.drawRotPoint);
                    drawAttackAtParent(context, parent.drawRotPoint, attack);
                  }
                  context.restore();
                });
              });
            }
          } else {
            context.save();
            context.scale(2, 2);
            rotateCanvas(
              context,
              attack.rotation + parent.rotation,
              parent.drawRotPoint
            );
            drawAttackAtParent(context, parent.drawRotPoint, attack);
            context.restore();
          }
        });
      } else {
        context.save();
        context.scale(2, 2);
        rotateCanvas(context, attack.rotation, attack.drawRotPoint);
        drawAoe(context, attack);
        context.restore();
      }
    },
    [getTargetAngles]
  );

  const drawTopping = useCallback(
    (context: CanvasRenderingContext2D, topping: Topping) => {
      if (topping.parents.length > 0) {
        topping.parents.forEach((parent: Objects) => {
          context.save();
          context.scale(2, 2);
          rotateCanvas(context, parent.rotation, parent.drawRotPoint);
          const image = new Image();
          image.src = topping.img;
          context.drawImage(
            image,
            parent.drawRotPoint.x - topping.size.x / 2,
            parent.drawRotPoint.y - parent.size.y - topping.drawOffset.y - 10,
            topping.size.x,
            topping.size.y
          );
          context.restore();
        });
      } else {
        context.save();
        context.scale(2, 2);
        const image = new Image();
        image.src = topping.img;
        context.drawImage(
          image,
          topping.drawRotPoint.x - topping.size.x / 2,
          topping.drawRotPoint.y - topping.size.y / 2,
          topping.size.x,
          topping.size.y
        );
        context.restore();
      }
    },
    []
  );

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && context) {
      canvas.width = canvas.height = 1000;
      canvas.style.width = canvas.style.height = "500px";
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (!children) return;
      const drawOrder = reverseOrderChildren(children);
      drawOrder.forEach((child: SceneObject) => {
        if (isAttack(child)) {
          drawAttack(context, child);
        } else if (isTopping(child)) {
          drawTopping(context, child);
        } else {
          if (isObjects(child)) {
            context.save();
            context.scale(2, 2);
            const image = new Image();
            image.src = child.img;
            rotateCanvas(context, child.rotation, child.drawRotPoint);
            context.drawImage(
              image,
              child.drawRotPoint.x - child.size.x / 2,
              child.drawRotPoint.y - child.size.y / 2,
              child.size.x,
              child.size.y
            );
            context.restore();
          }
        }
      });
    }
  }, [children, drawAttack, drawTopping]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = canvas.height = 1000;
        canvas.style.width = canvas.style.height = "500px";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stepItems.forEach((item: AnObject) => {
          drawAnObject(ctx, item, currentStep, stepItems);
        });
      }
    }
  }, [currentStep, stepItems]);

  const calcPosOnCanvas = (
    offset: Point,
    e: React.MouseEvent | React.DragEvent<HTMLCanvasElement>
  ): Point => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left - offset.x);
      const y = Math.round(e.clientY - rect.top - offset.y);
      return { x, y };
    }
    return { x: 0, y: 0 };
  };

  const dropHandler = (e: React.DragEvent<HTMLCanvasElement>) => {
    e.preventDefault();

    const result = onDrop(e);
    const data = onDrop2(e);
    if (result && data) {
      const newObj = { ...result[0] };
      const topLeft = calcPosOnCanvas(result[1], e);
      const betterObj = createAnObject(data, currentStep, counter, topLeft);
      newObj.drawRotPoint = calcDrawRotForSceneObject(newObj, topLeft);
      newObj.id = counter;
      incrementCounter();
      setAllElements([...allElements, betterObj]);
      setChildren([...children, newObj]);
    }
  };

  const onCanvasClicked = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (canvas) {
      let childHit = false;
      const rect = canvas.getBoundingClientRect();
      const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      children.forEach((child: SceneObject) => {
        if (isNonObject(child) && child.parents.length > 0) return;
        if (isElementHit(pos, child)) {
          childHit = true;
          setSelection(child);
          const offset2 = {
            x: child.drawRotPoint.x - e.clientX + rect.left,
            y: child.drawRotPoint.y - e.clientY + rect.top,
          };
          setDragging2(offset2);
        }
      });
      if (!childHit) {
        setSelection(null);
      }
      let childHit2 = false;
      stepItems.forEach((item: AnObject) => {
        let offset;
        if (isStepItemHit(pos, item, currentStep)) {
          setSelectedElement(item);
          if (isWaymarks(item)) {
            offset = {
              x: item.pos.x - e.clientX + rect.left,
              y: item.pos.y - e.clientY + rect.top,
            };
          } else {
            offset = {
              x: item[currentStep].pos.x - e.clientX + rect.left,
              y: item[currentStep].pos.y - e.clientY + rect.top,
            };
          }
          setDragging(offset);
          childHit2 = true;
        }
      });
      if (!childHit2) {
        setSelectedElement(null);
      }
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (dragging2) {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        selection.drawRotPoint = {
          x: pos.x + dragging2.x,
          y: pos.y + dragging2.y,
        };
        const newChildren = [...children];
        setChildren(newChildren);
      }
    }

    if (dragging) {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        if (isWaymarks(selectedElement)) {
          selectedElement.pos = {
            x: pos.x + dragging.x,
            y: pos.y + dragging.y,
          };
        } else {
          selectedElement[currentStep].pos = {
            x: pos.x + dragging.x,
            y: pos.y + dragging.y,
          };
        }
        const newElements = [...allElements];
        setAllElements(newElements);
      }
    }

    const canvas = canvasRef.current;

    if (canvas) {
      /*
      let childHit = false;
      const rect = canvas.getBoundingClientRect();
      const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      children.forEach((child: SceneObject) => {
        if (isNonObject(child) && child.parents.length > 0) return;
        if (isElementHit(pos, child)) {
          document.body.style.cursor = "crosshair";
          childHit = true;
        }
      });
      if (!childHit) {
        document.body.style.cursor = "default";
      }
      */

      let childHit = false;
      const rect = canvas.getBoundingClientRect();
      const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      stepItems.forEach((item: AnObject) => {
        if (isStepItemHit(pos, item, currentStep)) {
          document.body.style.cursor = "crosshair";
          childHit = true;
        }
      });
      if (!childHit) {
        document.body.style.cursor = "default";
      }
    }
  };

  const onMouseUp = (e: React.MouseEvent) => {
    setDragging2(null);
    setDragging(null);
  };

  const allowDrop = (e: React.DragEvent<HTMLCanvasElement>) => {
    e.preventDefault();
  };

  return (
    <canvas
      className="planning-canvas"
      ref={canvasRef}
      {...rest}
      onDrop={dropHandler}
      onDragOver={allowDrop}
      onMouseDown={onCanvasClicked}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    />
  );
}
