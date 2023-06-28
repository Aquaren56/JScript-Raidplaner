import '../../styling/icon-bar.css';

import IconTab from './IconTabs';
import { useState } from 'react';

import FirstTab from './tabs/first';


export default function IconBar() {
    const [selected, setSelected] = useState(1);

    const getContent = () => {
        switch(selected) {
            case 1: return <FirstTab/>;
            
        }
    }

    return (
        <div className='icon-bar' style={{ backgroundColor: 'var(--light)'}}>
            IconBar Left Side
            <div className='icon-bar-header'>
            <IconTab description={1} onSelection={() => setSelected(1)}/>
            <IconTab description={2} onSelection={() => setSelected(2)}/>
            <IconTab description={3} onSelection={() => setSelected(3)}/>
            <IconTab description={4} onSelection={() => setSelected(4)}/>
            <IconTab description={5} onSelection={() => setSelected(5)}/>
            </div>
            <div className='icon-bar-content'>
                {getContent()}
            </div>
        </div>
    )
}