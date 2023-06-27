import '../../styling/icon-bar.css';

interface IconTabProps {
    description: number;
    onSelection: Function;
}

export default function IconTab({description, onSelection}: IconTabProps) {

    return (
        <div className="icon-tab" onClick={() => onSelection()}>
            {description}
        </div>
    )
}