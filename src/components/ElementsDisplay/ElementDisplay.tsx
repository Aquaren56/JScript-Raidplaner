import '../../styling/element-display.css';
import '../../styling/header.css';
import { SceneObject, isCircleAoe } from "../../types";
import { isAttack } from "../../types";

interface ElementDisplayProps {
    sceneChildren: SceneObject[];
    selection: SceneObject | null;
    setSelection: Function;
}

export default function ElementDisplay({sceneChildren, selection, setSelection}: ElementDisplayProps) {
    const orderChildren = () => {
        return sceneChildren.sort((a: SceneObject, b: SceneObject) => {
            if(a.type < b.type) {
                return -1;
            } else if (a.type > b.type) {
                return 1;
            } else {
                return 0;
            }
        })
    }

    const display = (element: SceneObject) => {
        if(isAttack(element)) {
            if(element.parents.length > 0) {
                return (<>
                        {element.parents.map((parent: SceneObject, index: number) => {
                            return (
                                <div className="element" key={index}>
                                    {' from: '}
                                    {parent.identifier}
                                </div>
                            )
                        }
                    )}
                </>
                )
            }
        }
    }

    const displayTarget = (element: SceneObject) => {
        if(isAttack(element)) {
            if(element.target !== null) {
                return (
                    <div className="element">
                        {' to: '}
                        {element.target}
                    </div>
                )
            }
        }
    }

    return (
        <div className="element-display" style={{ backgroundColor: 'var(--darkest)'}}>
            {orderChildren().map((child: SceneObject, index: number) => {
                const style = selection === child ? {bgc: 'yellow', c: 'black'} : {bgc: '', c: ''}
                return (
                    <div className="element" style={{ backgroundColor: style.bgc, color: style.c }} key={index} onClick={() => setSelection(child)}>
                        <img src={child.img} alt={child.identifier} />
                        <span style={{ marginRight: '4px' }}>{child.identifier}</span> {display(child)} {displayTarget(child)}
                    </div>
                )
            })}
        </div>
    )
}

