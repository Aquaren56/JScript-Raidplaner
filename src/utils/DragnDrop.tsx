import { Icons, Attacks } from '../types';

export const onDrag = (event: React.DragEvent<HTMLDivElement>, dragProps: DragIconProps) => {

    event.dataTransfer.setData("text", JSON.stringify(dragProps));
}

export const onDrag2 = (event: React.DragEvent<HTMLDivElement>, offset: Point, dragProps: Icons | Attacks) => {
    
        event.dataTransfer.setData("props", JSON.stringify(dragProps));
        event.dataTransfer.setData("offset", JSON.stringify(offset));
    }

export const onDrop = (event: React.DragEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");

    if (data) {
        const dragProps: DragIconProps = JSON.parse(data);
        return dragProps;
    }
}

export const onDrop2 = (event: React.DragEvent<HTMLCanvasElement>): [Icons|Attacks, Point] | undefined => {
    event.preventDefault();
    const data = event.dataTransfer.getData("props");
    const offsetString = event.dataTransfer.getData("offset");

    if (data && offsetString) {
        const dragProps: Icons | Attacks = JSON.parse(data);
        const offset: Point = JSON.parse(offsetString) as Point;
        return [dragProps, offset];
    }

    return undefined;
}

export const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
}

 export const calcOffset = (event: React.DragEvent<HTMLDivElement>, icon: HTMLImageElement): Point => {
    const rect = icon.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x, y };
}

export enum DragIconType {
    Waymark = 'waymark',
    Player = 'player',
    Enemy = 'enemy',
    Object = 'object',
    Attack = 'attack'
}

interface Point {
    x: number;
    y: number;
}

interface DragIconProps {
    type: DragIconType;
    src: string;
    name: string;
    offset: Point;
}
