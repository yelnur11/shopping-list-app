import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ListOwner from '../components/ListOwner';
import ListMember from '../components/ListMember';

function ListDetails({ shoppingLists, archivedLists, setShoppingLists, setArchivedLists, userRole, currentUserEmail }) {
  const { id } = useParams();
  const [itemName, setItemName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');

  const list = shoppingLists.find((list) => list.id === id) || archivedLists.find((list) => list.id === id);

  if (!list) return <div>List not found</div>;

  const onUpdateList = (updatedList) => {
    setShoppingLists(
      shoppingLists.map((l) => (l.id === updatedList.id ? updatedList : l))
    );
  };

  const onDeleteList = () => {
    setShoppingLists(shoppingLists.filter((l) => l.id !== id));
  };

  const onArchiveList = () => {
    setArchivedLists([...archivedLists, list]);
    setShoppingLists(shoppingLists.filter((l) => l.id !== id));
  };

  const handleAddItem = () => {
    if (itemName.trim() === '') return;
    const updatedList = {
      ...list,
      items: [...(list.items || []), { id: Date.now().toString(), name: itemName }],
    };
    onUpdateList(updatedList);
    setItemName('');
  };

  const handleAddMember = () => {
    if (memberEmail.trim() === '') return;
    console.log("Add member:", memberEmail);
    setMemberEmail('');
  };

  return (
    <div>
      {userRole === "owner" ? (
        <ListOwner
          list={list}
          onUpdateList={onUpdateList}
          onDeleteList={onDeleteList}
          onArchiveList={onArchiveList}
        />
      ) : (
        <ListMember 
          list={list}
          currentUserEmail={currentUserEmail}
        />
      )}

      <div className="add-item">
        <input 
          type="text" 
          placeholder="New item name" 
          value={itemName} 
          onChange={(e) => setItemName(e.target.value)} 
        />
        <button onClick={handleAddItem} className="add-item-button">Add Item</button>
      </div>

      <h3>Members</h3>
      <div className="add-member">
        <input 
          type="email" 
          placeholder="Add member by email" 
          value={memberEmail} 
          onChange={(e) => setMemberEmail(e.target.value)} 
        />
        <button onClick={handleAddMember} className="add-member-button">Add Member</button>
      </div>
    </div>
  );
}

export default ListDetails;
