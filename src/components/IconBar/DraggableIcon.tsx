import '../../styling/icon-bar.css';
import { onDrag, DragIconType, calcOffset } from '../../utils/DragnDrop';

interface dragProps {
    src: string;
    role: string;
    alt: string;
    type: DragIconType
}

export default function DragIcon({src, role, alt, type }: dragProps) {

    const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
        onDrag(e, { type: type, src, name: role, offset: calcOffset(e, e.currentTarget.querySelector('img') as HTMLImageElement) })
    }

    return (
        <div className="player-icon" draggable={true} onDragStart={dragStart}>
            <img src={src} alt={alt}/>
        </div>
    )
}