import React, { useState } from 'react';
import { Attack } from '../../../types';

interface DropdownProps {
    attack: Attack;
    change: Function;
}

const Dropdown: React.FC<DropdownProps> = ({ attack, change }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const values = ['1', '2', '3', '4', '5', '6', '7', '8', 'dps', 'healer', 'tank', 'support'];

    const valuesMaybeToInt = (values: string[]) => {
        return values.map((value) => {
            parseInt(value)
            if (value === '1' || value === '2' || value === '3' || value === '4' || value === '5' || value === '6' || value === '7' || value === '8') {
                return parseInt(value);
            }
            return value;
        });
    };
    

  const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions);
    const selectedValues = selectedOptions.map((option) => option.value);
    const values = valuesMaybeToInt(selectedValues);
    if(values[0] === '') {
        attack.target = null;
    } else {
        attack.target = values;
    }
    setSelectedValues(selectedValues);
    change();
  };

  return (
    <div style={{ minWidth: '100px' }}>
        Targets:
        <br />
      <select
        multiple
        value={selectedValues}
        onChange={handleValueChange}
        style={{ width: '100px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        {values.map((key: string ) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
        <option value="">None</option>
      </select>
      <p>Selected values: {selectedValues.join(', ')}</p>
    </div>
  );
};

export default Dropdown;
