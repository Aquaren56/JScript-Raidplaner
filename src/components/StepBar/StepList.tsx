import '../../styling/step-list.css';

import { useContext, useState, useRef } from "react";
import { StepContext } from "../../App";

interface StepListProps {
    selectStep: Function;
}

export default function StepList({selectStep}: StepListProps) {
    const currentStep = useContext(StepContext);

    const [steps, setSteps] = useState([0]);
    const [nextStepId, setNextStepId] = useState(1);

    const addStepAtIndex = (index: number) => {
      const newSteps = [...steps.slice(0, index + 1), nextStepId, ...steps.slice(index + 1)];
      setSteps(newSteps);
      setNextStepId(nextStepId + 1);
      selectStep(newSteps[index + 1]);
    }

    const deleteStepAtIndex = (index: number) => {
        if(steps.length === 1) return;
        if(index === 0) {
            selectStep(steps[1]);
            setSteps(steps.slice(1));
            return;
        }

        const newSteps = [...steps.slice(0, index), ...steps.slice(index + 1)];
        setSteps(newSteps);
        selectStep(newSteps[index-1]);
    }

    const findIndex = (step: number) => {        
        for (let i = 0; i < steps.length; i++) {
            if (steps[i] === step) {
                return i;
            }
        }
        return 0;
    }

    //Dragging

    const dragRef = useRef<HTMLButtonElement | null>(null);
    const [savedArr, setSavedArr] = useState<number[]>([]);

    const deleteDragItem = (): number[] => {
        const newArr = [...steps];
        const index = newArr.indexOf(parseInt(dragRef.current?.id as string));
        newArr.splice(index, 1);
        return newArr;
    }

    const insertItem = (id: number, index: number, arr: number[]): number[] => {
        const newArr = [...arr];
        newArr.splice(index, 0, id);
        return newArr;
    }

    const handleDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        setSavedArr(steps);
        dragRef.current = target;
    }

    const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }

    const dragEnter = (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const target = e.target as HTMLButtonElement;
        const targetId = parseInt(target.id);
        const dragId = parseInt(dragRef.current?.id as string);
        const targetIndex = steps.indexOf(targetId);
        const dragIndex = steps.indexOf(dragId);
        if(targetIndex === dragIndex) return;
        const newDisplayedArr = deleteDragItem();
        const newDisplayedArr2 = insertItem(dragId, targetIndex, newDisplayedArr);
        setSteps(newDisplayedArr2);
    }

    const dragLeave = (e: React.DragEvent<HTMLButtonElement>) => {
        setSteps(savedArr);
    }

    return (
        <div style={{ backgroundColor: 'var(--dark)'}}>
            {steps.map((step, index) => (
                <button 
                    className={`step-button`}
                    id={step.toString()}
                    key={index} 
                    draggable={true}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragLeave={dragLeave}
                    onDragEnter={dragEnter}
                    onClick={e => selectStep(step)}
                    style={{ 
                        backgroundColor: step === currentStep ? 'yellow' : 'white'}}
                >
                    {index+1}
                </button>
            ))}
            <button onClick={e => addStepAtIndex(findIndex(currentStep))}>+</button>
            <button onClick={e => deleteStepAtIndex(findIndex(currentStep))}>-</button>
            
        </div>
    )
}