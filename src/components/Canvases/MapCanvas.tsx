import '../../styling/canvases.css';

import { useRef, useCallback, useEffect } from "react";

export default function MapCanvas(props: any) {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { map, setMap, ...rest } = props;

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

            map.grids.forEach((grid: any) => {
                if(map.square) {
                    for(let i = 0; i <= grid.columns; i++) {
                        context.beginPath();
                        context.moveTo(i*(canvas.width/grid.columns), 0);
                        context.lineTo(i*(canvas.width/grid.columns), canvas.height);
                        context.strokeStyle = '#d7d7d7';
                        context.stroke();
                    }
        
                    for(let i = 0; i <= grid.rows; i++) {
                        context.beginPath();
                        context.moveTo(0, i*(canvas.height/grid.rows));
                        context.lineTo(canvas.width, i*(canvas.height/grid.rows));
                        context.strokeStyle = '#d7d7d7';
                        context.stroke();
                    }
                } else {
                    for(let i = 0; i <= grid.columns; i++) {
                        let a,b,c;
                        c = 500;
                        b = i*(canvas.width/grid.columns) - 500;
                        a = Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2));
                        context.beginPath();
                        context.moveTo(i*(canvas.width/grid.columns), 500 - a);
                        context.lineTo(i*(canvas.width/grid.columns), 1000 - (500 - a));
                        context.strokeStyle = '#d7d7d7';
                        context.stroke();
                    }
    
                    for(let i = 0; i <= grid.rows; i++) {
                        let a,b,c;
                        c = 500;
                        b = i*(canvas.width/grid.rows) - 500;
                        a = Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2));
                        context.beginPath();
                        context.moveTo(500 - a, i*(canvas.height/grid.rows));
                        context.lineTo(1000 - (500 - a), i*(canvas.height/grid.rows));
                        context.strokeStyle = '#d7d7d7';
                        context.stroke();
                    }
                }
    
                for(let i = 0; i <= grid.radials; i++) {
                    context.beginPath();
                    context.arc(canvas.width/2, canvas.height/2, 500 - (i * (500/grid.radials)), 0, 2 * Math.PI);
                    context.strokeStyle = '#d7d7d7';
                    context.stroke();
    
                }
            })
        }
    }, [map.grids, map.square]);

    useEffect(() => {
            draw();

    }, [draw])

    return (
            <canvas className='map-canvas' ref={canvasRef} {...rest}/>
    )
}