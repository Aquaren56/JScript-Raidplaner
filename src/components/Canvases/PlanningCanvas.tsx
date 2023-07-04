import '../../styling/canvases.css';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { onDrop } from '../../utils/DragnDrop';
import { SceneObject, isAttack, Attacks, Icons } from '../../types';
import { drawAoe } from '../../utils/drawUtils';

interface Point {
    x: number;
    y: number;
}

export default function PlanningCanvas(props: any) {

    const {children, setChildren, selection, setSelection, ...rest} = props;
    
    const [dragging, setDragging] = useState<Point | null>(null);
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
                child.pos.x + child.size.x / 2,
                child.pos.y + child.size.y / 2
              );
              context.rotate((child.rotation * Math.PI) / 180);
              context.translate(
                -(child.pos.x + child.size.x / 2),
                -(child.pos.y + child.size.y / 2)
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
                child.pos.x + child.size.x / 2,
                child.pos.y + child.size.y / 2
              );
              context.rotate((child.rotation * Math.PI) / 180);
              context.translate(
                -(child.pos.x + child.size.x / 2),
                -(child.pos.y + child.size.y / 2)
              );
              context.drawImage(
                image,
                child.pos.x,
                child.pos.y,
                child.size.x,
                child.size.y
              );
              context.restore();
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
            setChildren([...children, newObj]);
        };
    }

    const isElementHit = (click: {x: number, y:number}, child: SceneObject) => {
        if(click.x > child.pos.x && click.x < child.pos.x+child.size.x && click.y > child.pos.y && click.y < child.pos.y+child.size.y) {
            return true
        }
        return false;
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
                    setDragging(offset);
                }
            });
            if(!childHit) {
                setSelection(null);
            }
        }
    }

    const onMouseMove = (e: React.MouseEvent) => {
        if(dragging) {
            const canvas = canvasRef.current;
            if(canvas) {
                const rect = canvas.getBoundingClientRect();
                const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top }
                selection.pos = { x: pos.x + dragging.x, y: pos.y + dragging.y}
                const newChildren = [...children];
                setChildren(newChildren);
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