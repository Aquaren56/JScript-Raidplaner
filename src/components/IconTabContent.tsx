import DragIcon from "./DragIcon";

interface contentProps {
    icons: string[],
    imageGetter: Function;
}

export default function IconTabContent(props: contentProps) {
    const iconNameToImg = () => {
        return props.icons.map((name: string) => {
            return (
                <DragIcon key={name} role={name} src={props.imageGetter(name)} alt={name}/>
            )  
        })
    }

    return (
        <div className="icon-tab-content">
            {iconNameToImg()}
        </div>
    )
}