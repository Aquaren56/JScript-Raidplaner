import {
  getAllLcIcons,
  Lc,
  getLcPrefab,
  Dsr,
  getAllDsrIcons,
  getDsrPrefab,
} from "../../../utils/loadLimitCut";
import { Topping, Objects, SceneObject } from "../../../types";
import Section from "../../section";
import { useCounter } from "../../../IdProvider";

interface Props {
  object: Objects;
  changingPlayer: Function;
  addElements: Function;
  allElements: SceneObject[];
}

export default function Toppings({
  object,
  changingPlayer,
  addElements,
  allElements,
}: Props) {
  const { counter, incrementCounter } = useCounter();

  const configureTopping = (topping: Topping) => {
    topping = {
      ...topping,
      id: counter,
      drawRotPoint: {
        x: object.drawRotPoint.x,
        y: object.drawRotPoint.y - object.size.y - topping.drawOffset.y,
      },
      isChild: true,
    };
    incrementCounter();
    topping.parents.push(object);
    const newElements = allElements.push(topping);
    addElements(newElements);
    changingPlayer();
  };

  const LcIcons = () => {
    const icons = getAllLcIcons();
    return Object.keys(icons).map((key) => {
      return (
        <img
          key={key}
          src={icons[key as Lc]}
          alt={key}
          onClick={(e) => configureTopping(getLcPrefab(key as Lc))}
        />
      );
    });
  };

  const DsrIcons = () => {
    const icons = getAllDsrIcons();
    return Object.keys(icons).map((key) => {
      return (
        <img
          style={{ width: "30px", height: "30px" }}
          key={key}
          src={icons[key as Dsr]}
          alt={key}
          onClick={(e) => configureTopping(getDsrPrefab(key as Dsr))}
        />
      );
    });
  };

  return (
    <>
      <Section title="Limit Cut">{LcIcons()}</Section>
      <Section title="Playstation">{DsrIcons()}</Section>
    </>
  );
}
