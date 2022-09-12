import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getMessagesRoute, sendMessageRoute } from '../utils/APIRoutes'
import ChatInput from './ChatInput'
import './CurrentChat.scss'
import Logout from './Logout'


const CurrentChat = ({ selectedChat, currentUserId }) => {

  const [messages, setMessages] = useState([])

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUserId,
      to: selectedChat._id,
      message: msg
    })
  }

  useEffect(() => {
    const getAllMessages = async () => {
      const data = await axios.post(getMessagesRoute, {
        from: currentUserId,
        to: selectedChat._id
      })

      setMessages(data.data)

    }
    getAllMessages();
    console.log(messages);
  }, [selectedChat._id])


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
        {messages.map((message, index) =>
          <div key={index}>
            <div
              className={`message ${message.fromSelf ? "sended" : "recieved"
                }`}
            >
              <div className="content ">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  )
}

export default CurrentChat