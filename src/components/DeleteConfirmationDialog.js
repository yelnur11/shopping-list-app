import React from 'react';

const DeleteConfirmationDialog = ({ onClose, onConfirm }) => {
  return (
    <div className="modal">
      <h2>Delete list?</h2>
      <button onClick={onConfirm}>Delete</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default DeleteConfirmationDialog;