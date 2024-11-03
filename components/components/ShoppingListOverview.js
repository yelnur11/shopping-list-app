import React from 'react';

function ShoppingListOverview({ lists, onListSelect }) {
  return (
    <div className="shopping-list-overview">
      {lists.map((list) => (
        <button 
          key={list.id} 
          onClick={() => onListSelect(list)} 
          className="shopping-list-button"
        >
          {list.name}
        </button>
      ))}
    </div>
  );
}

export default ShoppingListOverview;