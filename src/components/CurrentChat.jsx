import axios from 'axios'
import React, { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getMessagesRoute, sendMessageRoute } from '../utils/APIRoutes'
import ChatInput from './ChatInput'
import './CurrentChat.scss'
import Logout from './Logout'


const CurrentChat = ({ selectedChat, currentUserId, socket }) => {

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null)

  const scrollRef = useRef();

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUserId,
      to: selectedChat._id,
      message: msg
    });

    socket.current.emit('send-msg', {
      to: selectedChat._id,
      from: currentUserId,
      message: msg
    });

    setMessages(prevMsg => {
      return [...prevMsg, { fromSelf: true, message: msg }]
    })
  }

  if (socket.current) {
    socket.current.on("msg-recieve", (msg) => {
      console.log(msg);
      setArrivalMessage({ fromSelf: false, message: msg });
    });
  }
  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on("msg-recieve", (msg) => {
  //       setArrivalMessage({ fromSelf: false, message: msg });
  //     });
  //   }
  // }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const getAllMessages = async () => {
      const data = await axios.post(getMessagesRoute, {
        from: currentUserId,
        to: selectedChat._id
      })

      setMessages(data.data)

    }
    getAllMessages();
  }, [selectedChat._id])

  return (
    <div className='current-chat'>
      <div className="current-chat__header">
        <div className="current-chat__user-details">
          <div className="current-chat__user-details__avatar">
            <img
              src={`data:image/svg+xml;base64,${selectedChat.avatarImage}`}
              alt="avatar"
            />
          </div>
          <h3>{selectedChat.username}</h3>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message, index) =>
          <div ref={scrollRef} key={index}>
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