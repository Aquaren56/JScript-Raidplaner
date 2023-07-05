import '../../styling/canvases.css';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { onDrop } from '../../utils/DragnDrop';
import { SceneObject, isAttack, Attacks, Icons, isObjects, isTopping } from '../../types';
import { drawAoe } from '../../utils/drawUtils';
import { calcDrawRotForSceneObject, isElementHit } from '../../utils/maffs';

interface Point {
    x: number;
    y: number;
}

export default function PlanningCanvas(props: any) {

    const {children, setChildren, selection, setSelection, ...rest} = props;
    
    const [dragging, setDragging] = useState<Point | null>(null);
    const [dragging2, setDragging2] = useState<Point | null>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (canvas && context) {
          canvas.width = canvas.height = 1000;
          canvas.style.width = canvas.style.height = '500px';
          context.fillStyle = 'transparent';
          context.fillRect(0, 0, context.canvas.width, context.canvas.height);
          if (!children) return;
          children.forEach((child: Attacks | Icons) => {
            if(isAttack(child)) {
              context.save();
              context.scale(2,2);
              context.translate(
                child.drawRotPoint.x,
                child.drawRotPoint.y
              );
              context.rotate((child.rotation * Math.PI) / 180);
              context.translate(
                -(child.drawRotPoint.x),
                -(child.drawRotPoint.y)
              );
              drawAoe(context, child);
              context.restore();

            } else {
            if (child.img) {
              context.save();
              context.scale(2,2)
              const image = new Image();
              image.src = child.img;
              
                context.translate(
                child.drawRotPoint.x,
                child.drawRotPoint.y
              );
              context.rotate((child.rotation * Math.PI) / 180);
              context.translate(
                -(child.drawRotPoint.x),
                -(child.drawRotPoint.y)
              );
              context.drawImage(
                image,
                child.drawRotPoint.x - child.size.x / 2,
                child.drawRotPoint.y - child.size.y / 2,
                child.size.x,
                child.size.y
              );
              context.restore();
              
            }
            if(isObjects(child)) {
              child.children.forEach((dwarf: SceneObject) => {
                if(isAttack(dwarf)) {
                  context.save();
                  context.scale(2,2);
                  context.translate(
                    dwarf.drawRotPoint.x,
                    dwarf.drawRotPoint.y
                  );
                  context.rotate((child.rotation * Math.PI) / 180);
                  context.translate(
                    -(dwarf.drawRotPoint.x),
                    -(dwarf.drawRotPoint.y)
                  );
                  drawAoe(context, dwarf);
                  context.restore();
                } else {
                  if (dwarf.img) {
                    context.save();
                    context.scale(2,2)
                    const image = new Image();
                    image.src = dwarf.img;
                    
                      context.translate(
                      child.drawRotPoint.x,
                      child.drawRotPoint.y
                    );
                    context.rotate((child.rotation * Math.PI) / 180);
                    context.translate(
                      -(child.drawRotPoint.x),
                      -(child.drawRotPoint.y)
                    );
                    context.drawImage(
                      image,
                      dwarf.drawRotPoint.x - dwarf.size.x / 2,
                      dwarf.drawRotPoint.y - dwarf.size.y / 2,
                      dwarf.size.x,
                      dwarf.size.y
                    );
                    context.restore();
                  }
                }
              })
            }
          }});
        }
      }, [children]);
      

    useEffect(() => {
            draw();
    }, [draw])

    const calcPosOnCanvas = (pos: Point, e: React.MouseEvent | React.DragEvent<HTMLCanvasElement>): Point => {
        const canvas = canvasRef.current;
        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          const x = Math.round(e.clientX - rect.left - pos.x);
          const y = Math.round(e.clientY - rect.top - pos.y);
          return { x, y };
        }
        return { x: 0, y: 0 };
      };

    const dropHandler = (e: React.DragEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        
        const result = onDrop(e);
        if(result) {
            const newObj = {...result[0], pos: calcPosOnCanvas(result[1], e)};
            newObj.drawRotPoint = calcDrawRotForSceneObject(newObj);
            setChildren([...children, newObj]);
        };
    }

    const onCanvasClicked = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if(canvas) {
            let childHit = false;
            const rect = canvas.getBoundingClientRect();
            const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top }
            children.forEach((child: SceneObject, index: number) => {
                if(isElementHit(pos, child)) {
                    childHit = true;
                    setSelection(child);
                    const offset = { x: child.pos.x - e.clientX + rect.left, y: child.pos.y - e.clientY + rect.top }
                    const offset2 = { x: child.drawRotPoint.x - e.clientX + rect.left, y: child.drawRotPoint.y - e.clientY + rect.top }
                    setDragging(offset);
                    setDragging2(offset2);
                }
            });
            if(!childHit) {
                setSelection(null);
            }
        }
    }

    const onMouseMove = (e: React.MouseEvent) => {
        if(dragging && dragging2) {
            const canvas = canvasRef.current;
            if(canvas) {
                const rect = canvas.getBoundingClientRect();
                const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top }
                selection.pos = { x: pos.x + dragging.x, y: pos.y + dragging.y}
                selection.drawRotPoint = { x: pos.x + dragging2.x, y: pos.y + dragging2.y};
                if(isObjects(selection)) {
                  selection.children.forEach((dwarf: SceneObject) => {
                    if(isTopping(dwarf)) {
                      dwarf.pos = { x: selection.pos.x, y: selection.pos.y - selection.size.y - dwarf.drawOffset.y}
                      dwarf.drawRotPoint = { x: pos.x + dragging2.x, y: pos.y + dragging2.y - selection.size.y - dwarf.drawOffset.y};
                    }
                  })
                }
                const newChildren = [...children];
                setChildren(newChildren);
            }
        }
        const canvas = canvasRef.current;

        if(canvas) {
          let childHit = false;
          const rect = canvas.getBoundingClientRect();
          const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top }
          children.forEach((child: SceneObject, index: number) => {
            if(isElementHit(pos, child)) {
              document.body.style.cursor = 'crosshair';
              childHit = true;
            } 
          });
          if(!childHit) {
            document.body.style.cursor = 'default';
          }
        }
    }

    const onMouseUp = (e: React.MouseEvent) => {
        setDragging(null);
    }

    const allowDrop = (e: React.DragEvent<HTMLCanvasElement>) => {
        e.preventDefault();
    }

    return (
            <canvas 
                className='planning-canvas' 
                ref={canvasRef} 
                {...rest} 
                onDrop={dropHandler} 
                onDragOver={allowDrop}
                onMouseDown={onCanvasClicked}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
            />
    )
}