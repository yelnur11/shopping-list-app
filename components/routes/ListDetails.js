import React from 'react';
import { useParams } from 'react-router-dom';
import ListOwner from '../components/ListOwner';
import ListMember from '../components/ListMember';

function ListDetails({ shoppingLists, archivedLists, setShoppingLists, setArchivedLists, userRole, currentUserEmail }) {
  const { id } = useParams();

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

  const onLeaveList = (updatedList) => {
    setShoppingLists(
      shoppingLists.map((l) => (l.id === updatedList.id ? updatedList : l))
    );
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
          onLeaveList={onLeaveList} 
          currentUserEmail={currentUserEmail} 
        />
      )}
    </div>
  );
}

export default ListDetails;