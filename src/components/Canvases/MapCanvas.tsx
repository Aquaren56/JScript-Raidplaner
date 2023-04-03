import '../../styling/canvases.css';

import { useRef, useCallback, useEffect } from "react";

export default function MapCanvas(props: any) {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { map, setMap, ...rest } = props

    const draw = useCallback(() => {
        const canvas = canvasRef.current
        let context: any;
        if(canvas !== null) {
            context = canvas.getContext('2d');
            canvas.width = canvas.height = 1000;
            canvas.style.width = canvas.style.height = '500px';
        }
        if(context && canvas) {
            context.fillStyle = "rgb(102, 102, 102)";
            if(map.square) {
                context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            } else {
                context.beginPath();
                context.arc(canvas.width/2, canvas.height/2, 500, 0, 2 * Math.PI);
                context.fill();
            }

            if(map.square) {
                for(let i = 0; i <= map.coloumns; i++) {
                    context.beginPath();
                    context.moveTo(i*(canvas.width/map.coloumns), 0);
                    context.lineTo(i*(canvas.width/map.coloumns), canvas.height);
                    context.strokeStyle = '#d7d7d7';
                    context.stroke();
                }
    
                for(let i = 0; i <= map.rows; i++) {
                    context.beginPath();
                    context.moveTo(0, i*(canvas.height/map.rows));
                    context.lineTo(canvas.width, i*(canvas.height/map.rows));
                    context.strokeStyle = '#d7d7d7';
                    context.stroke();
                }
            } else {
                for(let i = 0; i <= map.coloumns; i++) {
                    let a,b,c;
                    c = 500;
                    b = i*(canvas.width/map.coloumns) - 500;
                    a = Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2));
                    context.beginPath();
                    context.moveTo(i*(canvas.width/map.coloumns), 500 - a);
                    context.lineTo(i*(canvas.width/map.coloumns), 1000 - (500 - a));
                    context.strokeStyle = '#d7d7d7';
                    context.stroke();
                }

                for(let i = 0; i <= map.rows; i++) {
                    let a,b,c;
                    c = 500;
                    b = i*(canvas.width/map.coloumns) - 500;
                    a = Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2));
                    context.beginPath();
                    context.moveTo(500 - a, i*(canvas.height/map.rows));
                    context.lineTo(1000 - (500 - a), i*(canvas.height/map.rows));
                    context.strokeStyle = '#d7d7d7';
                    context.stroke();
                }
            }

            for(let i = 0; i <= map.radials; i++) {
                context.beginPath();
                context.arc(canvas.width/2, canvas.height/2, 500 - (i * (500/map.radials)), 0, 2 * Math.PI);
                context.strokeStyle = '#d7d7d7';
                context.stroke();

            }


        }
        //context.scale(2,2)
        
    }, [map.coloumns, map.rows, map.square, map.radials]);

    useEffect(() => {
            draw();

    }, [draw])

    return (
            <canvas className='map-canvas' ref={canvasRef} {...rest}/>
    )
}