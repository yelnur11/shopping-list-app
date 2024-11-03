import React from 'react';

function ListButton({ onDeleteListClick, onArchivedListsClick }) {
  return (
    <div>
      <button onClick={onDeleteListClick}>Delete List</button>
      <button onClick={onArchivedListsClick}>View Archived Lists</button>
    </div>
  );
}

export default ListButton;