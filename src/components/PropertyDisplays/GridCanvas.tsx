import { useRef, useCallback, useEffect, useState } from "react";
import {lcm} from '../../utils/maffs';


export default function GridPropertyCanvas(props:any) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { grids, square, ...rest } = props;

    const createNewGrid = () => {
        return grids.reduce((newGrid:any, currentGrid:any) => {
            newGrid.columns = lcm(newGrid.columns, currentGrid.columns);
            newGrid.rows = lcm(newGrid.rows, currentGrid.rows);

            return newGrid;

        }, {columns: 1, rows: 1});
    }

    const createColoredGrid = () => {
        const newsGrid = createNewGrid();
        const colorsGrid = [];
        for(let i = 0; i < newsGrid.rows * newsGrid.columns; i++) {
            colorsGrid[i] = false;
        }
        return colorsGrid;
    }

    const [colorGrid, setColorGrid] = useState(createColoredGrid());
    const [newGrid, setNewGrid] = useState<any>(createNewGrid());

    const draw = useCallback(() => {
        const canvas = canvasRef.current
        let context: any;
        if(canvas !== null) {
            context = canvas.getContext('2d');
            canvas.width = canvas.height = 500;
            canvas.style.width = canvas.style.height = '250px';
        }
        if(context && canvas) {
            context.fillStyle = "rgb(102, 102, 102)";
            if(square) {
                context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            } else {
                context.beginPath();
                context.arc(canvas.width/2, canvas.height/2, 250, 0, 2 * Math.PI);
                context.fill();
            }

            [newGrid].forEach((grid:any) => {
                if(square) {
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

                    const rowWidth = 500 / grid.rows;
                    const columnWidth = 500 / grid.columns;

                    for(let i = 0; i < grid.columns; i++) {
                        for(let k = 0; k < grid.rows; k++) {
                            if(colorGrid[i*grid.columns + k]) {
                                context.fillStyle = "red";
                                context.fillRect(columnWidth*k+1, rowWidth*i+1, columnWidth-1, rowWidth-1);

                            }
                        }
                    }

                } else {
                    for(let i = 0; i <= grid.columns; i++) {
                        let a,b,c;
                        c = 250;
                        b = i*(canvas.width/grid.columns) - 250;
                        a = Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2));
                        context.beginPath();
                        context.moveTo(i*(canvas.width/grid.columns), 250 - a);
                        context.lineTo(i*(canvas.width/grid.columns), 500 - (250 - a));
                        context.strokeStyle = '#d7d7d7';
                        context.stroke();
                    }

                    for(let i = 0; i <= grid.rows; i++) {
                        let a,b,c;
                        c = 250;
                        b = i*(canvas.width/grid.rows) - 250;
                        a = Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2));
                        context.beginPath();
                        context.moveTo(250 - a, i*(canvas.height/grid.rows));
                        context.lineTo(500 - (250 - a), i*(canvas.height/grid.rows));
                        context.strokeStyle = '#d7d7d7';
                        context.stroke();
                    }
                }
                
                for(let i = 0; i <= grid.radials; i++) {
                    context.beginPath();
                    context.arc(canvas.width/2, canvas.height/2, 250 - (i * (250/grid.radials)), 0, 2 * Math.PI);
                    context.strokeStyle = '#d7d7d7';
                    context.stroke();

                }
            });
        }
    }, [square, colorGrid, newGrid]);

    const onMouseClick = (e: React.MouseEvent<HTMLCanvasElement>) => {

        const coloredRow = Math.ceil(e.nativeEvent.offsetX / (250 / newGrid.rows));
        const coloredColumn = Math.ceil(e.nativeEvent.offsetY / (250 / newGrid.columns));
        const gridPos = (coloredColumn - 1) * newGrid.columns+coloredRow - 1;
        colorGrid[gridPos] = !colorGrid[gridPos];
        setColorGrid([...colorGrid]); 
    }

    useEffect(() => {
        draw();
    }, [draw])

    return (
            <canvas 
                className='map-canvas' 
                ref={canvasRef} 
                {...rest}
                onMouseDown={e => onMouseClick(e)}
            />
    )
}