import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingListOverview from '../components/ShoppingListOverview';

function Home({ shoppingLists, archivedLists, setShoppingLists }) {
  const [showArchived, setShowArchived] = useState(false);
  const navigate = useNavigate();

  const handleListSelect = (list) => {
    navigate(`/list/${list.id}`);
  };

  const handleAddNewList = () => {
    const newList = {
      id: Date.now().toString(),
      name: `New List ${shoppingLists.length + 1}`,
      items: [],
    };
    setShoppingLists([...shoppingLists, newList]);
  };

  const toggleArchivedView = () => {
    setShowArchived(!showArchived);
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
        />
      </div>

      <footer className="footer">
        <button onClick={toggleArchivedView} className="icon-button">
          <i className="fas fa-box-archive"></i>
        </button>
        <button onClick={handleAddNewList} className="icon-button add-button">
          <i className="fas fa-plus-circle"></i>
        </button>
      </footer>
    </div>
  );
}

export default Home;