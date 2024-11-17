import React from 'react';

const ShoppingListTile = ({ list, onListSelect, onDelete }) => {
  return (
    <div className="shopping-list-tile" onClick={() => onListSelect(list)}>
      <h2>{list.name}</h2>
      <button onClick={(e) => {
        e.stopPropagation();
        onDelete(list.id);
      }}>Delete</button>
    </div>
  );
};

export default ShoppingListTile;