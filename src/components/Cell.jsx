import React from 'react';

const Cell = ({ value, isLocked, onChange, max }) => {
  const handleChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val) || (val >= 1 && val <= max)) {
      onChange(isNaN(val) ? 0 : val);
    }
  };

  return (
    <input
      type="number"
      className={`sudoku-cell ${isLocked ? 'locked' : ''}`}
      value={value === 0 ? '' : value}
      readOnly={isLocked}
      onChange={handleChange}
      min="1"
      max={max.toString()}
    />
  );
};

export default Cell; 