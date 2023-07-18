import WayA from "../icons/waymarks/way_a.png";
import WayB from "../icons/waymarks/way_b.png";
import WayC from "../icons/waymarks/way_c.png";
import WayD from "../icons/waymarks/way_d.png";
import Way1 from "../icons/waymarks/way_1.png";
import Way2 from "../icons/waymarks/way_2.png";
import Way3 from "../icons/waymarks/way_3.png";
import Way4 from "../icons/waymarks/way_4.png";

import DragIcon from "../components/IconBar/DraggableIcon";
import { ObjectType, WaymarkObject } from "../types";

const waymarkNumbers = {
  way1: Way1,
  way2: Way2,
  way3: Way3,
  way4: Way4,
};

const waymarkLetters = {
  wayA: WayA,
  wayB: WayB,
  wayC: WayC,
  wayD: WayD,
};

type WaymarkNumber = keyof typeof waymarkNumbers;
type WaymarkLetter = keyof typeof waymarkLetters;
type WaymarkIcon = WaymarkNumber | WaymarkLetter;

const getAllWaymarkIcons = () => {
  return {
    ...waymarkNumbers,
    ...waymarkLetters,
  };
};

const getIconName = (key: WaymarkIcon) => {
  return key;
};

const getIcon = (key: WaymarkIcon) => {
  const allIcons = getAllWaymarkIcons();
  return allIcons[key];
};

const getDraggableIcon = (key: WaymarkIcon) => {
  return (
    <DragIcon
      key={key}
      type={ObjectType[key]}
      src={getIcon(key)}
      alt={getIconName(key)}
    />
  );
};

const getDraggableIcons = (keys: WaymarkIcon[]) => {
  return keys.map((key) => {
    return getDraggableIcon(key);
  });
};

export const getWaymarkDragIcons = () => {
  return (
    <>
      <div className="icon-row">
        {Object.keys(waymarkNumbers).map((key) => {
          return getDraggableIcons([key as WaymarkIcon]);
        })}
      </div>
      <div className="icon-row">
        {Object.keys(waymarkLetters).map((key) => {
          return getDraggableIcons([key as WaymarkIcon]);
        })}
      </div>
    </>
  );
};

export const createWaymarkObject = (
  key: WaymarkIcon,
  id = 0,
  pos = { x: 250, y: 250 }
): WaymarkObject => {
  return {
    id,
    label: key,
    size: { x: 32, y: 32 },
    pos: { x: pos.x + 32 / 2, y: pos.y + 32 / 2 },
    img: getIcon(key),
    shape: key.includes("way") ? "square" : "circle",
    type: ObjectType[key],
  };
};
