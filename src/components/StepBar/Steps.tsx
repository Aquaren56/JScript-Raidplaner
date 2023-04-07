import '../../styling/header.css';

import { useEffect, useCallback, useState } from 'react';

import NewStep from './NewStep';
import Step from './Step';

interface StepsProps {
    new: Function;
    changeStep: Function;
    current: number;
    all: Map<any,any>;
}

export default function Steps(props: StepsProps) {

    const [buttons, setButtons] = useState(new Array<JSX.Element>())

    const generateButtons = useCallback(() => {
        const buttons = new Array<JSX.Element>();
        
        props.all.forEach((value, key, map) => {
            const iterator1 = map.keys();
            let number = 1;
            
            for(let i = 0; i < map.size; i++) {
                if(iterator1.next().value < key) {
                    number++;
                }
            }
            buttons.push(<Step number={number} change={props.changeStep} key={number} id={key}/>);
        });
        console.log(buttons);
        setButtons(buttons);

    }, [props.all, props.changeStep])

    useEffect(() => {
        console.log(props.all.size);
        generateButtons();
    }, [props.all, generateButtons]);

    return (
        <div className='steps' key={props.all.size}>
            {buttons}
            <NewStep new={props.new}/>
        </div>
    )
}