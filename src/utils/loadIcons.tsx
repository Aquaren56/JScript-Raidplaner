import DragIcon from "../components/IconBar/DraggableIcon";
import { DragIconType } from "./DragnDrop";
import { Player, ObjectType, Players } from "../types";
import "../styling/section.css";

import healer from "../icons/player/Healer.png";
import tank from "../icons/player/Tank.png";
import melee from "../icons/player/Melee.png";
import ranged from "../icons/player/Ranged.png";
import caster from "../icons/player/Magic.png";

import nin from "../icons/player/all/Ninja.png";
import drg from "../icons/player/all/Dragoon.png";
import sam from "../icons/player/all/Samurai.png";
import mnk from "../icons/player/all/Monk.png";
import brd from "../icons/player/all/Bard.png";
import mch from "../icons/player/all/Machinist.png";
import dnc from "../icons/player/all/Dancer.png";
import blm from "../icons/player/all/BlackMage.png";
import smn from "../icons/player/all/Summoner.png";
import rdm from "../icons/player/all/RedMage.png";
import whm from "../icons/player/all/WhiteMage.png";
import sch from "../icons/player/all/Scholar.png";
import ast from "../icons/player/all/Astrologian.png";
import gnb from "../icons/player/all/Gunbreaker.png";
import pld from "../icons/player/all/Paladin.png";
import war from "../icons/player/all/Warrior.png";
import drk from "../icons/player/all/DarkKnight.png";
import rpr from "../icons/player/all/Reaper.png";
import sge from "../icons/player/all/Sage.png";

const playerBaseIcons = {
  healer,
  tank,
  melee,
  ranged,
  caster,
};

const playerJobIcons = {
  nin: nin,
  drg: drg,
  sam: sam,
  mnk: mnk,
  brd: brd,
  mch: mch,
  dnc: dnc,
  blm: blm,
  smn: smn,
  rdm: rdm,
  whm: whm,
  sch: sch,
  ast: ast,
  gnb: gnb,
  pld: pld,
  war: war,
  drk: drk,
  rpr: rpr,
  sge: sge,
};

const meleeJobIcons = {
  melee,
  nin,
  drg,
  sam,
  mnk,
  rpr,
};

const rangedJobIcons = {
  ranged,
  brd,
  mch,
  dnc,
};

const casterJobIcons = {
  caster,
  blm,
  smn,
  rdm,
};

const healerJobIcons = {
  healer,
  whm,
  sch,
  ast,
  sge,
};

const tankJobIcons = {
  tank,
  gnb,
  pld,
  war,
  drk,
};

export type pIconKeys = keyof typeof playerBaseIcons;
export type jIconKeys = keyof typeof playerJobIcons;
type tankKeys = keyof typeof tankJobIcons;
type healerKeys = keyof typeof healerJobIcons;
type meleeKeys = keyof typeof meleeJobIcons;
type rangedKeys = keyof typeof rangedJobIcons;
type casterKeys = keyof typeof casterJobIcons;

export type iconKeys = pIconKeys | jIconKeys;

const getBasePlayerIcons = (key: pIconKeys) => {
  return playerBaseIcons[key];
};

const getAllPlayerIcons = () => {
  const allIcons = { ...playerBaseIcons, ...playerJobIcons };
  return allIcons;
};

const getIcon = (key: pIconKeys | jIconKeys) => {
  const allIcons = getAllPlayerIcons();
  return allIcons[key];
};

const getIconName = (key: pIconKeys | jIconKeys) => {
  return key;
};

const getIconKeys = () => {
  return Object.keys(playerBaseIcons) as pIconKeys[];
};

const getMeleeIconKeys = () => {
  return Object.keys(meleeJobIcons) as meleeKeys[];
};

const getRangedIconKeys = () => {
  return Object.keys(rangedJobIcons) as rangedKeys[];
};

const getCasterIconKeys = () => {
  return Object.keys(casterJobIcons) as casterKeys[];
};

const getHealerIconKeys = () => {
  return Object.keys(healerJobIcons) as healerKeys[];
};

const getTankIconKeys = () => {
  return Object.keys(tankJobIcons) as tankKeys[];
};

const getDraggableIcon = (key: pIconKeys | jIconKeys) => {
  return (
    <DragIcon
      key={key}
      role={key}
      type={DragIconType.Player}
      src={getIcon(key)}
      alt={getIconName(key)}
      SceneObjectProps={getObjectPrefab(key)}
    />
  );
};

const getDraggableIcons = (keys: (pIconKeys | jIconKeys)[]) => {
  return keys.map((key) => {
    return getDraggableIcon(key);
  });
};

const getDraggableMeleeIcons = () => {
  return getDraggableIcons(getMeleeIconKeys());
};

const getDraggableRangedIcons = () => {
  return getDraggableIcons(getRangedIconKeys());
};

const getDraggableCasterIcons = () => {
  return getDraggableIcons(getCasterIconKeys());
};

const getDraggableHealerIcons = () => {
  return getDraggableIcons(getHealerIconKeys());
};

const getDraggableTankIcons = () => {
  return getDraggableIcons(getTankIconKeys());
};

const getDraggableBasePlayerIcons = () => {
  return getDraggableIcons(getIconKeys());
};

const getSortedDraggablePlayerIcons = () => {
  const sortedIcons = {
    base: getDraggableBasePlayerIcons(),
    tank: getDraggableTankIcons(),
    healer: getDraggableHealerIcons(),
    melee: getDraggableMeleeIcons(),
    ranged: getDraggableRangedIcons().concat(getDraggableCasterIcons()),
  };

  const sortedIconDivs = Object.keys(sortedIcons).map((key) => {
    return (
      <div key={key} className="icon-row">
        {sortedIcons[key as keyof typeof sortedIcons]}
      </div>
    );
  });
  return sortedIconDivs;
};

export { getSortedDraggablePlayerIcons };

export { playerBaseIcons };

export default getBasePlayerIcons;

const getObjectPrefab = (key: pIconKeys | jIconKeys) => {
  const objectPrefab: Player = {
    id: 0,
    step: 0,
    identifier: key,
    drawRotPoint: { x: 0, y: 0 },
    size: { x: 30, y: 30 },
    drawSize: {
      x: 30,
      y: 30,
    },
    img: getIcon(key),
    rotation: 0,
    type: ObjectType.Player,
    children: [],
    role: getRoleByKey(key),
  };
  return objectPrefab;
};

export const initPlayerSetup = () => {
  const group1 = Object.keys(playerBaseIcons).map((key, index) => {
    const player = getObjectPrefab(key as pIconKeys);
    player.id = index;
    player.drawRotPoint = { x: 140 + 73 * index, y: 400 };

    return player;
  });
  const group2 = Object.keys(playerBaseIcons)
    .slice(0, 3)
    .map((key, index) => {
      const player = getObjectPrefab(key as jIconKeys);
      player.id = index + 5;
      player.drawRotPoint = { x: 140 + 73 * index, y: 450 };

      return player;
    });

  return group1.concat(group2);
};

const getRoleByKey = (key: pIconKeys | jIconKeys) => {
  if (getTankIconKeys().includes(key as tankKeys)) {
    return "tank";
  } else if (Object.keys(healerJobIcons).includes(key as jIconKeys)) {
    return "healer";
  } else if (Object.keys(meleeJobIcons).includes(key as jIconKeys)) {
    return "dps";
  } else if (Object.keys(rangedJobIcons).includes(key as jIconKeys)) {
    return "dps";
  } else {
    return "dps";
  }
};

export const initSetupPlayer = (step: number) => {
  const group1 = Object.keys(playerBaseIcons).map((key, index) => {
    const player = createJob(step, key as pIconKeys);
    player.id = index;
    player[step].pos = { x: 140 + 73 * index, y: 400 };

    return player;
  });
  const group2 = Object.keys(playerBaseIcons)
    .slice(0, 3)
    .map((key, index) => {
      const player = createJob(step, key as jIconKeys);
      player.id = index + 5;
      player[step].pos = { x: 140 + 73 * index, y: 450 };

      return player;
    });

  return group1.concat(group2);
};

export const createJob = (
  step: number,
  key: jIconKeys | pIconKeys,
  id = 0,
  pos = { x: 250, y: 250 }
): Players => {
  return {
    id: id,
    label: key,
    img: getIcon(key),
    type: ObjectType[key],
    [step]: {
      pos: { x: pos.x + 32 / 2, y: pos.y + 32 / 2 },
      size: { x: 32, y: 32 },
      rotation: 0,
    },
  };
};
