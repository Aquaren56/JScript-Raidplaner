import healer from '../icons/player/Healer.png';
import tank from '../icons/player/Tank.png';
import melee from '../icons/player/Melee.png';
import ranged from '../icons/player/Ranged.png';

const playerBaseIcons = {
    healer, tank, melee, ranged
}

export type pIconKeys = keyof typeof playerBaseIcons

const getBasePlayerIcons = (key: pIconKeys) => {
    return playerBaseIcons[key];
}

export { playerBaseIcons }

export default getBasePlayerIcons;