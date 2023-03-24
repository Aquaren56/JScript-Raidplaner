import '../styling/header.css';

interface dragProps {
    src: string;
    role: string;
    alt: string;
}

export default function DragIcon(props: dragProps) {

    const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
        console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        console.log(props.alt)
        e.dataTransfer.setData('role', props.role)
        e.dataTransfer.setData('pos', `${e.nativeEvent.offsetX} ${e.nativeEvent.offsetY}`)

    }

    return (
        <div className="player-icon" draggable={true} onDragStart={dragStart}>
            <img src={props.src} alt={props.role}/>
        </div>
    )
}