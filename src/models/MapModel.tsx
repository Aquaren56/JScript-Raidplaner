
interface MapProps {
    rows: number;
    coloumns: number;
    square: boolean;
    radials: number;
}

export default class MapModel {
    rows: number;
    coloumns: number;
    square: boolean;
    radials: number;

    constructor(props: MapProps) {
        this.rows = props.rows;
        this.coloumns = props.coloumns;
        this.square = props.square;
        this.radials = props.radials;
    }
}