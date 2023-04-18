import React, { useState } from 'react';

export interface DropdownProps {
  label: string;
  grids: any[];
  setNumber: Function;
}

export default function Dropdown ({ label, grids, setNumber }: DropdownProps) {
  const [selectedValues, setSelectedValues] = useState<number[]>([1]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map((option) =>
      parseInt(option.value)
    );
    setSelectedValues(selectedOptions);
    setNumber(selectedOptions);
  };

  const stringValues = selectedValues.map((num) => num.toString());

  return (
    <div>
      <label>{label}</label>
      <select value={stringValues} multiple={true} onChange={handleChange}>
      {grids.map((grid, index) => (
          <option key={index} value={index.toString()}>
            {index+1}
          </option>
        ))}
      </select>
    </div>
  );
};
