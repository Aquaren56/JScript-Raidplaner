import '../../styling/property.css';

interface GridProps {
    rows?: number;
    columns?: number;
    radials?: number;
    id: number;
    onGridChange: Function;
    onGridDelete: Function;
}

export default function GridSettings(props: GridProps) {

    const onChange = (newRows:number, newcolumns:number, newRadials:number) => {
        props.onGridChange(props.id, {rows: newRows || props.rows, columns: newcolumns || props.columns, radials: newRadials || props.radials});
    }

    return (
        <div>
            <label>Grid:</label>
            <input type='number' className='cr' defaultValue={props.columns} onChange = {(event) => {onChange(0, Number(event.target.value),0);}}/>
            by:
            <input type='number' className='cr' defaultValue={props.rows} onChange = {(event) => {onChange(Number(event.target.value), 0,0)}}/>
            <label>Rad:</label>
            <input type='number' className='cr' defaultValue={props.radials} onChange = {(event) => {onChange(0,0,Number(event.target.value));}}/>
            <button onClick={e => props.onGridDelete(props.id)}>-</button>
        </div>
    )
}