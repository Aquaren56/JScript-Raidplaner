import { PossibleParentObject, AnObject, ObjectType } from "../../../types";
import {
  getIcon,
  createAttack,
  getAttacks,
  AttackShapes,
} from "../../../utils/loadAttacks";
import Section from "../../section";
import { useCounter } from "../../../IdProvider";
import { StepContext } from "../../../App";
import { useContext } from "react";

interface Props {
  object: PossibleParentObject;
  changingPlayer: Function;
  addElements: Function;
  allElements: AnObject[];
}

export default function AttackAttachments({
  object,
  changingPlayer,
  addElements,
  allElements,
}: Props) {
  const { counter, incrementCounter } = useCounter();
  const currentStep = useContext(StepContext);

  const configureAttack = (key: AttackShapes) => {
    const attack = createAttack(
      currentStep,
      ObjectType[key],
      counter,
      { x: 250, y: 250 },
      [object],
      []
    );
    console.log(attack);
    if (!attack) return;
    const newElements = allElements.push(attack);
    addElements(newElements);
    incrementCounter();
    changingPlayer();
  };

  const getAttackImg = (key: AttackShapes) => {
    return (
      <img
        key={key}
        src={getIcon(key)}
        alt={key}
        onClick={(e) => configureAttack(key)}
      />
    );
  };

  const attackIcons = () => {
    const icons = getAttacks();

    return Object.keys(icons).map((key) => {
      switch (key) {
        case "Cone":
          return getAttackImg(key);
        case "Rect":
          return getAttackImg(key);
        case "Circle":
          return getAttackImg(key);
        default:
          return null;
      }
    });
  };

  return (
    <>
      <Section title="Attacks">{attackIcons()}</Section>
    </>
  );
}
