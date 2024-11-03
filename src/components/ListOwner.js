import React, { useState } from 'react';

function ListOwner({ list, onUpdateList, onDeleteList, onArchiveList }) {
  const [newItemName, setNewItemName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedListName, setEditedListName] = useState(list.name);
  const [filter, setFilter] = useState('all');
  const [newMemberEmail, setNewMemberEmail] = useState('');

  const handleAddItem = () => {
    if (newItemName.trim() === '') return;
    const updatedList = {
      ...list,
      items: [...(list.items || []), { id: Date.now().toString(), name: newItemName, completed: false }],
    };
    onUpdateList(updatedList);
    setNewItemName('');
  };

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

  const handleAddMember = () => {
    if (!newMemberEmail || (list.members || []).includes(newMemberEmail)) return;

    const updatedList = {
      ...list,
      members: [...(list.members || []), newMemberEmail],
    };
    onUpdateList(updatedList);
    setNewMemberEmail('');
  };

  const handleRemoveMember = (memberEmail) => {
    const updatedList = {
      ...list,
      members: (list.members || []).filter((email) => email !== memberEmail),
    };
    onUpdateList(updatedList);
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
        <button onClick={onDeleteList} className="icon-button">
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
              checked={item.completed}
              onChange={() => handleToggleItemCompletion(item.id)}
            />
            {item.name}
            <button onClick={() => handleRemoveItem(item.id)} className="icon-button">
              <i className="fas fa-trash"></i>
            </button>
          </li>
        ))}
      </ul>

      <div className="input-container">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="New item name"
        />
        <button onClick={handleAddItem} className="add-item">
          <i className="fas fa-plus"></i>
        </button>
      </div>

      {/* Managing Members */}
      <h3>Members</h3>
      <ul>
        {(list.members || []).map((member) => (
          <li key={member}>
            {member}
            <button onClick={() => handleRemoveMember(member)}>Remove</button>
          </li>
        ))}
      </ul>

      <div className="input-container">
        <input
          type="email"
          placeholder="Add member by email"
          value={newMemberEmail}
          onChange={(e) => setNewMemberEmail(e.target.value)}
        />
        <button onClick={handleAddMember} className="add-item">
          <i className="fas fa-user-plus"></i>
        </button>
      </div>
    </div>
  );
}

export default ListOwner;