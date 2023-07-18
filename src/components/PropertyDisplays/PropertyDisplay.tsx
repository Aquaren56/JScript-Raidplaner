import "../../styling/header.css";
import MapModel from "../../models/MapModel";
import {
  isAttacks,
  isToppings,
  AnObject,
  isPlayers,
  isEnemys,
} from "../../types";
import AttackProperties from "./Attacks/base";
import ToppingProperties from "./ToppingProperties";

import MapProperties from "./MapProperties";
import PlayerProperties from "./PlayerProperties";

interface PropertyDisplayProps {
  allElements: AnObject[];
  changeMap: Function;
  selectedElement: AnObject | MapModel;
  updateSelected: Function;
  updateAllElements: Function;
}

export default function PropertyDisplay({
  allElements,
  changeMap,
  selectedElement,
  updateSelected,
  updateAllElements,
}: PropertyDisplayProps) {
  const display = () => {
    if (selectedElement instanceof MapModel) {
      return <MapProperties map={selectedElement} changeMap={changeMap} />;
    } else if (isPlayers(selectedElement) || isEnemys(selectedElement)) {
      return (
        <PlayerProperties
          player={selectedElement}
          changingPlayer={updateSelected}
          addElements={updateAllElements}
          allElements={allElements}
        />
      );
    } else if (isAttacks(selectedElement)) {
      return (
        <AttackProperties
          attack={selectedElement}
          changingAttack={updateSelected}
          allElements={allElements}
        />
      );
    } else if (isToppings(selectedElement)) {
      return (
        <ToppingProperties
          topping={selectedElement}
          changingTopping={updateSelected}
          allElements={allElements}
        />
      );
    }
  };

  return (
    <div
      className="property-display"
      style={{ backgroundColor: "var(--darkest)" }}
    >
      PropertyDIsplay Right Side
      {display()}
    </div>
  );
}
