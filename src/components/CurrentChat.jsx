import React from 'react'
import ChatInput from './ChatInput'
import './CurrentChat.scss'
import Logout from './Logout'

const CurrentChat = ({ selectedChat }) => {

  return (
    <div className='current-chat'>
      <div className="current-chat__header">
        <div className="current-chat__user-details">
          <div className="current-chat__user-details__avatar">
            <img
              src={`data:image/svg+xml;base64,${selectedChat.avatarImage}`}
              alt=""
            />
          </div>
          <h3>{selectedChat.username}</h3>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {/* {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${message.fromSelf ? "sended" : "recieved"
                  }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })} */}
      </div>
      <ChatInput />
    </div>
  )
}

export default CurrentChat