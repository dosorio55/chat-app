import React from 'react'

const Contacts = ({ contact, selectedChat, setSelectedChat }) => {

  const handleSelected = () => {
    setSelectedChat(contact)
  }

  return (
    <div onClick={handleSelected}
      className={`chat-container__avatar ${selectedChat?._id === contact._id ? 'chat-container__avatar--selected' : ''}`}>
      <img
        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
        alt={contact.username}
      />
      <h3 className="chat-container__username">{contact.username}</h3>
    </div>
  )
}

export default Contacts