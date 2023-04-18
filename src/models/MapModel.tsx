
interface MapProps {
    square: boolean;
    grids: Grid[];
}

interface Grid {
    rows?: number;
    columns?: number;
    radials?: number;
}

export default class MapModel {
    square: boolean;
    grids: Grid[];

    constructor(props: MapProps) {
        this.square = props.square;
        this.grids = props.grids;
    }
}

export type { Grid };