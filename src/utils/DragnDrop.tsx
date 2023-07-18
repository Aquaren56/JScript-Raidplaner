import { Icons, Attacks } from "../types";

export const onDrag = (
  event: React.DragEvent<HTMLDivElement>,
  offset: Point,
  dragProps: Icons | Attacks
) => {
  event.dataTransfer.setData("props", JSON.stringify(dragProps));
  event.dataTransfer.setData("offset", JSON.stringify(offset));
  event.dataTransfer.setData("type", dragProps.identifier);
};

export const onDrop = (
  event: React.DragEvent<HTMLCanvasElement>
): [Icons | Attacks, Point] | undefined => {
  event.preventDefault();
  const data = event.dataTransfer.getData("props");
  const offsetString = event.dataTransfer.getData("offset");

  if (data && offsetString) {
    const dragProps: Icons | Attacks = JSON.parse(data);
    const offset: Point = JSON.parse(offsetString) as Point;
    return [dragProps, offset];
  }

  return undefined;
};

export const onDrop2 = (event: React.DragEvent<HTMLCanvasElement>): string => {
  event.preventDefault();
  const data = event.dataTransfer.getData("type");
  return data;
};

export const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
};

export const calcOffset = (
  event: React.DragEvent<HTMLDivElement>,
  icon: HTMLImageElement
): Point => {
  const rect = icon.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y };
};

export enum DragIconType {
  Waymark = "waymark",
  Player = "player",
  Enemy = "enemy",
  Object = "object",
  Attack = "attack",
}

interface Point {
  x: number;
  y: number;
}
