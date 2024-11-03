import React from 'react';

function ListMember({ list, onLeaveList, currentUserEmail }) {
  const handleLeaveList = () => {
    const updatedList = {
      ...list,
      members: list.members.filter((email) => email !== currentUserEmail),
    };
    onLeaveList(updatedList);
  };

  return (
    <div>
      <h2>{list.name}</h2>
      <button onClick={handleLeaveList}>Leave List</button>

      <ul>
        {list.items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListMember;