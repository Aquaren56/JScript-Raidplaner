interface newProps {
    new: Function;
}


export default function NewStep(props: newProps) {
    return (
        <button onClick={e => props.new()}>
            +
        </button>
    )
}