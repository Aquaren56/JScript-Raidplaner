import DragIcon from "./DraggableIcon";

import '../../styling/icon-bar.css';
import { DragIconType } from "../../utils/DragnDrop";

interface contentProps {
    icons: string[],
    imageGetter: Function;
}

export default function IconTabContent(props: contentProps) {
    const iconNameToImg = () => {
        return props.icons.map((name: string) => {
            return (
                <DragIcon key={name} role={name} type={'player' as DragIconType} src={props.imageGetter(name)} alt={name}/>
            )  
        })
    }

    return (
        <div className="icon-tab-content">
            {iconNameToImg()}
        </div>
    )
}