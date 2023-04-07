interface StepProps {
    number: number;
    change: Function;
    id: number;
}

export default function Step(props: StepProps) {
    return (
        <button onClick={e => props.change(props.id)}>
            {props.number}
        </button>
    )
}