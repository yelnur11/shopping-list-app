import React, { useState } from 'react';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

function ListOwner({ list, onUpdateList, onDeleteList, onArchiveList }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedListName, setEditedListName] = useState(list.name || "");
  const [filter, setFilter] = useState('all');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleRemoveItem = (itemId) => {
    const updatedList = {
      ...list,
      items: (list.items || []).filter((item) => item.id !== itemId),
    };
    onUpdateList(updatedList);
  };

  const handleSaveListName = () => {
    const updatedList = {
      ...list,
      name: editedListName,
    };
    onUpdateList(updatedList);
    setIsEditingName(false);
  };

  const handleToggleItemCompletion = (itemId) => {
    const updatedList = {
      ...list,
      items: (list.items || []).map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      ),
    };
    onUpdateList(updatedList);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredItems = (list.items || []).filter((item) => {
    if (filter === 'completed') return item.completed;
    if (filter === 'uncompleted') return !item.completed;
    return true;
  });

  const handleOpenDeleteDialog = () => {
    setShowDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    onDeleteList();
    setShowDeleteDialog(false);
  };

  return (
    <div>
      <h2>
        {isEditingName ? (
          <input
            type="text"
            value={editedListName}
            onChange={(e) => setEditedListName(e.target.value)}
            placeholder="Enter new list name"
          />
        ) : (
          list.name
        )}
      </h2>
      {isEditingName ? (
        <button onClick={handleSaveListName}>Save</button>
      ) : (
        <button onClick={() => setIsEditingName(true)}>Rename List</button>
      )}

      <div>
        <button onClick={handleOpenDeleteDialog} className="icon-button">
          <i className="fas fa-trash-alt"></i>
        </button>
        <button onClick={onArchiveList} className="icon-button">
          <i className="fas fa-archive"></i>
        </button>
      </div>

      <div className="filter-buttons">
        <button
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          All
        </button>
        <button
          className={`filter-button ${filter === 'uncompleted' ? 'active' : ''}`}
          onClick={() => handleFilterChange('uncompleted')}
        >
          Uncompleted
        </button>
        <button
          className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => handleFilterChange('completed')}
        >
          Completed
        </button>
      </div>

      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={!!item.completed}
              onChange={() => handleToggleItemCompletion(item.id)}
            />
            {item.name}
            <button onClick={() => handleRemoveItem(item.id)} className="icon-button">
              <i className="fas fa-trash"></i>
            </button>
          </li>
        ))}
      </ul>

      {showDeleteDialog && (
        <DeleteConfirmationDialog
          onClose={handleCloseDeleteDialog}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default ListOwner;
