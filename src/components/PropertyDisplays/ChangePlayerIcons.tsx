import { Players, ObjectType } from "../../types";
import { getIconsByRole, jIconKeys, pIconKeys } from "../../utils/loadIcons";
import "../../styling/icon-bar.css";
import Section from "../section";

interface ChangePlayerIconsProps {
  player: Players;
  changingPlayer: Function;
}

export default function ChangePlayerIcons({
  player,
  changingPlayer,
}: ChangePlayerIconsProps) {
  const updatePlayer = (
    player: Players,
    img: string,
    type: jIconKeys | pIconKeys
  ) => {
    if (player.label === player.type) {
      player.label = type;
    }
    player.img = img;
    player.type = ObjectType[type];
    changingPlayer();
  };

  const displayRoleIcons = () => {
    const icons = getIconsByRole(player);
    return Object.keys(icons).map((icon) => {
      return (
        <div key={icon} className="icon-row">
          <img
            className="player-icon"
            src={icons[icon as keyof typeof icons]}
            alt={icon}
            onClick={() =>
              updatePlayer(
                player,
                icons[icon as keyof typeof icons],
                icon as jIconKeys | pIconKeys
              )
            }
          />
        </div>
      );
    });
  };

  return <Section title="Change Role Icon:">{displayRoleIcons()}</Section>;
}
