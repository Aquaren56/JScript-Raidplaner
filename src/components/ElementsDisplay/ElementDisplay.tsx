import IconModel from "../../models/IconModel";
import '../../styling/element-display.css';
import '../../styling/header.css';

interface ElementDisplayProps {
    sceneChildren: IconModel[];
    selection: number;
    setSelection: Function;
}

export default function ElementDisplay({sceneChildren, selection, setSelection}: ElementDisplayProps) {
    return (
        <div className="element-display">
            {sceneChildren.map((child: IconModel, index: number) => {
                return (
                    <div className="element" style={{ backgroundColor: selection === index ? 'yellow' : 'white'}} key={index} onClick={() => setSelection(index)}>
                        <img src={child.img} alt={child.identifier} />
                        {child.identifier}
                    </div>
                )
            })}
        </div>
    )
}

