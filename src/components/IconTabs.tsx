import '../styling/header.css';

interface IconTabProps {
    description: number;
    onSelection: Function;
}

export default function IconTab(props: IconTabProps) {

    return (
        <div className="icon-tab" onClick={e => props.onSelection(props.description)}>
            {props.description}
        </div>
    )
}