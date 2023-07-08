import React from 'react';
import { Objects, SceneObject, isTopping } from '../../types';
import Toppings from './Attachments/Toppings';
import Attacks from './Attachments/Attacks';

import '../../styling/property.css'

interface PProps {
    player: Objects;
    changingPlayer: Function;
    addElements: Function;
    allElements: SceneObject[];
}

export default function ItemForm({ player, changingPlayer, allElements, addElements }: PProps) {

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
        <div className="input-number-row-2">
          <div className="input-number-con">
              <label className="input-label">Pos X:</label>
              <input className='input-number' type="number" name="x" step={5} value={player.drawRotPoint.x} onChange={handlePositionChange} />
          </div>
          <div className="input-number-con">
              <label className="input-label">Pos Y:</label>
              <input className='input-number' type="number" name="y" step={5} value={player.drawRotPoint.y} onChange={handlePositionChange} />
          </div>
        </div>
        <div className="input-number-row-2">
            <div className="input-number-con">
                <label className="input-label">Height:</label>
                <input className='input-number' type="number" name="y" step={10} value={player.size.y} onChange={handleSizeChange} />
            </div>
            <div className="input-number-con">
                <label className="input-label">Width:</label>
                <input className='input-number' type="number" name="x" step={10} value={player.size.x} onChange={handleSizeChange} />
            </div>
        </div>
        <div className="input-number-row-1">
          <div className="input-number-con">
              <label className="input-label">Rotation:</label>
              <input className='input-number single' type="number" step={15} value={player.rotation} onChange={handleRotationChange} />

          </div>
        </div>
      <br />
      Add Attachment: 
      <br />
      <Toppings object={player} changingPlayer={changingPlayer} addElements={addElements} allElements={allElements }/>
      <Attacks object={player} changingPlayer={changingPlayer} addElements={addElements} allElements={allElements }/>
    </div>
  );
};

