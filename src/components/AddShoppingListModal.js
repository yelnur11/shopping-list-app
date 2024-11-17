import React, { useState } from 'react';

const AddShoppingListModal = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');

  const handleAdd = () => {
    onAdd({ id: Date.now().toString(), name });
    setName('');
  };

  return (
    <div className="modal">
      <h2>Добавить список</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAdd}>Добавить</button>
      <button onClick={onClose}>Отмена</button>
    </div>
  );
};

export default AddShoppingListModal;