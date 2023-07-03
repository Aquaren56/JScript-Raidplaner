import DragIcon from '../components/IconBar/DraggableIcon';
import { DragIconType } from './DragnDrop';
import { Objects } from '../types';
import '../styling/section.css';

import healer from '../icons/player/Healer.png';
import tank from '../icons/player/Tank.png';
import melee from '../icons/player/Melee.png';
import ranged from '../icons/player/Ranged.png';

import nin from '../icons/player/all/Ninja.png';
import drg from '../icons/player/all/Dragoon.png';
import sam from '../icons/player/all/Samurai.png';
import mnk from '../icons/player/all/Monk.png';
import brd from '../icons/player/all/Bard.png';
import mch from '../icons/player/all/Machinist.png';
import dnc from '../icons/player/all/Dancer.png';
import blm from '../icons/player/all/BlackMage.png';
import smn from '../icons/player/all/Summoner.png';
import rdm from '../icons/player/all/RedMage.png';
import whm from '../icons/player/all/WhiteMage.png';
import sch from '../icons/player/all/Scholar.png';
import ast from '../icons/player/all/Astrologian.png';
import gnb from '../icons/player/all/Gunbreaker.png';
import pld from '../icons/player/all/Paladin.png';
import war from '../icons/player/all/Warrior.png';
import drk from '../icons/player/all/DarkKnight.png';
import rpr from '../icons/player/all/Reaper.png';
import sge from '../icons/player/all/Sage.png';

const playerBaseIcons = {
    healer, tank, melee, ranged
}

const playerJobIcons = {
    nin,
    drg,
    sam,
    mnk,
    rpr,
    brd,
    mch,
    dnc,
    blm,
    smn,
    rdm,
    whm,
    sch,
    ast,
    sge,
    gnb,
    pld,
    war,
    drk
}

const meleeJobIcons = {
    nin,
    drg,
    sam,
    mnk,
    rpr
}

const rangedJobIcons = {
    brd,
    mch,
    dnc
}

const casterJobIcons = {
    blm,
    smn,
    rdm
}

const healerJobIcons = {
    whm,
    sch,
    ast,
    sge
}

const tankJobIcons = {
    gnb,
    pld,
    war,
    drk
}

export type pIconKeys = keyof typeof playerBaseIcons
export type jIconKeys = keyof typeof playerJobIcons
export type iconKeys = pIconKeys | jIconKeys

const getBasePlayerIcons = (key: pIconKeys) => {
    return playerBaseIcons[key];
}

const getAllPlayerIcons = () => {
    const allIcons = {...playerBaseIcons, ...playerJobIcons};
    return allIcons;
}

const getIcon = (key: pIconKeys | jIconKeys) => {
    const allIcons = getAllPlayerIcons();
    return allIcons[key];
}

const getIconName = (key: pIconKeys | jIconKeys) => {
    return key;
}

const getIconKeys = () => {
    return Object.keys(playerBaseIcons) as pIconKeys[];
}

const getMeleeIconKeys = () => {
    return Object.keys(meleeJobIcons) as jIconKeys[];
}

const getRangedIconKeys = () => {
    return Object.keys(rangedJobIcons) as jIconKeys[];
}

const getCasterIconKeys = () => {
    return Object.keys(casterJobIcons) as jIconKeys[];
}

const getHealerIconKeys = () => {
    return Object.keys(healerJobIcons) as jIconKeys[];
}

const getTankIconKeys = () => {
    return Object.keys(tankJobIcons) as jIconKeys[];
}

const getDraggableIcon = (key: pIconKeys | jIconKeys) => {
    return <DragIcon 
        key={key} 
        role={key} 
        type={DragIconType.Player}
        src={getIcon(key)} 
        alt={getIconName(key)}
        SceneObjectProps={getObjectPrefab(key)}
    />
}

const getDraggableIcons = (keys: (pIconKeys | jIconKeys)[]) => {
    return keys.map((key) => {
        return getDraggableIcon(key);
    })
}

const getDraggableMeleeIcons = () => {
    return getDraggableIcons(getMeleeIconKeys());
}

const getDraggableRangedIcons = () => {
    return getDraggableIcons(getRangedIconKeys());
}

const getDraggableCasterIcons = () => {
    return getDraggableIcons(getCasterIconKeys());
}

const getDraggableHealerIcons = () => {
    return getDraggableIcons(getHealerIconKeys());
}

const getDraggableTankIcons = () => {
    return getDraggableIcons(getTankIconKeys());
}

const getDraggableBasePlayerIcons = () => {
    return getDraggableIcons(getIconKeys());
}

const getSortedDraggablePlayerIcons = () => {
    const sortedIcons = {
        base: getDraggableBasePlayerIcons(),
        tank: getDraggableTankIcons(),
        healer: getDraggableHealerIcons(),
        melee: getDraggableMeleeIcons(),
        ranged: getDraggableRangedIcons().concat(getDraggableCasterIcons()),
    }

    const sortedIconDivs = Object.keys(sortedIcons).map((key) => {
        return (
            <div key={key} className='icon-row'>
                {sortedIcons[key as keyof typeof sortedIcons]}
            </div>
        )
    })
    return sortedIconDivs;
}

export { getSortedDraggablePlayerIcons }

export { playerBaseIcons }

export default getBasePlayerIcons;

const getObjectPrefab = (key: pIconKeys | jIconKeys) => {
    const objectPrefab: Objects = {
        step: 0,
        identifier: key,
        pos: {
            x: 0,
            y: 0
        },
        size: { x: 30, y: 30 },
        drawSize: {
            x: 30,
            y: 30
        },
        img: getIcon(key),
        rotation: 0,
        children: []
    }
    return objectPrefab;
}
