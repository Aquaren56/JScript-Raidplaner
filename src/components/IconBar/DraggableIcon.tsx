import "../../styling/icon-bar.css";
import { onDrag, calcOffset } from "../../utils/DragnDrop";
import { ObjectType } from "../../types";

interface dragProps {
  src: string;
  alt: string;
  type: ObjectType;
}

export default function DragIcon({ src, alt, type }: dragProps) {
  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDrag(
      e,
      calcOffset(e, e.currentTarget.querySelector("img") as HTMLImageElement),
      type
    );
  };

  return (
    <div className="player-icon" draggable={true} onDragStart={dragStart}>
      <img src={src} alt={alt} />
    </div>
  );
}
