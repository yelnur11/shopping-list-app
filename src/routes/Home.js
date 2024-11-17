import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingListOverview from '../components/ShoppingListOverview';
import AddShoppingListModal from '../components/AddShoppingListModal';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';

function Home({ shoppingLists, archivedLists, setShoppingLists }) {
  const [showArchived, setShowArchived] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const navigate = useNavigate();

  const handleListSelect = (list) => {
    navigate(`/list/${list.id}`);
  };

  const handleAddNewList = (newList) => {
    const updatedList = { ...newList, items: [] };
    setShoppingLists([...shoppingLists, updatedList]);
    setAddModalOpen(false);
    navigate(`/list/${updatedList.id}`); 
  };

  const toggleArchivedView = () => {
    setShowArchived(!showArchived);
  };

  const handleDeleteList = (id) => {
    setDeleteDialogOpen(true);
    setDeleteItemId(id);
  };

  const confirmDeleteList = () => {
    setShoppingLists(shoppingLists.filter((list) => list.id !== deleteItemId));
    setDeleteDialogOpen(false);
  };

  return (
    <div className="home-container">
      <header className="header">
        <button className="icon-button">
          <i className="fas fa-bars"></i>
        </button>
        <h1 className="title">Shopping List</h1>
        <button className="icon-button">
          <i className="fas fa-user-circle"></i>
        </button>
      </header>

      <div className="list-container">
        <ShoppingListOverview 
          lists={showArchived ? archivedLists : shoppingLists} 
          onListSelect={handleListSelect} 
          onDelete={handleDeleteList} 
        />
      </div>

      <footer className="footer">
        <button onClick={toggleArchivedView} className="icon-button">
          <i className="fas fa-box-archive"></i>
        </button>
        <button onClick={() => setAddModalOpen(true)} className="icon-button add-button">
          <i className="fas fa-plus-circle"></i>
        </button>
      </footer>

      {isAddModalOpen && (
        <AddShoppingListModal 
          onClose={() => setAddModalOpen(false)} 
          onAdd={handleAddNewList} 
        />
      )}

      {isDeleteDialogOpen && (
        <DeleteConfirmationDialog 
          onClose={() => setDeleteDialogOpen(false)} 
          onConfirm={confirmDeleteList} 
        />
      )}
    </div>
  );
}

export default Home;
