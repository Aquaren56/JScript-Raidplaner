import '../../styling/canvases.css';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import IconModel from '../../models/IconModel';
import { onDrop, onDrop2 } from '../../utils/DragnDrop';
import { DragIconType } from '../../utils/DragnDrop';
import { calcMiddlePoint } from '../../utils/maffs';
import { drawRect } from '../../utils/drawUtils';

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
          children.forEach((child: IconModel) => {
            if(child.type === DragIconType.Attack) {
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
              const mid = calcMiddlePoint(child.pos, child.size.x, child.size.y);
              console.log(mid);
              drawRect(context, mid, child.size.x, child.size.y);
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
        
        const dropObj = onDrop(e);
        const result = onDrop2(e);
        if(dropObj && result) {
            const obj = new IconModel( {name: dropObj.name, pos: calcPosOnCanvas(dropObj.offset, e), size: {x: 30, y: 30}, img: dropObj?.src, type: dropObj.type} );
            const newObj = {...result[0], pos: calcPosOnCanvas(result[1], e)};
            console.log(newObj);
            console.log(obj);
            setChildren([...children, obj]);
        };
    }

    const isElementHit = (click: {x: number, y:number}, child: IconModel) => {
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
            children.forEach((child: IconModel, index: number) => {
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