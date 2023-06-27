interface Point {
    x: number;
    y: number;
}

interface CanvasEleVar {
    name: string;
    pos: Point;
    size: Point;
    img? : string;
}

export default class CanvasElement {
    identifier: string;
    pos: Point;
    size: Point;
    rotation: number;
    img? : string;


    constructor(props: CanvasEleVar) {
        this.identifier = props.name;
        this.pos = props.pos;
        this.size = props.size;
        this.rotation = 0;
        this.img = props.img;
    }
}