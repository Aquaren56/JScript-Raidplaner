import React, { useState } from 'react';
import { Objects, Attack, Topping } from '../../types';

interface DropdownProps {
    nonObject: Attack | Topping;
    objects: Objects[];
    change: Function;
}

const Dropdown: React.FC<DropdownProps> = ({ objects, nonObject, change }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(nonObject.parents.map((parent) => parent.id.toString()));

    const valuesToInt = (values: string[]) => {
        return values.map((value) => {
          if(value === '') {
              return Infinity;
          }
          return parseInt(value)
        });
    }

  const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions);
    const selectedValues = selectedOptions.map((option) => option.value);
    const parents = objects.filter((object) => valuesToInt(selectedValues).includes(object.id));
    nonObject.parents = parents;
    setSelectedValues(selectedValues);
    change();
  };

  return (
    <div style={{ minWidth: '100px' }}>
      Base:
      <br />
      <select
        multiple
        value={selectedValues}
        onChange={handleValueChange}
        style={{ width: '100px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        {objects.map((object: Objects) => (
          <option key={object.id} value={object.id}>
            {object.identifier}
          </option>
        ))}
        <option value="">None</option>
      </select>
      <p>Selected values: {objects.filter((object) => valuesToInt(selectedValues).includes(object.id)).map(obj => obj.identifier).join(' ')}</p>
    </div>
  );
};

export default Dropdown;
