import React from 'react';
import ShoppingListTile from './ShoppingListTile';

function ShoppingListOverview({ lists, onListSelect, onDelete }) {
  return (
    <div className="shopping-list-overview">
      {lists.map((list) => (
        <ShoppingListTile 
          key={list.id} 
          list={list} 
          onListSelect={onListSelect} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}

export default ShoppingListOverview;
