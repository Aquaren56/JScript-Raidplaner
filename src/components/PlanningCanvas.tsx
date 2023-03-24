import '../styling/header.css';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import getBasePlayerIcons, { pIconKeys } from '../utils/loadIcons';

interface Point {
    x: number;
    y: number;
}

interface Child {
    role: string;
    pos: Point;
}

export default function PlanningCanvas(props: any) {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [children, setChildren] = useState(new Array<Child>())

    const draw = useCallback(() => {
        const canvas = canvasRef.current
        let context: any;
        if(canvas !== null) {
            context = canvas.getContext('2d');
            canvas.width = 500;
            canvas.height = 500;
        }
        if(context) {
            context.fillStyle = 'black';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        }
        children.forEach(child => {
            if(isOfTypePlayer(child.role)) {
                const image = new Image();
                image.src = getBasePlayerIcons(child.role);
                context.drawImage(image, child.pos.x, child.pos.y, 30, 30);
            }
        })
    }, [children]);

    useEffect(() => {
            draw();

    }, [draw])

    function isOfTypePlayer (keyInput: string): keyInput is pIconKeys {
        return ['melee', 'ranged', 'tank', 'healer'].includes(keyInput);
    }


    const dropHandler = (e: React.DragEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        const canvas = canvasRef.current;
        let posData = {x: 0, y: 0};
        if(canvas){
            const offSetClick = e.dataTransfer.getData('pos');
            const offSets = offSetClick.split(' ');
            posData = {x: e.clientX - canvas?.offsetLeft - Number(offSets[0]), y: e.clientY - canvas?.offsetTop - Number(offSets[1])}
        }

        const iconData = e.dataTransfer.getData('role');

        const obj = { role: iconData, pos: posData };

        setChildren([...children, obj])
    }

    const allowDrop = (e: React.DragEvent<HTMLCanvasElement>) => {
        e.preventDefault();
    }

    return (
        <div>
            <canvas ref={canvasRef} {...props} onDrop={dropHandler} onDragOver={allowDrop}/>
        </div>
    )
}