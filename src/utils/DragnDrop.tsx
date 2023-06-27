export const onDrag = (event: React.DragEvent<HTMLDivElement>, dragProps: DragIconProps) => {

    event.dataTransfer.setData("text", JSON.stringify(dragProps));
}

export const onDrop = (event: React.DragEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");

    if (data) {
        const dragProps: DragIconProps = JSON.parse(data);
        return dragProps;
    }
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
