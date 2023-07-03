import { DragIconType } from "../utils/DragnDrop";

interface Point {
    x: number;
    y: number;
}

interface CanvasEleVar {
    name: string;
    pos: Point;
    size: Point;
    img? : string;
    type?: DragIconType;
}

export default class CanvasElement {
    identifier: string;
    pos: Point;
    size: Point;
    rotation: number;
    img? : string;
    type?: DragIconType;


    constructor(props: CanvasEleVar) {
        this.type = props.type;
        this.identifier = props.name;
        this.pos = props.pos;
        this.size = props.size;
        this.rotation = 0;
        this.img = props.img;
    }
}