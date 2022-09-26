import React from 'react';

const capitalize = string => string[0].toUpperCase() + string.slice(1);

const Contacts = ({ contact, selectedChat, handleSelectedChat }) => {

  const handleSelected = () => handleSelectedChat(contact);

  return (
    <div onClick={handleSelected}
      className={`chat-container__avatar ${selectedChat?._id === contact._id ? 'chat-container__avatar--selected' : ''}`}>
      <img
        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
        alt={contact.username}
      />
      <div className="chat-container__info">
        <h3>{capitalize(contact.username)}</h3>
      </div>
    </div>
  )
}

export default Contacts