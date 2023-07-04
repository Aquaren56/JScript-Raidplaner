import '../../styling/icon-bar.css';
import { onDrag, DragIconType, calcOffset } from '../../utils/DragnDrop';
import { Icons, Attacks } from '../../types';

interface dragProps {
    src: string;
    role: string;
    alt: string;
    type: DragIconType;
    SceneObjectProps: Icons | Attacks;
}

export default function DragIcon({src, role, alt, type, SceneObjectProps }: dragProps) {

    const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
        onDrag(e, calcOffset(e, e.currentTarget.querySelector('img') as HTMLImageElement), SceneObjectProps)
    }

    return (
        <div className="player-icon" draggable={true} onDragStart={dragStart}>
            <img src={src} alt={alt}/>
        </div>
    )
}