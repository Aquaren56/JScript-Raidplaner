import '../styling/header.css';

import IconTab from './IconTabs';
import { useState } from 'react';
import IconTabContent from './IconTabContent';
import getBasePlayerIcons from '../utils/loadIcons';


export default function IconBar() {
    const [selected, setSelected] = useState(1);

    const getContent = () => {
        switch(selected) {
            case 1: return <IconTabContent icons={['healer', 'tank', 'melee', 'ranged']} imageGetter={getBasePlayerIcons}/>
        }
    }

    return (
        <div className='icon-bar'>
            IconBar Left Side
            <div className='icon-bar-header'>
            <IconTab description={1} onSelection={setSelected}/>
            <IconTab description={2} onSelection={setSelected}/>
            <IconTab description={3} onSelection={setSelected}/>
            <IconTab description={4} onSelection={setSelected}/>
            <IconTab description={5} onSelection={setSelected}/>
            </div>
            <div className='icon-bar-content'>
                {getContent()}
            </div>
        </div>
    )
}