import React from 'react';
import { Objects, isTopping } from '../../types';
import Toppings from './Attachments/Toppings';
import Attacks from './Attachments/Attacks';

interface PProps {
    player: Objects;
    changingPlayer: Function;
}

export default function ItemForm({ player, changingPlayer }: PProps) {

  const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    player.drawRotPoint = {...player.drawRotPoint, [name]: parseInt(value, 10)};
    updateChildren();
    changingPlayer();
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    player.size = {...player.size, [name]: parseInt(value, 10)};
    updateChildren();
    changingPlayer();
  };

  const handleRotationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    player.rotation = value;
    changingPlayer();
  };

  const updateChildren = () => {
    player.children.forEach((child) => {
      if(isTopping(child)) {
      child.drawRotPoint = { x: player.drawRotPoint.x, y: player.drawRotPoint.y - player.size.y - child.drawOffset.y };
      child.pos = { x: player.pos.x, y: player.pos.y - player.size.y - child.drawOffset.y };
      } else {
        child.drawRotPoint = { x: player.drawRotPoint.x, y: player.drawRotPoint.y - player.size.y };
        child.pos = { x: player.pos.x, y: player.pos.y - player.size.y };
      }
    });

  }

  return (
    <div>
        {player.identifier}
      <div>
        <label>X:</label>
        <input type="number" name="x" value={player.drawRotPoint.x} onChange={handlePositionChange} />
      </div>
      <div>
        <label>Y:</label>
        <input type="number" name="y" value={player.drawRotPoint.y} onChange={handlePositionChange} />
      </div>
      <div>
        <label>Size X:</label>
        <input type="number" name="x" value={player.size.x} onChange={handleSizeChange} />
      </div>
      <div>
        <label>Size Y:</label>
        <input type="number" name="y" value={player.size.y} onChange={handleSizeChange} />
      </div>
      <div>
        <label>Rotation:</label>
        <input type="number" value={player.rotation} onChange={handleRotationChange} />
      </div>
      <div>
        <label>Attachments</label>
        <ul>
          {player.topping ? <li>{player.topping.identifier}</li> : null}
          {player.children.map((attachment, index) => (
            <li key={index}>
              {attachment.identifier}
            </li>
          ))}
        </ul>
      </div>
      Add Attachment: 
      <br />
      <Toppings object={player} changingPlayer={changingPlayer} />
      <Attacks object={player} changingPlayer={changingPlayer} />
    </div>
  );
};