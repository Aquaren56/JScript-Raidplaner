import '../../styling/property.css';

import MapModel, { Grid } from "../../models/MapModel";
import { useState, useEffect } from 'react';
import GridSettings from './GridProperty';
import GridDropdown from './GridCanvasDropdown';
import GridPropertyCanvas from './GridCanvas';

interface MProps {
    map: MapModel;
    changeMap: Function;
}

export default function MapProperties({ map, changeMap }: MProps) {
    
    const [square, setSquare] = useState(map.square);
    const [grids, setGrids] = useState(map.grids);
    const [selected, setSelected] = useState(new Array<number>(0));

    useEffect(() => {
        changeMap(new MapModel({ square: square, grids: grids}));
    }, [square, changeMap, grids]);

    const changeGridAt = (index:number, newGrid:Grid) => {
        grids[index] = newGrid;
        setGrids([...map.grids]);
    }

    const newGrid = () => {
        grids[grids.length] = {rows: 4, columns: 4, radials: 0};
        setGrids([...map.grids]);
    }

    const deleteGrid = (index:number) => {
        grids.splice(index, 1);
        setGrids([...map.grids]);
    }

    const gridDisplay = () => {
        const GridJSX = map.grids.map((grid, index) => {
            return (
                <GridSettings 
                    rows={grid.rows} 
                    columns={grid.columns} 
                    radials={grid.radials} 
                    id={index} 
                    key={index} 
                    onGridChange={changeGridAt} 
                    onGridDelete={deleteGrid}
                />
            )
        });
        return GridJSX;
    }

    function selectByIndex<T>(indices: number[], arr: T[]): T[] {
        return indices.filter((i) => i >= 0 && i < arr.length).map((i) => arr[i]);
    }

    return (
        <div>
            {gridDisplay()}
            <button onClick={newGrid}>+</button>
            <div>
                <label>Circle or Square</label>
                <input type='checkbox' checked={map.square} onChange = {(event) => {setSquare(!square);}}/>
            </div>
            <div>
                <GridDropdown 
                    label='Select Grid' 
                    grids={grids} 
                    setNumber={setSelected}
                />
            </div>
            <div>
                <GridPropertyCanvas 
                    grids={selectByIndex(selected, grids)} 
                    square={map.square} 
                    key={grids}
                />
            </div>
        </div>
    )
}