import '../../styling/canvases.css';

import React, { useRef, useEffect, useCallback } from 'react';
import getBasePlayerIcons, { pIconKeys } from '../../utils/loadIcons';
import IconModel from '../../models/IconModel';

export default function PlanningCanvas(props: any) {

    const {children, setChildren, selection, setSelection, ...rest} = props;

    const canvasRef = useRef<HTMLCanvasElement>(null);

    //const [children, setChildren] = useState(new Array<Child>())

    const draw = useCallback(() => {
        const canvas = canvasRef.current
        let context: any;
        if(canvas !== null) {
            context = canvas.getContext('2d');
            canvas.width = canvas.height = 1000;
            canvas.style.width = canvas.style.height = '500px';
        }
        if(context) {
            context.fillStyle = 'transparent';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        }
        context.scale(2,2)
        children.forEach((child: IconModel) => {
            if(isOfTypePlayer(child.identifier)) {
                const image = new Image();
                image.src = getBasePlayerIcons(child.identifier);
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

        const obj = new IconModel( {name: iconData, pos: posData, size: {x: 30, y: 30}} );

        setChildren([...children, obj]);
        setSelection(obj);
    }

    const allowDrop = (e: React.DragEvent<HTMLCanvasElement>) => {
        e.preventDefault();
    }

    return (
            <canvas className='planning-canvas' ref={canvasRef} {...rest} onDrop={dropHandler} onDragOver={allowDrop}/>
    )
}