import '../../styling/canvases.css';

import React, { useRef, useEffect, useCallback } from 'react';
import IconModel from '../../models/IconModel';
import { onDrop } from '../../utils/DragnDrop';

interface Point {
    x: number;
    y: number;
}

export default function PlanningCanvas(props: any) {

    const {children, setChildren, selection, setSelection, ...rest} = props;

    const canvasRef = useRef<HTMLCanvasElement>(null);

    //const [children, setChildren] = useState(new Array<Child>())

    const draw = useCallback(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d');
        if(canvas !== null) {
            canvas.width = canvas.height = 1000;
            canvas.style.width = canvas.style.height = '500px';
        }
        if(context) {
            context.fillStyle = 'transparent';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            context.scale(2,2)
            if(!children) return;
            children.forEach((child: IconModel) => {
                if(child.img) {
                    context.save();
                    const image = new Image();
                    image.src = child.img;
                    context.translate(child.pos.x + child.size.x/2, child.pos.y + child.size.y/2)
                    context.rotate(child.rotation * Math.PI / 180);
                    context.translate(-(child.pos.x + child.size.x/2), -(child.pos.y + child.size.y/2))
                    context.drawImage(image, child.pos.x, child.pos.y, child.size.x, child.size.y);
                    context.restore();
                }
            })
        }
    }, [children]);

    useEffect(() => {
            draw();
    }, [draw])

    const calcPosOnCanvas = (pos: Point, e: React.DragEvent<HTMLCanvasElement>): Point => {
        const canvas = canvasRef.current;
        if(canvas) {
            const x = e.clientX - canvas.offsetLeft - pos.x;
            const y = e.clientY - canvas.offsetTop - pos.y;
            return {x, y};
        }
        return {x: 0, y: 0};
    }

    const dropHandler = (e: React.DragEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        
        const dropObj = onDrop(e);

        if(dropObj) {
            const obj = new IconModel( {name: dropObj.name, pos: calcPosOnCanvas(dropObj.offset, e), size: {x: 30, y: 30}, img: dropObj?.src} );

            setChildren([...children, obj]);
        };
    }

    const isElementHit = (click: {x: number, y:number}, child: IconModel) => {
        if(click.x > child.pos.x && click.x < child.pos.x+child.size.x && click.y > child.pos.y && click.y < child.pos.y+child.size.y) {
            return true
        }
        return false;
    }

    const onCanvasClicked = (e: MouseEvent) => {
        const canvas = canvasRef.current;
        if(canvas) {
            let childHit = false;
            const pos = { x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop }
            children.forEach((child: IconModel, index: number) => {
                if(isElementHit(pos, child)) {
                    childHit = true;
                    setSelection(index);
                }
            });
            if(!childHit) {
                setSelection(-1);
            }
        }
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
            />
    )
}