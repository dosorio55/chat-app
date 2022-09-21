import React, { useState } from 'react'
import { AiOutlineSmile } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import Picker from 'emoji-picker-react'
import './ChatInput.scss'

const ChatInput = ({handleSendMsg}) => {

  const [emojiPicker, setEmojiPicker] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmojiPicker = () => {
    setEmojiPicker(prevState => !prevState)
  }

  const handleEmojiClick = (event, emojiObject) => {
    let messageVar = message;
    messageVar += emojiObject.emoji;
    setMessage(messageVar);
  };

  const handleChangeInput = (event) => {
    if (emojiPicker === true) {
      setEmojiPicker(false);
    }
    setMessage(event.target.value);
  };

  const sendMsg = (event) => {
    event.preventDefault();
    if (message.trim().length > 0) {
      handleSendMsg(message.trim())
      setMessage('')
    }
  }

  return (
    <div className='chat-input-container'>
      <div className="emoji">
        <AiOutlineSmile onClick={handleEmojiPicker} />
        {emojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
      </div>
      <form onSubmit={sendMsg} className='input-container'>
        <input type="text" placeholder='Type your message here' value={message} onChange={handleChangeInput} />
        <button type='submit'>
          <IoMdSend />
        </button>
      </form>
    </div>
  )
}

export default ChatInput