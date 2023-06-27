import IconModel from '../../models/IconModel';
import React from 'react';

interface PProps {
    player: IconModel;
    changingPlayer: Function;
    index: number

}

export default function ItemForm({ player, changingPlayer, index }: PProps) {

  const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    changingPlayer({ ...player, pos: { ...player.pos, [name]: parseInt(value, 10) } }, index);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    changingPlayer({ ...player, size: { ...player.size, [name]: parseInt(value, 10) } }, index);
  };

  const handleRotationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    changingPlayer({ ...player, rotation: value }, index);
  };

  return (
    <div>
        {player.identifier}
      <div>
        <label>X:</label>
        <input type="number" name="x" defaultValue={player.pos.x} onChange={handlePositionChange} />
      </div>
      <div>
        <label>Y:</label>
        <input type="number" name="y" value={player.pos.y} onChange={handlePositionChange} />
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
    </div>
  );
};