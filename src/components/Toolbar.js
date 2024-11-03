import React from 'react';

function Toolbar({ onAddListClick, onArchiveClick }) {
  return (
    <div>
      <button onClick={onAddListClick}>Add List</button>
      <button onClick={onArchiveClick}>Archive</button>
    </div>
  );
}

export default Toolbar;