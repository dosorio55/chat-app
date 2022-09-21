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
      <div className="chat-container__info">
        <h3>{contact.username}</h3>
        <p>hello</p>
      </div>
    </div>
  )
}

export default Contacts