import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import ListDetails from './routes/ListDetails';

function App() {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [archivedLists, setArchivedLists] = useState([]); 
  // eslint-disable-next-line no-unused-vars
  const [userRole, setUserRole] = useState("owner");

  return (
    <div className="App">
      <Routes>
        <Route 
          path="/" 
          element={<Home shoppingLists={shoppingLists} archivedLists={archivedLists} setShoppingLists={setShoppingLists} />} 
        />
        <Route 
          path="/list/:id" 
          element={<ListDetails shoppingLists={shoppingLists} setShoppingLists={setShoppingLists} archivedLists={archivedLists} setArchivedLists={setArchivedLists} userRole={userRole} />} 
        />
      </Routes>
    </div>
  );
}

export default App;