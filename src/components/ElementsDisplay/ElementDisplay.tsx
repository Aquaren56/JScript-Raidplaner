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
        <div className="element-display" style={{ backgroundColor: 'var(--darkest)'}}>
            {sceneChildren.map((child: IconModel, index: number) => {
                const style = selection === index ? {bgc: 'yellow', c: 'black'} : {bgc: '', c: ''}
                return (
                    <div className="element" style={{ backgroundColor: style.bgc, color: style.c }} key={index} onClick={() => setSelection(index)}>
                        <img src={child.img} alt={child.identifier} />
                        {child.identifier}
                    </div>
                )
            })}
        </div>
    )
}

